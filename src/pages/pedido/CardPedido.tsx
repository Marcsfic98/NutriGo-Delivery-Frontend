import { Link } from "react-router-dom"
import type Pedido from "../../models/Pedido"

interface CardPedidoProps {
  pedido: Pedido
}

function CardPedido({ pedido }: CardPedidoProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Pedido #{pedido.id}</h2>
        <span className="text-sm font-semibold">{pedido.status}</span>
      </div>

      <p className="text-lg">Valor total: R$ {pedido.valor_total}</p>

      <div className="mt-2 flex gap-2">
        <Link
          to={`/editarPedido/${pedido.id}`}
          className="rounded bg-yellow-500 px-3 py-2 text-white hover:opacity-90"
        >
          Editar
        </Link>

        <Link
          to={`/deletarPedido/${pedido.id}`}
          className="rounded bg-red-600 px-3 py-2 text-white hover:opacity-90"
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardPedido
