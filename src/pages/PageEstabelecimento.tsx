import { Flame, Pencil, Search, ShoppingCart, Trash2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom" // Importamos useParams
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
  const { id } = useParams<{ id: string }>() // Pegamos o ID da URL

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

        // 1. Busca as categorias para o filtro
        await buscar("/categoria", setCategorias)

        // 2. Busca os dados do estabelecimento específico pelo ID da URL
        if (id) {
          await buscar(`/estabelecimentos/${id}`, (res: Estabelecimento) => {
            setEstabelecimento(res)
            // Se o estabelecimento retornar com a lista de produtos, usamos ela
            if (res.produto) {
              setProdutos(res.produto)
            }
          })
        }
      } catch (error) {
        console.error("Erro ao carregar estabelecimento:", error)
        ToastAlerta("Erro ao carregar os dados do estabelecimento.", "erro")
      } finally {
        setLoading(false)
      }
    }

    fetchDados()
  }, [id])

  // Lógica de Filtro (Categorias e Busca)
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
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await deletar(`/produtos/${productId}`, {
          headers: { Authorization: usuario.token },
        })
        ToastAlerta("Produto deletado com sucesso!", "sucesso")
        setProdutos(produtos.filter((p) => p.id !== productId))
      } catch (error) {
        console.error(error)
        ToastAlerta("Erro ao deletar o produto.", "erro")
      }
    }
  }

  return (
    <div className="mt-20 min-h-screen bg-gray-50 pb-20">
      {/* Banner dinâmico com a foto do estabelecimento */}
      <div
        className="h-64 w-full bg-slate-900 bg-cover bg-center"
        style={{
          backgroundImage: `url(${estabelecimento?.foto_estabelecimento || "img/banner/banner_suco.png"})`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center bg-black/40 backdrop-blur-sm">
          <h1 className="text-4xl font-black tracking-widest text-white uppercase">
            {estabelecimento?.nome || "Carregando..."}
          </h1>
        </div>
      </div>

      <div className="mt-7.5 w-full px-4">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50">
          <nav className="no-scrollbar flex justify-center gap-3 overflow-x-auto py-2">
            <button
              onClick={() => setSelectedCategory("Todos")}
              className={`cursor-pointer rounded-full border px-6 py-2 text-sm font-medium transition-all ${
                selectedCategory === "Todos"
                  ? "border-green-600 bg-green-600 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-500 hover:border-green-300"
              }`}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.nome)}
                className={`cursor-pointer rounded-full border px-6 py-2 text-sm font-medium transition-all ${
                  selectedCategory === cat.nome
                    ? "border-green-600 bg-green-600 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-500 hover:border-green-300"
                }`}
              >
                {cat.nome}
              </button>
            ))}
          </nav>

          <div className="relative mx-auto w-full max-w-2xl">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar no cardápio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-4 pl-12 transition-all outline-none focus:border-green-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      <main className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">
          {selectedCategory === "Todos"
            ? "Cardápio Completo"
            : selectedCategory}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-gray-200"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => {
              // Verifica se o usuário logado é o dono deste estabelecimento específico
              const isOwner = usuario.id === estabelecimento?.usuario?.id

              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl"
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={p.foto_produto}
                      alt={p.nome}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {isOwner && (
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => navigate(`/editarproduto/${p.id}`)}
                          className="rounded-full bg-yellow-400 p-2 text-yellow-900 shadow transition-transform hover:scale-110 hover:bg-yellow-500"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-full bg-red-500 p-2 text-white shadow transition-transform hover:scale-110 hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setSelectedProduct(p)}
                    className="flex flex-1 cursor-pointer flex-col p-4"
                  >
                    <h4 className="font-bold text-gray-800">{p.nome}</h4>
                    <div className="mt-2 flex gap-2">
                      {p.calorias && (
                        <span className="flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                          <Flame size={12} className="mr-1" /> {p.calorias} kcal
                        </span>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-lg font-black text-gray-900">
                        R$ {Number(p.preco).toFixed(2)}
                      </span>
                      <button className="rounded-xl bg-green-600 p-2 text-white transition-all hover:bg-green-700 active:scale-90">
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
          <div className="py-20 text-center">
            <p className="text-gray-400">
              Nenhum produto encontrado neste estabelecimento.
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
