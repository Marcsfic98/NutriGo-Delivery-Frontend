import { Plus, Store, Trash2 } from "lucide-react"
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import { buscar, cadastrar, deletar } from "../../services/Service"
import { ToastAlerta } from "../../util/ToastAlerta"

// 1. Interfaces para Tipagem do TS
interface Estabelecimento {
  id: string | number
  nome: string
  categoria: string
  taxa_entrega: number
  foto_estabelecimento: string
  endereco: string
}

function CriarEstabelecimento() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  // Estados
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isCadastrandoLoja, setIsCadastrandoLoja] = useState(false)

  const [loja, setLoja] = useState<Omit<Estabelecimento, "id">>({
    nome: "",
    categoria: "Saudável",
    taxa_entrega: 0,
    foto_estabelecimento: "",
    endereco: "",
  })

  // Proteção de Rota
  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado para acessar o perfil", "erro")
      navigate("/")
    }
  }, [usuario.token, navigate])

  function atualizarEstadoLoja(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setLoja({
      ...loja,
      [name]: name === "taxa_entrega" ? Number(value) : value,
    })
  }

  async function cadastrarLoja(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await cadastrar(`/estabelecimentos/cadastrar`, loja, () => {}, {
        headers: { Authorization: usuario.token },
      })

      ToastAlerta("Estabelecimento configurado com sucesso!", "sucesso")
      navigate("/home")
      setIsCadastrandoLoja(false)
      setLoja({
        nome: "",
        categoria: "Saudável",
        taxa_entrega: 0,
        foto_estabelecimento: "",
        endereco: "",
      })

      // Atualiza a lista automaticamente após cadastrar
      buscarMeusEstabelecimentos()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const mensagemBack = error.response?.data?.message || "Erro desconhecido"
      ToastAlerta(`Erro: ${mensagemBack}`, "erro")
    } finally {
      setIsLoading(false)
    }
  }

  async function buscarMeusEstabelecimentos() {
    try {
      // O Service 'buscar' preenche o estado via setEstabelecimentos
      await buscar(`/usuarios/${usuario.id}`, setEstabelecimentos, {
        headers: { Authorization: usuario.token },
      })
    } catch (error) {
      console.error("Erro ao buscar estabelecimentos", error)
    }
  }

  async function deletarEstabelecimentoPorId(id: string | number) {
    try {
      await deletar(`/estabelecimentos/${id}`, {
        headers: { Authorization: usuario.token },
      })
      ToastAlerta("Estabelecimento removido!", "sucesso")
      setEstabelecimentos(estabelecimentos.filter((e) => e.id !== id))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ToastAlerta("Erro ao deletar estabelecimento.", "erro")
    }
  }

  const renderEstabelecimentoPanel = () => (
    <div className="mt-8 rounded-lg border border-orange-200 bg-orange-50 p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-orange-800">
            Meus Estabelecimentos
          </h3>
          <p className="mt-2 text-orange-600">
            Gerencie suas lojas e taxas de entrega.
          </p>
        </div>
        {!isCadastrandoLoja && (
          <button
            onClick={() => setIsCadastrandoLoja(true)}
            className="flex items-center justify-center gap-2 rounded bg-green-600 px-4 py-2 font-bold text-white shadow-md transition hover:bg-green-700"
          >
            <Plus size={20} />
            Criar Nova Loja
          </button>
        )}
      </div>

      {isCadastrandoLoja && (
        <form
          onSubmit={cadastrarLoja}
          className="animate-fade-in mt-4 border-t border-orange-200 pt-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <label className="font-bold text-orange-800">Nome da Loja</label>
              <input
                type="text"
                name="nome"
                value={loja.nome}
                onChange={atualizarEstadoLoja}
                className="rounded border border-orange-300 p-2 outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ex: FitFood"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold text-orange-800">Categoria</label>
              <select
                name="categoria"
                value={loja.categoria}
                onChange={atualizarEstadoLoja}
                className="rounded border border-orange-300 bg-white p-2 outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Saudável">Saudável</option>
                <option value="Vegano">Vegano</option>
                <option value="Sem Glúten">Sem Glúten</option>
                <option value="Lanches Fit">Lanches Fit</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-bold text-orange-800">
                Taxa de Entrega (R$)
              </label>
              <input
                type="number"
                name="taxa_entrega"
                value={loja.taxa_entrega}
                onChange={atualizarEstadoLoja}
                min="0"
                step="0.10"
                className="rounded border border-orange-300 p-2 outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
              <label className="font-bold text-orange-800">Foto (URL)</label>
              <input
                type="text"
                name="foto_estabelecimento"
                value={loja.foto_estabelecimento}
                onChange={atualizarEstadoLoja}
                className="rounded border border-orange-300 p-2"
                placeholder="https://..."
                required
              />
            </div>

            <div className="flex flex-col sm:col-span-2 lg:col-span-2">
              <label className="font-bold text-orange-800">
                Endereço Completo
              </label>
              <input
                type="text"
                name="endereco"
                value={loja.endereco}
                onChange={atualizarEstadoLoja}
                className="rounded border border-orange-300 p-2"
                placeholder="Rua Exemplo, 123..."
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsCadastrandoLoja(false)}
              className="rounded bg-gray-400 px-4 py-2 font-bold text-white transition hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-w-[120px] items-center justify-center rounded bg-green-600 px-6 py-2 font-bold text-white transition hover:bg-green-700"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                "Salvar Loja"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Seção de Listagem para usar a variável 'estabelecimentos' */}
      <div className="mt-8 border-t border-orange-200 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-xl font-bold text-orange-800">
            <Store size={24} /> Lojas Cadastradas
          </h4>
          <button
            onClick={buscarMeusEstabelecimentos}
            className="text-sm font-semibold text-orange-600 hover:underline"
          >
            Atualizar Lista
          </button>
        </div>

        {estabelecimentos.length === 0 ? (
          <p className="text-orange-400 italic">
            Nenhum estabelecimento carregado.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {estabelecimentos.map((est) => (
              <div
                key={est.id}
                className="flex items-center justify-between rounded-lg border border-orange-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={est.foto_estabelecimento}
                    alt={est.nome}
                    className="h-12 w-12 rounded-full border border-orange-200 object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{est.nome}</p>
                    <p className="text-xs text-gray-500">{est.categoria}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-green-700">
                    R$ {est.taxa_entrega.toFixed(2)}
                  </span>
                  <button
                    onClick={() => deletarEstabelecimentoPorId(est.id)}
                    className="text-red-500 transition hover:text-red-700"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 pb-12">
      {renderEstabelecimentoPanel()}
    </div>
  )
}

export default CriarEstabelecimento
