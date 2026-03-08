import { MapPin, Minus, Plus, ShoppingCart, Utensils, X } from "lucide-react"
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

  const precoTotal = Number(produto.preco) * qtd

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      {/* Container Principal: Mais Largo (max-w-4xl) e sem scroll vertical forçado */}
      <div className="animate-in zoom-in relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-zinc-800 shadow-lg transition-all hover:bg-white active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Lado Esquerdo: Imagem (Ocupa 45% da largura) */}
          <div className="relative h-64 w-full md:h-auto md:w-[45%]">
            <img
              src={produto.foto_produto}
              className="h-full w-full object-cover"
              alt={produto.nome}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 md:hidden">
              <h2 className="text-2xl font-black text-white">{produto.nome}</h2>
            </div>
          </div>

          {/* Lado Direito: Informações (Ocupa 55% da largura) */}
          <div className="flex w-full flex-col justify-between p-6 md:w-[55%] md:p-10">
            <div>
              <div className="mb-2 hidden md:block">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-wider text-emerald-600 uppercase">
                  <Utensils size={12} /> {produto.categoria?.nome || "Geral"}
                </span>
                <h2 className="mt-2 text-4xl leading-tight font-black text-zinc-800">
                  {produto.nome}
                </h2>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-zinc-500">
                {produto.descricao}
              </p>

              {/* Tabela Nutricional Compacta */}
              <div className="mb-8 grid grid-cols-4 gap-3">
                {[
                  { label: "Kcal", val: produto.calorias, color: "orange" },
                  {
                    label: "Prot",
                    val: `${produto.proteinas}g`,
                    color: "blue",
                  },
                  {
                    label: "Carb",
                    val: `${produto.carboidratos}g`,
                    color: "emerald",
                  },
                  {
                    label: "Gord",
                    val: `${produto.gorduras}g`,
                    color: "purple",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl bg-${item.color}-50 border p-2 text-center border-${item.color}-100`}
                  >
                    <span
                      className={`block text-[9px] font-bold uppercase text-${item.color}-400`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`text-xs font-black text-${item.color}-700`}
                    >
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Estabelecimento Minimalista */}
              <div className="mb-8 flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
                <img
                  src={produto.estabelecimento?.foto_estabelecimento}
                  className="h-10 w-10 rounded-xl object-cover"
                  alt=""
                />
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-zinc-800">
                    {produto.estabelecimento?.nome}
                  </h4>
                  <p className="flex items-center gap-1 truncate text-[10px] text-zinc-400">
                    <MapPin size={10} /> {produto.estabelecimento?.endereco}
                  </p>
                </div>
                <div className="border-l border-zinc-200 pl-3 text-right">
                  <span className="block text-[9px] font-bold text-zinc-400 uppercase">
                    Entrega
                  </span>
                  <span className="text-xs font-black text-emerald-600">
                    R${" "}
                    {Number(produto.estabelecimento?.taxa_entrega).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Rodapé: Controles e Botão */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex w-full items-center gap-4 rounded-2xl bg-zinc-100 p-2 sm:w-auto">
                <button
                  onClick={() => setQtd((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:bg-zinc-50 active:scale-90"
                >
                  <Minus size={18} className="text-zinc-600" />
                </button>
                <span className="w-6 text-center text-xl font-black text-zinc-800">
                  {qtd}
                </span>
                <button
                  onClick={() => setQtd((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:bg-zinc-50 active:scale-90"
                >
                  <Plus size={18} className="text-zinc-600" />
                </button>
              </div>

              <button
                onClick={handleConfirmar}
                className="flex w-full flex-1 items-center justify-between rounded-2xl bg-zinc-900 px-6 py-4 font-black text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={20} className="text-emerald-400" />
                  <span>Adicionar</span>
                </div>
                <span className="font-black text-emerald-400">
                  R$ {precoTotal.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProdutoDetalhe
