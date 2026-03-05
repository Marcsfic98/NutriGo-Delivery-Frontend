import { Flame, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import ProdutoDetalhe from "../../pages/ProdutoDetalhe"

const CardProduto = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState("Todos")
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = ["Todos", "Proteicos", "Veganos", "Low Carb", "Lanches"]

  useEffect(() => {
    // Simulando API com 8 exemplos variados
    const mockData = [
      {
        id: 1,
        nome: "Salmão Grelhado com Aspargos",
        preco: 45.9,
        cal: 350,
        protein: "30g",
        cat: "Low Carb",
        img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
      },      
    ]

    setProducts(mockData)
    setFilteredProducts(mockData)
    setLoading(false)
  }, [])

  // Lógica de Filtro
  useEffect(() => {
    if (category === "Todos") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((p) => p.cat === category))
    }
  }, [category, products])

  return (
    <div className="mt-20 min-h-screen bg-gray-50 pb-20">
      <div className="min-h-130 min-w-full bg-[url('img/banner/bgproduto.png')] bg-cover"></div>
      {/* Categorias - Scroll Horizontal no Mobile */}
      <nav className="no-scrollbar mx-auto flex max-w-6xl justify-center gap-3 overflow-x-auto px-4 py-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`cursor-pointer rounded-full border px-6 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              category === item
                ? "border-green-600 bg-green-600 text-white shadow-md shadow-green-200"
                : "border-gray-200 bg-white text-gray-500 hover:border-green-300"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
          <div className="ml-2 h-px flex-1 bg-gray-200"></div>
        </div>

        {loading ? (
          <div className="grid animate-pulse grid-cols-2 gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-gray-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              /* Card com display flex e flex-col para alinhar o botão no fundo */
              <div
                key={p.id}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={p.img}
                    alt={p.nome}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wider text-gray-700 uppercase backdrop-blur">
                    {p.cat}
                  </span>
                </div>

                {/* Corpo do Card com flex-1 para empurrar o rodapé */}
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="flex flex-1 flex-col p-4"
                >
                  <h4 className="mb-2 min-h-[40px] leading-tight font-bold text-gray-800">
                    {p.nome}
                  </h4>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-600">
                      <Flame size={12} className="mr-1" /> {p.cal} kcal
                    </span>
                    <span className="flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                      {p.protein} prot.
                    </span>
                  </div>

                  {/* Rodapé do card SEMPRE no final */}
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        Preço
                      </span>
                      <span className="text-lg leading-none font-black text-gray-900">
                        R$ {p.preco.toFixed(2)}
                      </span>
                    </div>
                    <button className="rounded-xl bg-green-600 p-2.5 text-white shadow-lg shadow-green-100 transition hover:bg-green-700 active:scale-90">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
            <p className="font-medium text-gray-400">
              Nenhum prato encontrado nesta categoria.
            </p>
          </div>
        )}
      </main>
      {selectedProduct && (
        <ProdutoDetalhe
          produto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default CardProduto
