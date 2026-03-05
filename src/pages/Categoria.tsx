import type Produto from "../models/Produto"

export default interface Categoria {
  id: number
  nome: string
  produto: Produto
}
