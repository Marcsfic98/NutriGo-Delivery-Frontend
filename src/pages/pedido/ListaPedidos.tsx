/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Pedido from "../../models/Pedido"
import { buscarPedidos } from "../../services/PedidoService"
import CardPedido from "./CardPedido"

function ListaPedidos() {
  const { usuario } = useContext(AuthContext)

  const [pedidos, setPedidos] = useState<Pedido[]>([])

  async function carregarPedidos() {
    //if (!usuario.token) {
    //  alert("Você precisa estar logado!")
    //  return
    //}

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

      <Link
        to="/cadastrarPedido"
        className="mb-6 inline-block rounded bg-green-600 px-4 py-2 text-white hover:opacity-90"
      >
        Cadastrar Pedido
      </Link>

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
