import type Categoria from "./Categoria"
import type Pedido from "./Pedido"

export default interface Produto {
  id: number
  nome: string
  foto_produto: string
  descricao: string
  preco: number
  calorias: string
  proteinas: string
  carboritratos: string
  gorduras: string
  categoria?: Categoria
  pedido?: Pedido
}
