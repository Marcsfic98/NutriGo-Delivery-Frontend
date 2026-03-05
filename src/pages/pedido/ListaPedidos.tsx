import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Pedido from "../../models/Pedido"
import { buscarPedidos } from "../../services/PedidoService"
import { ToastAlerta } from "../../util/ToastAlerta"
import CardPedido from "./CardPedido"

function ListaPedidos() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    async function carregarPedidos() {
      try {
        await buscarPedidos(usuario.token, setPedidos)
      } catch (error) {
        console.error(error)
        ToastAlerta("Erro ao carregar os pedidos!", "erro")
      }
    }

    if (!usuario.token) {
      ToastAlerta("Voce precisa estar logado!", "info")
      navigate("/login")
      return
    }

    carregarPedidos()
  }, [navigate, usuario.token])

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-emerald-50/70 via-white to-white pb-16 pt-32">
      <div className="mx-auto w-full max-w-6xl px-4">
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-100/70 blur-xl" />
          <div className="absolute -bottom-14 -left-8 h-28 w-28 rounded-full bg-amber-100/80 blur-xl" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                Painel de pedidos
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-800 sm:text-4xl">
                Gerencie seus pedidos
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-500 sm:text-base">
                Acompanhe status, atualize informacoes e mantenha seu fluxo de entrega organizado.
              </p>
            </div>

            <Link
              to="/cadastrarPedido"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              + Cadastrar Pedido
            </Link>
          </div>
        </section>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-500">
            Total de pedidos: <span className="font-bold text-zinc-800">{pedidos.length}</span>
          </p>
        </div>

        {pedidos.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-zinc-800">Nenhum pedido encontrado</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Crie seu primeiro pedido para visualizar os dados neste painel.
            </p>
            <Link
              to="/cadastrarPedido"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Criar agora
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pedidos.map((pedido) => (
              <CardPedido key={pedido.id} pedido={pedido} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListaPedidos