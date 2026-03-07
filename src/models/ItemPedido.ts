import type Pedido from "./Pedido"
import type Produto from "./Produto"

export default interface ItemPedido {
  id: number
  quantidade: number
  preco_unitario: number // Adicione este campo que vem do backend
  pedido?: Pedido        // Remova o [] (É um objeto, não array)
  produto: Produto       // Remova o [] (É um objeto, não array)
}