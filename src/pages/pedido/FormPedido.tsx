import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Estabelecimento from "../../models/Estabelecimento"
import type Pedido from "../../models/Pedido"
import {
  atualizarPedido,
  buscarPedidoPorId,
  cadastrarPedido,
} from "../../services/PedidoService"
import { buscar } from "../../services/Service"
import { ToastAlerta } from "../../util/ToastAlerta"
import { statusOptions } from "./pedidoUtils"

const authHeader = (token: string) => ({
  headers: {
    Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
  },
})

function extrairId(entidade: unknown) {
  if (
    typeof entidade === "object" &&
    entidade !== null &&
    "id" in entidade &&
    typeof (entidade as { id?: unknown }).id === "number"
  ) {
    const id = (entidade as { id: number }).id
    return id > 0 ? id : 0
  }

  return 0
}

function extrairNumero(valor: unknown) {
  if (typeof valor === "number" && Number.isFinite(valor)) return valor

  if (typeof valor === "string") {
    const convertido = Number(valor)
    return Number.isFinite(convertido) ? convertido : NaN
  }

  return NaN
}

function FormPedido() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario } = useContext(AuthContext)

  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([])
  const [carregandoEstabelecimentos, setCarregandoEstabelecimentos] =
    useState<boolean>(false)

  const [pedido, setPedido] = useState<Pedido>({
    valor_total: 0,
    status: statusOptions[0],
    data_pedido: new Date().toISOString(),
    usuario: { id: usuario.id },
    estabelecimento: { id: 0 },
  })

  useEffect(() => {
    async function carregar() {
      if (!usuario.token) {
        ToastAlerta("Voce precisa estar logado!", "info")
        navigate("/login")
        return
      }

      try {
        setCarregandoEstabelecimentos(true)
        await buscar(
          "/estabelecimentos",
          setEstabelecimentos,
          authHeader(usuario.token),
        )
      } catch (error) {
        console.error(error)
        ToastAlerta("Erro ao carregar estabelecimentos!", "erro")
      } finally {
        setCarregandoEstabelecimentos(false)
      }

      if (id) {
        try {
          await buscarPedidoPorId(Number(id), usuario.token, (dadosPedido) => {
            const idUsuarioPedido = extrairId(dadosPedido.usuario)
            const idEstabelecimentoPedido = extrairId(dadosPedido.estabelecimento)
            const statusPedido = statusOptions.includes(dadosPedido.status)
              ? dadosPedido.status
              : statusOptions[0]
            const valorTotalPedido = extrairNumero(dadosPedido.valor_total)

            setPedido({
              ...dadosPedido,
              id: dadosPedido.id ?? Number(id),
              status: statusPedido,
              valor_total: Number.isNaN(valorTotalPedido) ? 0 : valorTotalPedido,
              usuario: { id: idUsuarioPedido || usuario.id },
              estabelecimento: { id: idEstabelecimentoPedido },
            })
          })
        } catch (error) {
          console.error(error)
          ToastAlerta("Pedido nao encontrado!", "erro")
          navigate("/pedidos")
        }
        return
      }

      setPedido((estadoAtual) => ({
        ...estadoAtual,
        usuario: { id: usuario.id },
      }))
    }

    carregar()
  }, [id, navigate, usuario.id, usuario.token])

  function atualizarValorTotal(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value
    setPedido({ ...pedido, valor_total: valor === "" ? 0 : Number(valor) })
  }

  function atualizarStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    setPedido({ ...pedido, status: e.target.value as Pedido["status"] })
  }

  function atualizarEstabelecimentoId(e: React.ChangeEvent<HTMLSelectElement>) {
    const idEstabelecimento = Number(e.target.value)

    setPedido({
      ...pedido,
      estabelecimento: { id: Number.isNaN(idEstabelecimento) ? 0 : idEstabelecimento },
    })
  }

  function mensagemErroPedido(error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const data = error.response?.data

      const mensagemApi =
        (typeof data === "string" && data) ||
        (data as { message?: string })?.message ||
        (data as { erro?: string })?.erro

      if (mensagemApi) return mensagemApi
      if (status === 400) return "Dados invalidos para salvar pedido."
      if (status === 401 || status === 403)
        return "Sessao expirada. Faca login novamente."
      if (status === 404) return "Usuario ou estabelecimento nao encontrado."
    }

    return "Erro ao salvar o pedido!"
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!usuario.token) {
      ToastAlerta("Voce precisa estar logado!", "info")
      navigate("/login")
      return
    }

    if (pedido.estabelecimento.id <= 0) {
      ToastAlerta("Selecione um estabelecimento valido.", "info")
      return
    }

    const idUsuarioPedido = extrairId(pedido.usuario)
    const idUsuarioParaSalvar = id ? idUsuarioPedido || usuario.id : usuario.id
    const valorTotalParaSalvar = extrairNumero(pedido.valor_total)

    if (Number.isNaN(valorTotalParaSalvar) || valorTotalParaSalvar < 0) {
      ToastAlerta("Informe um valor total valido.", "info")
      return
    }

    const pedidoParaSalvar: Pedido = {
      ...pedido,
      id: pedido.id ?? (id ? Number(id) : undefined),
      valor_total: valorTotalParaSalvar,
      usuario: { id: idUsuarioParaSalvar },
      estabelecimento: { id: pedido.estabelecimento.id },
    }

    try {
      if (id) {
        await atualizarPedido(usuario.token, pedidoParaSalvar)
        ToastAlerta("Pedido atualizado com sucesso!", "sucesso")
      } else {
        await cadastrarPedido(usuario.token, pedidoParaSalvar)
        ToastAlerta("Pedido cadastrado com sucesso!", "sucesso")
      }

      navigate("/pedidos")
    } catch (error) {
      console.error(error)
      ToastAlerta(mensagemErroPedido(error), "erro")
    }
  }

  const estabelecimentoSelecionadoNaoExiste =
    pedido.estabelecimento.id > 0 &&
    !estabelecimentos.some(
      (estabelecimento) => estabelecimento.id === pedido.estabelecimento.id,
    )

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-emerald-50/70 via-white to-white pb-16 pt-32">
      <div className="mx-auto w-full max-w-3xl px-4">
        <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
          <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-6 text-white sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
              Gestao de pedidos
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">
              {id ? "Editar Pedido" : "Cadastrar Pedido"}
            </h1>
            <p className="mt-2 text-sm text-emerald-100">
              Preencha os dados abaixo para manter o controle do fluxo de entrega.
            </p>
          </header>

          <form onSubmit={enviar} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Valor total
              </span>
              <input
                type="number"
                name="valor_total"
                value={pedido.valor_total === 0 ? "" : pedido.valor_total}
                onChange={atualizarValorTotal}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                min="0"
                step="0.01"
                required
                placeholder="Ex: 30.00"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Status
              </span>
              <select
                name="status"
                value={pedido.status}
                onChange={atualizarStatus}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Usuario logado
              </span>
              <input
                type="text"
                value={usuario.nome || `ID ${usuario.id}`}
                className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-500 outline-none"
                disabled
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Estabelecimento
              </span>
              <select
                value={
                  pedido.estabelecimento.id === 0
                    ? ""
                    : String(pedido.estabelecimento.id)
                }
                onChange={atualizarEstabelecimentoId}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                required
                disabled={carregandoEstabelecimentos}
              >
                <option value="">
                  {carregandoEstabelecimentos
                    ? "Carregando estabelecimentos..."
                    : "Selecione um estabelecimento"}
                </option>

                {estabelecimentoSelecionadoNaoExiste && (
                  <option value={pedido.estabelecimento.id}>
                    Estabelecimento atual (ID {pedido.estabelecimento.id})
                  </option>
                )}

                {estabelecimentos.map((estabelecimento) => (
                  <option key={estabelecimento.id} value={estabelecimento.id}>
                    {estabelecimento.nome}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Salvar
              </button>

              <button
                type="button"
                onClick={() => navigate("/pedidos")}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default FormPedido
