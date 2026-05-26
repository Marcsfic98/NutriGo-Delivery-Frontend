import axios from "axios"
import {
  type ChangeEvent,
  type FormEvent,
  useContext,
  useEffect,
  useState,
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Estabelecimento from "../../models/Estabelecimento"
import type Pedido from "../../models/Pedido"

import { ToastAlerta } from "../../util/ToastAlerta"
import { statusOptions } from "./pedidoUtils"
import {
  atualizarPedido,
  buscarPedidoPorId,
  cadastrarPedido,
} from "../../services/PedidoService"

const authHeader = (token: string) => ({
  headers: {
    Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extrairId(entidade: any): number {
  if (entidade && typeof entidade === "object" && "id" in entidade) {
    return Number(entidade.id) || 0
  }
  return 0
}

function FormPedido() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // Pegando o usuario (e o estabelecimento atrelado a ele) do Contexto
  const { usuario, handleLogout } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Estado inicial: o estabelecimento já puxa o ID diretamente do usuário logado
  const [pedido, setPedido] = useState<Pedido>({
    id: id ? Number(id) : undefined,
    valor_total: 0,
    status: statusOptions[0] as Pedido["status"],
    data_pedido: new Date().toISOString(),
    usuario: { id: usuario.id },
    estabelecimento: {
      id: usuario.estabelecimento?.id || 0,
      nome: usuario.estabelecimento?.nome || "",
    } as Estabelecimento,
  })

  useEffect(() => {
    if (!usuario.token) {
      ToastAlerta("Você precisa estar logado!", "info")
      navigate("/login")
      return
    }

    async function carregarDados() {
      // Se não for edição, não precisa buscar nada no servidor, pois o ID do estabelecimento já foi pego do login
      if (!id) return

      try {
        // Se for edição, busca os dados do pedido original
        await buscarPedidoPorId(
          Number(id),
          usuario.token,
          (dadosPedido: Pedido) => {
            setPedido({
              ...dadosPedido,
              valor_total: Number(dadosPedido.valor_total) || 0,
              usuario: { id: extrairId(dadosPedido.usuario) || usuario.id },
              // Garante que mantém o estabelecimento correto do pedido ou do usuário
              estabelecimento: {
                id:
                  extrairId(dadosPedido.estabelecimento) ||
                  usuario.estabelecimento?.id ||
                  0,
                nome:
                  dadosPedido.estabelecimento?.nome ||
                  usuario.estabelecimento?.nome ||
                  "",
              } as Estabelecimento,
            })
          },
        )
      } catch (error) {
        console.error(error)
        ToastAlerta("Erro ao carregar dados do pedido", "erro")
      }
    }

    carregarDados()
  }, [id, usuario.token, usuario.id, usuario.estabelecimento, navigate])

  function handleValorTotal(e: ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value === "" ? 0 : Number(e.target.value)
    setPedido((prev) => ({ ...prev, valor_total: valor }))
  }

  function handleStatus(e: ChangeEvent<HTMLSelectElement>) {
    setPedido((prev) => ({
      ...prev,
      status: e.target.value as Pedido["status"],
    }))
  }

  async function salvarPedido(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (pedido.estabelecimento?.id === 0) {
      ToastAlerta("Estabelecimento não identificado para este usuário.", "erro")
      setIsLoading(false)
      return
    }

    try {
      if (id) {
        await atualizarPedido(usuario.token, pedido)
        ToastAlerta("Pedido atualizado com sucesso!", "sucesso")
      } else {
        await cadastrarPedido(usuario.token, pedido)
        ToastAlerta("Pedido realizado com sucesso!", "sucesso")
      }
      navigate("/pedidos")
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao processar pedido", "erro")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-20 flex min-h-screen items-center justify-center bg-gray-50 px-4 pb-20">
      <form
        onSubmit={salvarPedido}
        className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="border-b pb-4">
          <h1 className="text-2xl font-black tracking-tight text-slate-800 uppercase">
            {id ? "Editar Pedido" : "Novo Pedido"}
          </h1>
        </div>

        {/* VALOR */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black text-slate-500 uppercase">
            Valor do Pedido (R$)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={pedido.valor_total || ""}
            onChange={handleValorTotal}
            className="rounded-xl border border-slate-200 p-3 transition-all focus:border-lime-500 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* STATUS */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black text-slate-500 uppercase">
              Status
            </label>
            <select
              value={pedido.status}
              onChange={handleStatus}
              className="rounded-xl border border-slate-200 bg-white p-3 focus:border-lime-500 focus:outline-none"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* CLIENTE (READ-ONLY) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black text-slate-500 uppercase">
              Cliente Logado
            </label>
            <input
              type="text"
              value={usuario.nome || "Usuário"}
              disabled
              className="cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-400"
            />
          </div>
        </div>

        {/* ESTABELECIMENTO (AGORA BLOQUEADO APENAS PARA O LOGADO) */}
        <div className="flex hidden flex-col gap-1">
          <label className="text-xs font-black text-slate-500 uppercase">
            Estabelecimento Vinculado
          </label>
          <input
            type="text"
            // Mostra o Nome do estabelecimento ou o ID caso o nome não exista
            value={
              pedido.estabelecimento?.id || `ID: ${pedido.estabelecimento?.id}`
            }
            disabled
            className="cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 p-3 text-slate-400"
          />
        </div>

        {/* AÇÕES */}
        <div className="mt-6 flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/pedidos")}
            className="px-6 py-3 font-black text-slate-400 transition hover:text-slate-600"
          >
            CANCELAR
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex min-w-[160px] items-center justify-center rounded-xl bg-lime-500 px-8 py-3 font-black text-slate-950 shadow-lg shadow-lime-500/20 transition-all hover:bg-lime-400 active:scale-95 disabled:bg-slate-200"
          >
            {isLoading ? (
              <ClipLoader color="#000" size={20} />
            ) : (
              "CONFIRMAR PEDIDO"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormPedido
