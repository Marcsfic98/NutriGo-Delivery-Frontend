import type Pedido from "./Pedido"

export default interface Usuario {
  id: number
  nome: string
  usuario: string
  foto?: string
  senha: string
  pedido:Pedido
}
