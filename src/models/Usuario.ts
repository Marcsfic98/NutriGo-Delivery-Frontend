import type Estabelecimento from "./Estabelecimento"
import type Pedido from "./Pedido"

export default interface Usuario {
  id: number
  nome: string
  usuario: string
  senha: string
  foto: string
  tipo: string
  pedido?: Pedido[]
  estabelecimento?: Estabelecimento[]
}
