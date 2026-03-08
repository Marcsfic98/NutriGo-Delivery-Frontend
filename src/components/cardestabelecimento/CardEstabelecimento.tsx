import { ShoppingCart } from "lucide-react"
import type Estabelecimento from "../../models/Estabelecimento"
import { useNavigate } from "react-router-dom"

export interface CardEstabelecimentoProps {
  estabelecimento: Estabelecimento
}

function CardEstabelecimento({ estabelecimento }: CardEstabelecimentoProps) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/estabelecimento/${estabelecimento.id}`)}
      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden rounded-t-2xl shadow">
        <img
          src={estabelecimento.foto_estabelecimento}
          alt={estabelecimento.nome}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wider text-gray-700 uppercase backdrop-blur">
          {estabelecimento.categoria}
        </span>
      </div>

      <div className="flex flex-1 cursor-pointer flex-col p-4">
        <div>
          <h4 className="mb-2 min-h-10 leading-tight font-bold text-gray-800">
            {estabelecimento.nome}
          </h4>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-gray-400">
              Taxa de entrega
            </span>
            <span className="text-md leading-none font-black text-green-700">
              R${" "}
              {Number(estabelecimento.taxa_entrega).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <button className="rounded-xl bg-green-700 p-2.5 text-white shadow-lg shadow-green-100 transition hover:bg-green-900 active:scale-90">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardEstabelecimento
