import { Plus } from "lucide-react"
import { useContext, useState, useEffect, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import { cadastrar } from "../../services/Service"
import type { ToastAlerta } from "../../util/ToastAlerta"

function CriarEstabelecimento() {
  const navigate = useNavigate()

  const { usuario } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  const [isCadastrandoLoja, setIsCadastrandoLoja] = useState(false)
  const [loja, setLoja] = useState({
    nome: "",
    categoria: "Saudável",
    taxa_entrega: 0,
    foto_estabelecimento: "",
    endereco: "",
  })

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado para acessar o perfil", "erro")
      navigate("/")
    }
  }, [usuario.token, navigate])

  function atualizarEstadoLoja(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setLoja({
      ...loja,
      [e.target.name]:
        e.target.name === "taxa_entrega"
          ? Number(e.target.value)
          : e.target.value,
    })
  }

  async function cadastrarLoja(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log("loja enviada:", loja)
      await cadastrar(`/estabelecimentos/cadastrar`, loja, () => {}, {
        headers: { Authorization: usuario.token },
      })
      ToastAlerta("Estabelecimento configurado com sucesso!", "sucesso")

      setIsCadastrandoLoja(false)
      console.log("formulario fechado", isCadastrandoLoja)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao cadastrar loja:", error)
      if (error.response && error.response.data) {
        const mensagemDoBackend = error.response.data.message
        alert(
          `Motivo da recusa do Back-end: ${JSON.stringify(mensagemDoBackend)}`,
        )
      }
      ToastAlerta("Erro ao configurar estabelecimento.", "erro")
    } finally {
      setIsLoading(false)
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
            Configure sua loja para começar a vender.
          </p>
        </div>
        {!isCadastrandoLoja && (
          <button
            onClick={() => setIsCadastrandoLoja(true)}
            className="flex items-center justify-center gap-2 rounded bg-green-600 px-4 py-2 font-bold text-white shadow-md transition hover:bg-green-700"
          >
            <Plus size={20} />
            Criar Loja
          </button>
        )}
      </div>

      {isCadastrandoLoja && (
        <form
          onSubmit={cadastrarLoja}
          className="mt-4 border-t border-orange-200 pt-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <label className="font-bold text-orange-800">Nome da Loja</label>
              <input
                type="text"
                name="nome"
                value={loja.nome}
                onChange={atualizarEstadoLoja}
                className="rounded border border-orange-300 p-2 focus:border-orange-600 focus:outline-none"
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
                className="rounded border border-orange-300 bg-white p-2 focus:border-orange-600 focus:outline-none"
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
                className="rounded border border-orange-300 p-2 focus:border-orange-600 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
              <label className="font-bold text-orange-800">
                Foto do Estabelecimento (URL)
              </label>
              <input
                type="text"
                name="foto_estabelecimento"
                value={loja.foto_estabelecimento}
                onChange={atualizarEstadoLoja}
                className="rounded border border-orange-300 p-2 focus:border-orange-600 focus:outline-none"
                placeholder="https://link-da-imagem..."
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
                className="rounded border border-orange-300 p-2 focus:border-orange-600 focus:outline-none"
                placeholder="Rua Exemplo, 123, Bairro, Paulista - PE"
                required
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsCadastrandoLoja(false)}
              className="rounded bg-red-400 px-4 py-2 font-bold text-white hover:bg-red-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center justify-center rounded bg-green-600 px-6 py-2 font-bold text-white hover:bg-green-700"
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
    </div>
  )
  return <div>{renderEstabelecimentoPanel()}</div>
}

export default CriarEstabelecimento
