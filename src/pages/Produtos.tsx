import { Flame, Search, ShoppingCart } from "lucide-react" // Adicionei o ícone Search
import { useEffect, useState } from "react"
import type Categoria from "../models/Categoria"
import type Produto from "../models/Produto"
import { buscar } from "../services/Service"
import ProdutoDetalhe from "./ProdutoDetalhe"

type FlatProduto = Produto & { categoriaNome: string }

const Produtos = () => {
  const [categoriesList, setCategoriesList] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<FlatProduto | null>(
    null,
  )
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [allProducts, setAllProducts] = useState<FlatProduto[]>([])
  const [filteredProducts, setFilteredProducts] = useState<FlatProduto[]>([])

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        await buscar("/categoria", setCategoriesList)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (categoriesList.length > 0) {
      const flatProducts: FlatProduto[] = categoriesList.flatMap((cat) =>
        (cat.produto ?? []).map((p) => ({
          ...p,
          categoriaNome: cat.nome,
        })),
      )
      setAllProducts(flatProducts)
      setFilteredProducts(flatProducts)
    }
  }, [categoriesList])

  useEffect(() => {
    let result = allProducts

    if (selectedCategory !== "Todos") {
      result = result.filter(
        (p) => p.categoriaNome.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(result)
  }, [selectedCategory, searchTerm, allProducts])

  return (
    <div className="mt-20 min-h-screen bg-gray-50 pb-20">
      <div className="min-h-130 min-w-full bg-[url('img/banner/bgproduto.png')] bg-cover"></div>

      <div className="mt-0 w-full px-4">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50">
          <nav className="no-scrollbar flex justify-center gap-3 overflow-x-auto py-2">
            <button
              onClick={() => setSelectedCategory("Todos")}
              className={`cursor-pointer rounded-full border px-6 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === "Todos"
                  ? "border-green-600 bg-green-600 text-white shadow-md shadow-green-200"
                  : "border-gray-200 bg-white text-gray-500 hover:border-green-300"
              }`}
            >
              Todos
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.nome)}
                className={`cursor-pointer rounded-full border px-6 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.nome
                    ? "border-green-600 bg-green-600 text-white shadow-md shadow-green-200"
                    : "border-gray-200 bg-white text-gray-500 hover:border-green-300"
                }`}
              >
                {cat.nome.charAt(0).toUpperCase() + cat.nome.slice(1)}
              </button>
            ))}
          </nav>
          {/* Input de Busca */}
          <div className="relative mx-auto w-full max-w-2xl">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar pelo nome do prato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-4 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>
        </div>
      </div>

      <main className="mx-auto mt-12 max-w-6xl px-4">
        <div className="mb-6 flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {searchTerm
              ? `Resultados para "${searchTerm}"`
              : selectedCategory === "Todos"
                ? "Nossos Pratos"
                : selectedCategory}
          </h2>
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
              <div
                key={p.id}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={p.foto_produto}
                    alt={p.nome}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wider text-gray-700 uppercase backdrop-blur">
                    {p.categoriaNome}
                  </span>
                </div>

                <div
                  onClick={() => setSelectedProduct(p)}
                  className="flex flex-1 cursor-pointer flex-col p-4"
                >
                  <h4 className="mb-2 min-h-10 leading-tight font-bold text-gray-800">
                    {p.nome}
                  </h4>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.calorias && (
                      <span className="flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-600">
                        <Flame size={12} className="mr-1" /> {p.calorias} kcal
                      </span>
                    )}
                    {p.proteinas && (
                      <span className="flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                        {p.proteinas} prot.
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        Preço
                      </span>
                      <span className="text-lg leading-none font-black text-gray-900">
                        R$ {Number(p.preco).toFixed(2)}
                      </span>
                    </div>
                    <button className="cursor-pointer rounded-xl bg-green-600 p-2.5 text-white shadow-lg shadow-green-100 transition hover:bg-green-700 active:scale-90">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
            <p className="font-medium text-gray-400">
              Ops! Não encontramos nenhum prato com esse nome ou categoria.
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

export default Produtos
