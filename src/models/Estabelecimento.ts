import type Pedido from "./Pedido"
import type Produto from "./Produto"
import type Usuario from "./Usuario"

export default interface Estabelecimento {
  id: number
  nome: string
  categoria: string
  foto_estabelecimento: string
  endereco: string
  taxa_entrega: number
  produto?: Produto[]
  pedido?: Pedido[]
  usuario?: Usuario
}
