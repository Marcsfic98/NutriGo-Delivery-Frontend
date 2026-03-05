import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Pedido from "../../models/Pedido"
import { buscarPedidoPorId, deletarPedido } from "../../services/PedidoService"
import { ToastAlerta } from "../../util/ToastAlerta"

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

      if (id) {
        try {
          await buscarPedidoPorId(Number(id), usuario.token, setPedido)
        } catch (error) {
          console.error(error)
          ToastAlerta("Pedido não encontrado!", "erro")
          navigate("/pedidos")
        }
      }
    }

    carregar()
  }, [])

  async function confirmarDelete() {
    if (!id) return

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
    <div className="container mx-auto mt-10 max-w-xl">
      <h1 className="mb-6 text-3xl font-bold">Deletar Pedido</h1>

      <div className="rounded border bg-white p-4 shadow">
        <p className="mb-2">
          Tem certeza que deseja deletar o pedido <b>#{pedido.id}</b>?
        </p>

        <p className="mb-2">Status: {pedido.status}</p>
        <p className="mb-4">Valor total: R$ {pedido.valor_total}</p>

        <div className="flex gap-2">
          <button
            onClick={confirmarDelete}
            className="rounded bg-red-600 px-4 py-2 text-white hover:opacity-90"
          >
            Sim, deletar
          </button>

          <button
            onClick={() => navigate("/pedidos")}
            className="rounded bg-gray-400 px-4 py-2 text-white hover:opacity-90"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPedido
