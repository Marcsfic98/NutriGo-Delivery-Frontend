import { Trash2 } from "lucide-react"
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext"
import type Estabelecimento from "../models/Estabelecimento"
import { atualizar, buscar, cadastrar, deletar } from "../services/Service"
import { ToastAlerta } from "../util/ToastAlerta"

export function FormEstabelecimento() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // ID do Estabelecimento vindo da URL
  const { usuario, handleLogout } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  // Estado inicial seguindo EXATAMENTE o seu Model Estabelecimento
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento>({
    id: 0,
    nome: "",
    categoria: "",
    foto_estabelecimento: "",
    endereco: "",
    taxa_entrega: 0,
    usuario: undefined, // Opcional, o backend costuma identificar pelo Token ou ID enviado
  } as Estabelecimento)

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info")
      navigate("/")
    }
  }, [usuario.token, navigate])

  // Busca os dados atuais se for uma edição (id presente na URL)
  useEffect(() => {
    async function buscarEstabelecimentoPorId(id: string) {
      try {
        await buscar(`/estabelecimentos/${id}`, setEstabelecimento, {
          headers: { Authorization: usuario.token },
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (error: any) {
        ToastAlerta("Erro ao carregar dados do estabelecimento", "erro")
        navigate("/perfil")
      }
    }

    if (id !== undefined) {
      buscarEstabelecimentoPorId(id)
    }
  }, [id, usuario.token, navigate])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setEstabelecimento({
      ...estabelecimento,
      [name]: name === "taxa_entrega" ? Number(value) : value,
    })
  }

  async function salvarEstabelecimento(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    // Montando o JSON exatamente como o seu backend pediu
    const dadosEnvio = {
      id: id ? Number(id) : 0, // Se tem ID na URL, envia ele para atualizar
      nome: estabelecimento.nome,
      categoria: estabelecimento.categoria,
      foto_estabelecimento: estabelecimento.foto_estabelecimento,
      endereco: estabelecimento.endereco,
      taxa_entrega: estabelecimento.taxa_entrega,
      // Se o seu backend exigir o vínculo com o usuário na edição:
      usuario: { id: usuario.id },
    }

    try {
      if (id !== undefined) {
        // Rota de ATUALIZAÇÃO que você especificou
        await atualizar(
          `/estabelecimentos/atualizar`,
          dadosEnvio,
          setEstabelecimento,
          { headers: { Authorization: usuario.token } },
        )
        ToastAlerta("Estabelecimento atualizado!", "sucesso")
      } else {
        // Rota de CADASTRO
        await cadastrar(
          `/estabelecimentos/cadastrar`,
          dadosEnvio,
          setEstabelecimento,
          { headers: { Authorization: usuario.token } },
        )
        ToastAlerta("Estabelecimento cadastrado!", "sucesso")
      }
      navigate("/perfil")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 401) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao salvar alterações", "erro")
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function excluirEstabelecimento() {
    if (!window.confirm("Tem certeza que deseja excluir?")) return

    setIsDeleting(true)
    try {
      await deletar(`/estabelecimentos/${id}`, {
        headers: { Authorization: usuario.token },
      })
      ToastAlerta("Excluído com sucesso", "sucesso")
      navigate("/perfil")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ToastAlerta("Erro ao excluir", "erro")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="mt-20 flex min-h-screen items-center justify-center bg-gray-50 px-4 pb-20">
      <form
        onSubmit={salvarEstabelecimento}
        className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-black text-slate-800 uppercase">
            {id ? "Editar Estabelecimento" : "Novo Estabelecimento"}
          </h1>
          {id && (
            <button
              type="button"
              onClick={excluirEstabelecimento}
              className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700"
            >
              {isDeleting ? (
                <ClipLoader size={14} color="#ef4444" />
              ) : (
                <Trash2 size={16} />
              )}
              EXCLUIR
            </button>
          )}
        </div>

        {/* NOME */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black text-slate-500 uppercase">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={estabelecimento.nome}
            onChange={atualizarEstado}
            className="rounded-xl border border-slate-200 p-3 focus:border-lime-500 focus:outline-none"
            required
          />
        </div>

        {/* ENDEREÇO (Importante: estava faltando no seu form antigo) */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black text-slate-500 uppercase">
            Endereço Completo
          </label>
          <input
            type="text"
            name="endereco"
            placeholder="Rua, número, bairro..."
            value={estabelecimento.endereco}
            onChange={atualizarEstado}
            className="rounded-xl border border-slate-200 p-3 focus:border-lime-500 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* CATEGORIA */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black text-slate-500 uppercase">
              Categoria
            </label>
            <input
              type="text"
              name="categoria"
              placeholder="Ex: Fitness, Lanches"
              value={estabelecimento.categoria}
              onChange={atualizarEstado}
              className="rounded-xl border border-slate-200 p-3 focus:border-lime-500 focus:outline-none"
              required
            />
          </div>

          {/* TAXA */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black text-slate-500 uppercase">
              Taxa de Entrega
            </label>
            <input
              type="number"
              name="taxa_entrega"
              step="0.01"
              value={estabelecimento.taxa_entrega}
              onChange={atualizarEstado}
              className="rounded-xl border border-slate-200 p-3 focus:border-lime-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* FOTO */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black text-slate-500 uppercase">
            URL da Imagem
          </label>
          <input
            type="text"
            name="foto_estabelecimento"
            value={estabelecimento.foto_estabelecimento}
            onChange={atualizarEstado}
            className="rounded-xl border border-slate-200 p-3 focus:border-lime-500 focus:outline-none"
            required
          />
        </div>

        <div className="mt-6 flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/perfil")}
            className="px-6 py-3 font-black text-slate-400"
          >
            CANCELAR
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex min-w-[140px] items-center justify-center rounded-xl bg-lime-500 px-8 py-3 font-black text-slate-950 shadow-lg hover:bg-lime-400 disabled:bg-slate-200"
          >
            {isLoading ? (
              <ClipLoader color="#000" size={20} />
            ) : (
              "SALVAR ALTERAÇÕES"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
