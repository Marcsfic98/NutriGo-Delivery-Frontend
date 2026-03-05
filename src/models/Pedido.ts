import type Estabelecimento from "./Estabelecimento"
import type Usuario from "./Usuario"

export default interface Pedido {
  id: number
  valor_total: number
  status: string
  data_pedido: string
  usuario: Usuario | { id: number }
  estabelecimento: Estabelecimento | { id: number }
}
