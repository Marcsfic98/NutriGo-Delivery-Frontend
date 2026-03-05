import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Pedido from "../../models/Pedido"
import {
  atualizarPedido,
  buscarPedidoPorId,
  cadastrarPedido,
} from "../../services/PedidoService"
import { ToastAlerta } from "../../util/ToastAlerta"
import { statusOptions } from "./pedidoUtils"

function FormPedido() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario } = useContext(AuthContext)

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

      if (id) {
        try {
          await buscarPedidoPorId(Number(id), usuario.token, setPedido)
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

  function atualizarEstabelecimentoId(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value
    setPedido({
      ...pedido,
      estabelecimento: { id: valor === "" ? 0 : Number(valor) },
    })
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!usuario.token) {
      ToastAlerta("Voce precisa estar logado!", "info")
      navigate("/login")
      return
    }

    const pedidoParaSalvar: Pedido = {
      ...pedido,
      usuario: { id: usuario.id },
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
      ToastAlerta("Erro ao salvar o pedido!", "erro")
    }
  }

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
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">Valor total</span>
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
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">Status</span>
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
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">Usuario logado</span>
              <input
                type="text"
                value={usuario.nome || `ID ${usuario.id}`}
                className="rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-500 outline-none"
                disabled
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                ID do Estabelecimento
              </span>
              <input
                type="number"
                value={pedido.estabelecimento.id === 0 ? "" : pedido.estabelecimento.id}
                onChange={atualizarEstabelecimentoId}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                min="1"
                required
              />
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