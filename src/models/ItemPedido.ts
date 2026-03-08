import type Pedido from "./Pedido"
import type Produto from "./Produto"

export default interface ItemPedido {
  id: number
  quantidade: number
  preco_unitario: number 
  pedido?: Pedido        
  produto: Produto       
}
