import {
  ChevronLeft,
  Flame,
  Pencil,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import type Categoria from "../models/Categoria"
import type Estabelecimento from "../models/Estabelecimento"
import type Produto from "../models/Produto"
import { buscar, deletar } from "../services/Service"
import { ToastAlerta } from "../util/ToastAlerta"
import ProdutoDetalhe from "./ProdutoDetalhe"

function PageEstabelecimento() {
  const { usuario } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Produto[]>([])
  const [estabelecimento, setEstabelecimento] =
    useState<Estabelecimento | null>(null)

  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchDados() {
      try {
        setLoading(true)
        await buscar("/categoria", setCategorias)

        if (id) {
          await buscar(`/estabelecimentos/${id}`, (res: Estabelecimento) => {
            setEstabelecimento(res)
            if (res.produto) setProdutos(res.produto)
          })
        }
      } catch (error) {
        console.error("Erro ao carregar estabelecimento:", error)
        ToastAlerta("Erro ao carregar os dados.", "erro")
      } finally {
        setLoading(false)
      }
    }
    fetchDados()
  }, [id])

  useEffect(() => {
    let result = produtos
    if (selectedCategory !== "Todos") {
      result = result.filter(
        (p) =>
          p.categoria?.nome.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }
    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    setFilteredProducts(result)
  }, [selectedCategory, searchTerm, produtos])

  async function handleDelete(productId: number) {
    if (window.confirm("Deseja deletar este produto?")) {
      try {
        await deletar(`/produtos/${productId}`, {
          headers: { Authorization: usuario.token },
        })
        ToastAlerta("Produto deletado!", "sucesso")
        setProdutos(produtos.filter((p) => p.id !== productId))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        ToastAlerta("Erro ao deletar.", "erro")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20 md:pt-20">
      <div
        className="relative h-44 w-full bg-slate-900 bg-cover bg-center md:h-64 lg:h-80"
        style={{
          backgroundImage: `url(${estabelecimento?.foto_estabelecimento || "img/banner/banner_suco.png"})`,
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-black/50 px-4 text-center backdrop-blur-[2px]">
          <h1 className="text-xl font-black tracking-tighter text-white uppercase sm:text-4xl md:tracking-widest">
            {estabelecimento?.nome || "Carregando..."}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-black/20 p-2 text-[10px] font-bold text-white/80 backdrop-blur-md hover:text-white md:left-10 md:text-xs"
          >
            <ChevronLeft size={16} /> VOLTAR
          </button>
        </div>
      </div>

      <div className="mx-auto -mt-6 w-full max-w-6xl px-4 md:-mt-10">
        <div className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-4 shadow-xl shadow-gray-200/50 md:gap-6 md:rounded-[2rem] md:p-8">
          <nav className="no-scrollbar scrollbar-hide mt-10 flex w-full gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory("Todos")}
              className={`rounded-full border px-5 py-2 text-[10px] font-bold tracking-wider whitespace-nowrap uppercase transition-all sm:text-sm ${
                selectedCategory === "Todos"
                  ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-100"
                  : "border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100"
              }`}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.nome)}
                className={`rounded-full border px-5 py-2 text-[10px] font-bold tracking-wider whitespace-nowrap uppercase transition-all sm:text-sm ${
                  selectedCategory === cat.nome
                    ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-100"
                    : "border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {cat.nome}
              </button>
            ))}
          </nav>

          <div className="relative w-full">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-300"
              size={18}
            />
            <input
              type="text"
              placeholder="O que você quer comer hoje?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 pr-4 pl-11 text-sm font-medium transition-all outline-none focus:border-green-500 focus:bg-white md:rounded-2xl md:py-4 md:pl-12 md:text-base"
            />
          </div>
        </div>
      </div>

      <main className="mx-auto mt-8 max-w-7xl px-4 md:mt-16">
        <header className="mb-6 flex items-end justify-between px-2">
          <div>
            <p className="text-[9px] font-black tracking-[0.2em] text-green-600 uppercase md:text-[10px]">
              Cardápio
            </p>
            <h2 className="text-xl font-black tracking-tighter text-gray-800 uppercase italic sm:text-3xl">
              {selectedCategory === "Todos"
                ? "Tudo pra você"
                : selectedCategory}
            </h2>
          </div>
          <p className="text-[10px] font-bold text-gray-400 md:text-xs">
            {filteredProducts.length} itens
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-[1.5rem] bg-gray-200 md:h-72 md:rounded-[2rem]"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p) => {
              const isOwner = usuario.id === estabelecimento?.usuario?.id

              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col rounded-[1.5rem] border border-gray-100 bg-white p-3 shadow-sm transition-all hover:shadow-xl active:scale-[0.98] md:rounded-[2rem] md:hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-[1.2rem] md:h-44 md:rounded-[1.5rem]">
                    <img
                      src={p.foto_produto}
                      alt={p.nome}
                      className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                    />

                    {/* Botões de Ação do Dono */}
                    {isOwner && (
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/editarproduto/${p.id}`)
                          }}
                          className="rounded-full bg-white/90 p-2 text-zinc-800 shadow-xl backdrop-blur-md transition-all hover:bg-yellow-400"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(p.id)
                          }}
                          className="rounded-full bg-white/90 p-2 text-red-500 shadow-xl backdrop-blur-md transition-all hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}

                    {p.calorias && (
                      <div className="absolute bottom-2 left-2 flex items-center rounded-full bg-black/40 px-3 py-1 text-[8px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                        <Flame size={10} className="mr-1 text-orange-400" />{" "}
                        {p.calorias} kcal
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setSelectedProduct(p)}
                    className="flex flex-1 cursor-pointer flex-col p-3 md:p-4"
                  >
                    <h4 className="text-lg leading-tight font-black text-gray-800 transition-colors group-hover:text-green-600">
                      {p.nome}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-gray-400">
                      {p.descricao}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-gray-300 uppercase">
                          Preço
                        </span>
                        <span className="text-xl font-black tracking-tighter text-gray-900">
                          R$ {Number(p.preco).toFixed(2)}
                        </span>
                      </div>
                      <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white transition-all active:scale-90 md:h-12 md:w-12 md:rounded-2xl md:hover:bg-green-600">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
              <Search size={32} className="text-gray-300" />
            </div>
            <p className="max-w-[200px] text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Nenhum sabor encontrado para essa busca.
            </p>
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProdutoDetalhe
          produto={{
            ...selectedProduct,
            categoriaNome: selectedProduct.categoria?.nome || "Sem Categoria",
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default PageEstabelecimento
