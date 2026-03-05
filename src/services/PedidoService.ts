import axios from "axios"
import { cadastrar, atualizar, deletar } from "./Service"
import type Pedido from "../models/Pedido"

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "https://aplicativo-de-delivery-backend-1.onrender.com",
})

const authHeader = (token: string) => ({
  headers: {
    Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
  },
})

export async function buscarPedidos(token: string, setDados: (dados: Pedido[]) => void) {
  const resposta = await api.get<Pedido[]>("/pedidos", authHeader(token))
  setDados(resposta.data)
}

export async function buscarPedidoPorId(
  id: number,
  token: string,
  setDados: (dados: Pedido) => void
) {
  const resposta = await api.get<Pedido>(`/pedidos/${id}`, authHeader(token))
  setDados(resposta.data)
}

export async function cadastrarPedido(token: string, pedido: Pedido) {
  await cadastrar("/pedidos/cadastrar", pedido, () => undefined, authHeader(token))
}

export async function atualizarPedido(token: string, pedido: Pedido) {
  await atualizar("/pedidos/atualizar", pedido, () => undefined, authHeader(token))
}

export async function deletarPedido(token: string, id: number) {
  await deletar(`/pedidos/${id}`, authHeader(token))
}