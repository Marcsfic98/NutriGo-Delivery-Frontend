import { type ReactNode, useContext, useState } from "react"
import type ItemPedido from "../models/ItemPedido"
import type Produto from "../models/Produto"
import { cadastrar } from "../services/Service"
import { ToastAlerta } from "../util/ToastAlerta"
import { AuthContext } from "./AuthContext"
import { CartContext } from "./CartContext"

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemPedido[]>([])
  const { usuario } = useContext(AuthContext)

  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0)
  const valorTotal = itens.reduce(
    (acc, item) => acc + Number(item.preco_unitario) * item.quantidade,
    0,
  )

  function adicionarProduto(produto: Produto, quantidade: number) {
    setItens((itensAtuais) => {
      const itemExiste = itensAtuais.find((i) => i.produto.id === produto.id)
      const precoNumerico = Number(produto.preco)

      if (itemExiste) {
        return itensAtuais.map((i) =>
          i.produto.id === produto.id
            ? { ...i, quantidade: i.quantidade + quantidade }
            : i,
        )
      }
      return [
        ...itensAtuais,
        { id: 0, quantidade, preco_unitario: precoNumerico, produto },
      ]
    })
    ToastAlerta("Adicionado ao carrinho!", "sucesso")
  }

  function removerProduto(produtoId: number) {
    setItens((prev) => prev.filter((item) => item.produto.id !== produtoId))
  }

  function limparCarrinho() {
    setItens([])
  }

  async function finalizarPedido(
    estabelecimentoId: number,
    taxaEntrega: number,
  ) {
    if (!usuario.token) {
      ToastAlerta("Sessão expirada. Faça login.", "info")
      return
    }

    // 1. Criar o Pedido
    const payloadPedido = {
      status: "Pendente",
      data_pedido: new Date().toISOString(),
      valor_total: valorTotal + Number(taxaEntrega),
      usuario: { id: usuario.id },
      estabelecimento: { id: estabelecimentoId },
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let pedidoCriado: any = null

      // Cadastra o pedido e captura a resposta no callback
      await cadastrar(
        `/pedidos/cadastrar`,
        payloadPedido,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (resposta: any) => {
          pedidoCriado = resposta
        },
        {
          headers: { Authorization: usuario.token },
        },
      )

      if (pedidoCriado && pedidoCriado.id) {
        const promisesItens = itens.map((item) => {
          const payloadItem = {
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
            pedido: { id: pedidoCriado.id },
            produto: { id: item.produto.id },
          }

          return cadastrar(`/itempedidos/cadastrar`, payloadItem, () => {}, {
            headers: { Authorization: usuario.token },
          })
        })

        // Aguarda todos os itens serem salvos
        await Promise.all(promisesItens)

        ToastAlerta("Pedido e itens registrados!", "sucesso")
        limparCarrinho()
      }
    } catch (error) {
      console.error(error)
      ToastAlerta("Erro ao salvar os itens do pedido.", "erro")
      throw error
    }
  }

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
        limparCarrinho,
        finalizarPedido,
        quantidadeTotal,
        valorTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
