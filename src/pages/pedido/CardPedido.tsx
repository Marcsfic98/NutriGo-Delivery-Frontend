import { Link } from "react-router-dom"
import type Pedido from "../../models/Pedido"
import {
  classeStatusBadge,
  classeStatusLinha,
  formatarData,
  formatarMoeda,
} from "./pedidoUtils"

interface CardPedidoProps {
  pedido: Pedido
}

function CardPedido({ pedido }: CardPedidoProps) {
  const dataPedido = formatarData(pedido.data_pedido)
  const totalPedido = formatarMoeda(pedido.valor_total)

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-1 w-full bg-gradient-to-r ${classeStatusLinha(pedido.status)}`} />

      <div className="space-y-4 p-5">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Pedido #{pedido.id}
            </p>
            <h2 className="mt-1 text-lg font-bold text-zinc-800">{totalPedido}</h2>
            <p className="mt-1 text-sm text-zinc-500">Criado em {dataPedido}</p>
          </div>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classeStatusBadge(pedido.status)}`}
          >
            {pedido.status}
          </span>
        </header>

        <div className="h-px w-full bg-zinc-100" />

        <div className="flex flex-wrap gap-2">
          <Link
            to={`/editarPedido/${pedido.id}`}
            className="inline-flex items-center rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            Editar
          </Link>

          <Link
            to={`/deletarPedido/${pedido.id}`}
            className="inline-flex items-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
          >
            Deletar
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CardPedido