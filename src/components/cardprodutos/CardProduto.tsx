import { Edit, Flame, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ProdutoDetalhe from "../../pages/ProdutoDetalhe"

interface CardProdutoProps {
  produtos: any[]
  titulo?: string
  isOwner?: boolean
}

export const CardProduto = ({
  produtos,
  titulo,
  isOwner = false,
}: CardProdutoProps) => {
  const navigate = useNavigate()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleAction = (p: any) => {
    if (isOwner) {
      // Se for dono, navega para a página de formulário com o ID do produto
      navigate(`/editarProduto/${p.id}`)
    } else {
      // Se for cliente, abre o modal de detalhes (comportamento original)
      setSelectedProduct(p)
    }
  }

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-800">
          {titulo || "Produtos"}
        </h2>
        <div className="ml-2 h-px flex-1 bg-gray-200"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={
                  p.foto_produto ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
                }
                alt={p.nome}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wider text-gray-700 uppercase backdrop-blur">
                {p.categoria?.nome || "Geral"}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h4 className="mb-2 min-h-10 leading-tight font-bold text-gray-800">
                {p.nome}
              </h4>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-600">
                  <Flame size={12} className="mr-1" /> {p.calorias} kcal
                </span>
                <span className="flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                  {p.proteinas}g prot.
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Preço
                  </span>
                  <span className="text-lg leading-none font-black text-gray-900">
                    R$ {Number(p.preco).toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  onClick={() => handleAction(p)}
                  className={`rounded-xl p-2.5 text-white shadow-lg transition active:scale-95 ${
                    isOwner
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isOwner ? <Edit size={18} /> : <ShoppingCart size={18} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {produtos.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 py-20 text-center">
          <p className="font-medium text-gray-400">
            Nenhum produto cadastrado.
          </p>
        </div>
      )}

      {selectedProduct && (
        <ProdutoDetalhe
          produto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
