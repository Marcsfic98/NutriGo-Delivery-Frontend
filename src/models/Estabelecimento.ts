import type Pedido from "./Pedido"

export default interface Estabelecimento {
  id: number
  nome: string
  categoria: string
  taxa_entrega: number
  pedido: Pedido
}
