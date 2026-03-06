import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Pedido from "../../models/Pedido"
import { buscarPedidoPorId, deletarPedido } from "../../services/PedidoService"
import { ToastAlerta } from "../../util/ToastAlerta"
import { classeStatusBadge, formatarMoeda } from "./pedidoUtils"

function DeletarPedido() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario } = useContext(AuthContext)

  const [pedido, setPedido] = useState<Pedido>({} as Pedido)

  useEffect(() => {
    async function carregar() {
      if (!usuario.token) {
        ToastAlerta("Você precisa estar logado!", "info")
        navigate("/login")
        return
      }

      if (!id) {
        ToastAlerta("Pedido não encontrado!", "erro")
        navigate("/pedidos")
        return
      }

      try {
        await buscarPedidoPorId(Number(id), usuario.token, setPedido)
      } catch (error) {
        console.error(error)
        ToastAlerta("Pedido nãoo encontrado!", "erro")
        navigate("/pedidos")
      }
    }

    carregar()
  }, [id, navigate, usuario.token])

  async function confirmarDelete() {
    if (!id) return

    if (!usuario.token) {
      ToastAlerta("Você precisa estar logado!", "info")
      navigate("/login")
      return
    }

    try {
      await deletarPedido(usuario.token, Number(id))
      ToastAlerta("Pedido deletado com sucesso!", "sucesso")
      navigate("/pedidos")
    } catch (error) {
      console.error(error)
      ToastAlerta("Erro ao deletar o pedido!", "erro")
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-rose-50/70 via-white to-white pb-16 pt-32">
      <div className="mx-auto w-full max-w-2xl px-4">
        <section className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
          <header className="bg-gradient-to-r from-rose-600 to-rose-500 px-6 py-6 text-white sm:px-8">
            <h1 className="mt-2 text-3xl font-black tracking-tight">
              {"Confirmar exclusão"}
            </h1>
            <p className="mt-2 text-sm text-rose-100">
              {"Esta ação remove o pedido permanentemente e não pode ser desfeita."}
            </p>
          </header>

          <div className="space-y-5 p-6 sm:p-8">
            <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                Pedido
              </p>
              <p className="mt-2 text-xl font-black text-zinc-800">#{pedido.id}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classeStatusBadge(pedido.status)}`}
                >
                  {pedido.status}
                </span>

                <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                  {formatarMoeda(pedido.valor_total)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={confirmarDelete}
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-700"
              >
                Sim, deletar pedido
              </button>

              <button
                onClick={() => navigate("/pedidos")}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DeletarPedido
