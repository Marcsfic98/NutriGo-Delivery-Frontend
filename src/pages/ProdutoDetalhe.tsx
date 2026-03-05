import { ChevronRight, Info, MapPin, ShoppingCart, Star, X } from "lucide-react"
import type Produto from "../models/Produto"

type FlatProduto = Produto & { categoriaNome: string }

interface ProdutoDetalheProps {
  produto: FlatProduto | null
  onClose: () => void
}

const ProdutoDetalhe = ({ produto, onClose }: ProdutoDetalheProps) => {
  if (!produto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="animate-in slide-in-from-bottom max-h-[95vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-t-3xl bg-white duration-300 sm:rounded-3xl">
        <div className="relative h-64 sm:h-80">
          <img
            src={produto.foto_produto}
            alt={produto.nome}
            className="h-full w-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-green-600 uppercase">
                {produto.categoriaNome}{" "}
              </span>
              <h2 className="text-2xl leading-tight font-black text-gray-900">
                {produto.nome}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-green-700">
                R$ {Number(produto.preco).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <MapPin className="text-green-600" size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-bold text-gray-800">
                  Cozinha Central FitGo
                </h4>
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-yellow-600">4.9</span>
              </div>
              <p className="text-xs text-gray-500">
                Unidade Paulista • 25-35 min
              </p>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>

          <div className="mb-8">
            <h5 className="mb-2 flex items-center gap-2 font-bold text-gray-800">
              <Info size={18} className="text-green-600" /> Descrição do Prato
            </h5>
            <p className="text-sm leading-relaxed text-gray-600">
              {produto.descricao ||
                "Preparado com ingredientes orgânicos e selecionados. Ideal para quem busca uma refeição leve e nutritiva."}
            </p>
          </div>

          <div className="mb-8 grid grid-cols-4 gap-2">
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-3 text-center">
              <span className="block text-[10px] font-bold text-orange-400 uppercase">
                Calorias
              </span>
              <span className="text-sm font-black text-orange-700">
                {produto.calorias || 0} kcal
              </span>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3 text-center">
              <span className="block text-[10px] font-bold text-blue-400 uppercase">
                Proteínas
              </span>
              <span className="text-sm font-black text-blue-700">
                {produto.proteinas || "0g"}
              </span>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-3 text-center">
              <span className="block text-[10px] font-bold text-green-400 uppercase">
                Carbos
              </span>
              <span className="text-sm font-black text-green-700">15g</span>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-3 text-center">
              <span className="block text-[10px] font-bold text-purple-400 uppercase">
                Gorduras
              </span>
              <span className="text-sm font-black text-purple-700">8g</span>
            </div>
          </div>

          <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 font-bold text-white shadow-lg shadow-green-100 transition-all hover:bg-green-700 active:scale-[0.98]">
            <ShoppingCart size={20} />
            Adicionar ao Pedido • R$ {Number(produto.preco).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProdutoDetalhe
