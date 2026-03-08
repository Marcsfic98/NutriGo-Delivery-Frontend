import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useContext, useState } from "react"
import { CartContext } from "../contexts/CartContext"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProdutoDetalhe = ({ produto, onClose }: any) => {
  const [qtd, setQtd] = useState(1)
  const { adicionarProduto } = useContext(CartContext)

  if (!produto) return null

  const handleConfirmar = () => {
    adicionarProduto(produto, qtd)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-in zoom-in w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200">
        <img
          src={produto.foto_produto}
          className="h-64 w-full object-cover"
          alt={produto.nome}
        />

        <div className="p-8">
          <h2 className="text-3xl font-black text-zinc-800">{produto.nome}</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {produto.descricao}
          </p>

          <div className="my-8 flex items-center justify-between rounded-2xl bg-zinc-50 p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQtd((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100"
              >
                <Minus size={18} />
              </button>
              <span className="w-6 text-center text-xl font-bold">{qtd}</span>
              <button
                onClick={() => setQtd((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                Total
              </p>
              <p className="text-2xl font-black text-emerald-600">
                R$ {(produto.preco * qtd).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirmar}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700"
            >
              <ShoppingCart size={20} /> Adicionar ao Carrinho
            </button>
            <button
              onClick={onClose}
              className="py-2 font-bold text-zinc-400 transition-colors hover:text-zinc-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProdutoDetalhe
