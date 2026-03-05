import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import type Pedido from "../../models/Pedido"
import { buscarPedidos } from "../../services/PedidoService"
import CardPedido from "./CardPedido"

function ListaPedidos() {
  const { usuario } = useContext(AuthContext)

  const [pedidos, setPedidos] = useState<Pedido[]>([])

  async function carregarPedidos() {
    if (!usuario.token) {
      alert("Você precisa estar logado!")
      return
    }

    try {
      await buscarPedidos(usuario.token, setPedidos)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    carregarPedidos()
  }, [])

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-6 text-3xl font-bold">Lista de Pedidos</h1>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pedidos.map((pedido) => (
            <CardPedido key={pedido.id} pedido={pedido} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ListaPedidos
