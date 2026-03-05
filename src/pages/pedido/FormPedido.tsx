/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

function FormPedido() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario } = useContext(AuthContext)

  const [pedido, setPedido] = useState<Pedido>({
    valor_total: 0,
    status: "",
    usuario: { id: usuario.id },
    estabelecimento: { id: 0 },
  })

  useEffect(() => {
    async function carregar() {
      if (!usuario.token) {
        ToastAlerta("Você precisa estar logado!", "info")
        navigate("/login")
        return
      }

      if (id) {
        await buscarPedidoPorId(Number(id), usuario.token, setPedido)
      }
    }

    carregar()
  }, [id])

  function atualizarCampo(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    if (name === "valor_total") {
      setPedido({ ...pedido, valor_total: Number(value) })
      return
    }

    setPedido({ ...pedido, [name]: value })
  }

  function atualizarEstabelecimentoId(e: React.ChangeEvent<HTMLInputElement>) {
    setPedido({
      ...pedido,
      estabelecimento: { id: Number(e.target.value) },
    })
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      if (id) {
        await atualizarPedido(usuario.token, pedido)
        ToastAlerta("Pedido atualizado com sucesso!", "sucesso")
      } else {
        await cadastrarPedido(usuario.token, pedido)
        ToastAlerta("Pedido cadastrado com sucesso!", "sucesso")
      }

      navigate("/pedidos")
    } catch (error) {
      console.error(error)
      ToastAlerta("Erro ao salvar o pedido!", "erro")
    }
  }

  return (
    <div className="container mx-auto mt-10 max-w-xl">
      <h1 className="mb-6 text-3xl font-bold">
        {id ? "Editar Pedido" : "Cadastrar Pedido"}
      </h1>

      <form onSubmit={enviar} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">Valor total</span>
          <input
            type="number"
            name="valor_total"
            value={pedido.valor_total}
            onChange={atualizarCampo}
            className="rounded border p-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">Status</span>
          <input
            type="text"
            name="status"
            value={pedido.status}
            onChange={atualizarCampo}
            className="rounded border p-2"
            placeholder='Ex: "Pendente"'
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-semibold">ID do Estabelecimento</span>
          <input
            type="number"
            value={(pedido.estabelecimento as any)?.id ?? 0}
            onChange={atualizarEstabelecimentoId}
            className="rounded border p-2"
          />
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded bg-green-600 px-4 py-2 text-white hover:opacity-90"
          >
            Salvar
          </button>

          <button
            type="button"
            onClick={() => navigate("/pedidos")}
            className="rounded bg-gray-400 px-4 py-2 text-white hover:opacity-90"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormPedido
