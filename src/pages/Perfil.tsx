import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../util/ToastAlerta"
import { AuthContext } from "../contexts/AuthContext"
import { atualizar, cadastrar } from "../services/Service"
import type Usuario from "../models/Usuario"
import { Plus } from "lucide-react"

export function Perfil() {
  const navigate = useNavigate()

  const { usuario, handleLogout } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [usuarioEdit, setUsuarioEdit] = useState<Usuario>({
    ...usuario,
    senha: "",
  })

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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioEdit({
      ...usuarioEdit,
      [e.target.name]: e.target.value,
    })
  }

  async function salvarEdicao(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const dadosParaEnviar = {
        id: usuarioEdit.id,
        nome: usuarioEdit.nome,
        usuario: usuarioEdit.usuario,
        senha: usuarioEdit.senha,
        foto: usuarioEdit.foto,
        tipo: usuarioEdit.tipo,
      }

      await atualizar(`/usuarios/atualizar`, dadosParaEnviar, () => {}, {
        headers: {
          Authorization: usuario.token,
        },
      })

      ToastAlerta(
        "Perfil atualizado com sucesso! Por favor, faça login novamente.",
        "sucesso",
      )

      handleLogout()
      navigate("/")
    } catch (error) {
      console.error(error)
      ToastAlerta("Erro ao atualizar o perfil. Verifique os dados.", "erro")
    } finally {
      setIsLoading(false)
    }
  }

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
      await cadastrar(`/estabelecimentos/cadastrar`, loja, () => {}, {
        headers: { Authorization: usuario.token },
      })
      ToastAlerta("Estabelecimento configurado com sucesso!", "sucesso")
      setIsCadastrandoLoja(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
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

  const renderAdminPanel = () => (
    <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6 shadow-md">
      <h3 className="text-2xl font-bold text-red-800">
        Painel de Controle - Administrador
      </h3>
      <p className="mt-2 text-red-600">
        Com grandes poderes vêm grandes responsabilidades.
      </p>
    </div>
  )

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

  const renderUsuarioPanel = () => (
    <div className="mt-8 rounded-lg border border-lime-200 bg-lime-50 p-6 shadow-md">
      <h3 className="text-2xl font-bold text-lime-800">Minha Área</h3>
      <p className="mt-2 text-lime-600">
        Acompanhe seus pedidos de comida saudável.
      </p>
    </div>
  )

  return (
    <div className="mt-16 min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <div className="relative flex flex-col items-center gap-6 border-b border-gray-200 pb-8 sm:flex-row">
          <img
            src={
              usuario.foto ||
              "https://ik.imagekit.io/yvn7qbnm7/undraw_pic_profile_re_7g2h.svg?updatedAt=1738096387060"
            }
            alt={`Foto de perfil`}
            className="h-32 w-32 rounded-full border-4 border-lime-600 object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-800">{usuario.nome}</h1>
            <p className="text-lg text-gray-500">{usuario.usuario}</p>
            <span className="mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              Perfil: {usuario.tipo || "USUARIO"}
            </span>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 rounded bg-yellow-500 px-4 py-2 font-bold text-white transition hover:bg-yellow-600"
            >
              Editar Dados
            </button>
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={salvarEdicao}
            className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6"
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Editar Perfil
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="font-bold text-gray-700">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={usuarioEdit.nome}
                  onChange={atualizarEstado}
                  className="rounded border p-2 focus:border-lime-600 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold text-gray-700">
                  E-mail (Login)
                </label>
                <input
                  type="email"
                  name="usuario"
                  value={usuarioEdit.usuario}
                  onChange={atualizarEstado}
                  className="rounded border bg-gray-100 p-2 focus:border-lime-600 focus:outline-none"
                  readOnly
                  title="O e-mail de login não pode ser alterado por aqui."
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold text-gray-700">
                  Link da Nova Foto
                </label>
                <input
                  type="text"
                  name="foto"
                  value={usuarioEdit.foto}
                  onChange={atualizarEstado}
                  className="rounded border p-2 focus:border-lime-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold text-gray-700">
                  Nova Senha (mín. 8 caracteres)
                </label>
                <input
                  type="password"
                  name="senha"
                  value={usuarioEdit.senha}
                  onChange={atualizarEstado}
                  className="rounded border p-2 focus:border-lime-600 focus:outline-none"
                  placeholder="Digite para alterar"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center justify-center rounded bg-lime-600 px-6 py-2 font-bold text-white hover:bg-lime-700"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  "Salvar Alterações"
                )}
              </button>
            </div>
          </form>
        ) : (
          <>
            {usuario.tipo === "ADM" && renderAdminPanel()}
            {usuario.tipo === "ESTABELECIMENTO" && renderEstabelecimentoPanel()}
            {(!usuario.tipo || usuario.tipo === "USUARIO") &&
              renderUsuarioPanel()}
          </>
        )}
        {/* <CadastrarProdutos /> */}
      </div>
    </div>
  )
}
