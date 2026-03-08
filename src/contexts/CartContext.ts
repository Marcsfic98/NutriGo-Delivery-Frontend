import { createContext } from "react";
import type ItemPedido from "../models/ItemPedido";
import type Produto from "../models/Produto";

interface CartContextData {
    itens: ItemPedido[];
    adicionarProduto: (produto: Produto, quantidade: number) => void;
    removerProduto: (produtoId: number) => void;
    limparCarrinho: () => void;
    finalizarPedido: (estabelecimentoId: number, taxaEntrega: number) => Promise<void>;
    quantidadeTotal: number;
    valorTotal: number;
}

export const CartContext = createContext({} as CartContextData);