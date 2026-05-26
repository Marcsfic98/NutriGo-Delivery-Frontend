// models/Carrinho.ts
import type Usuario from "./Usuario"
import type Estabelecimento from "./Estabelecimento"
import type Produto from "./Produto"

export interface ItemCarrinho {
  id: number
  produto: Produto
  quantidade: number
  precoUnitario: number
}

export interface Subcarrinho {
  id: number
  estabelecimento: Estabelecimento
  itens: ItemCarrinho[]
  subtotal: number
  taxaEntrega: number
  valorTotal: number
}

export default interface Carrinho {
  id: number
  usuario: Usuario
  status: "EM_EDICAO" | "FINALIZADO"
  valorTotal: number
  subcarrinhos: Subcarrinho[]
}
