import {
  CheckCircle,
  Clock,
  Package,
  ShoppingBag,
  Store,
  Tag,
  UserCircle,
} from "lucide-react"
import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext"
import type Estabelecimento from "../models/Estabelecimento"
import type Usuario from "../models/Usuario"
import { atualizar, buscar } from "../services/Service"
import { ToastAlerta } from "../util/ToastAlerta"

export function Perfil() {
  const navigate = useNavigate()
  const { usuario, handleLogout } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [usuarioCompleto, setUsuarioCompleto] = useState<Usuario | null>(null)

  const [usuarioEdit, setUsuarioEdit] = useState<Usuario>({
    ...usuario,
    senha: "",
  })

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado para acessar o perfil", "erro")
      navigate("/")
    } else {
      buscarDadosUsuario()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario.token])

  async function buscarDadosUsuario() {
    try {
      await buscar(
        `/usuarios/${usuario.id}`,
        (res: Usuario) => {
          setUsuarioCompleto(res)
        },
        {
          headers: { Authorization: usuario.token },
        },
      )
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error)
    }
  }

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
        headers: { Authorization: usuario.token },
      })
      ToastAlerta("Perfil atualizado! Faça login novamente.", "sucesso")
      handleLogout()
      navigate("/")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ToastAlerta("Erro ao atualizar o perfil.", "erro")
    } finally {
      setIsLoading(false)
    }
  }

  const renderUsuarioPanel = () => (
    <div className="mt-8">
      <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
        <ShoppingBag className="text-lime-600" size={28} />
        <h3 className="text-2xl font-bold text-gray-800">Meus Pedidos</h3>
      </div>



  const renderUsuarioPanel = () => (
    <div className="mt-8 rounded-lg border border-lime-200 bg-lime-50 p-6 shadow-md">
      <h3 className="text-2xl font-bold text-lime-800">Minha Área</h3>
      <p className="mt-2 text-lime-600">
        Acompanhe seus pedidos de comida saudável.
      </p>
    </div>
  )

  return (
    <div className="mt-16 min-h-screen bg-[#F8FAFC] px-4 py-12 font-sans">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 md:p-10">
        <div className="relative flex flex-col items-center gap-8 border-b border-gray-100 pb-10 sm:flex-row">
          <div className="group relative">
            <img
              src={
                usuario.foto ||
                "https://ik.imagekit.io/yvn7qbnm7/undraw_pic_profile_re_7g2h.svg"
              }
              alt="Foto de Perfil"
              className="h-32 w-32 rounded-3xl border-4 border-lime-500 object-cover shadow-2xl"
            />
            <div className="absolute -right-2 -bottom-2 rounded-xl border-4 border-white bg-lime-600 p-1.5 text-white">
              <UserCircle size={20} />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-4xl font-black tracking-tight text-slate-800">
              {usuario.nome}
            </h1>
            <p className="text-lg font-medium text-slate-400">
              {usuario.usuario}
            </p>
            <div className="mt-4">
              <span className="rounded-xl bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-600 uppercase">
                {usuario.tipo || "CLIENTE"}
              </span>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-black text-amber-900 shadow-lg hover:bg-amber-500"
            >
              EDITAR PERFIL
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={salvarEdicao} className="mt-10 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-xs font-black text-slate-500 uppercase">
                  Seu Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={usuarioEdit.nome}
                  onChange={atualizarEstado}
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:ring-4 focus:ring-lime-500/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-black text-slate-500 uppercase">
                  URL da Foto
                </label>
                <input
                  type="text"
                  name="foto"
                  value={usuarioEdit.foto}
                  onChange={atualizarEstado}
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:ring-4 focus:ring-lime-500/10"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="ml-1 text-xs font-black text-slate-500 uppercase">
                  Confirme sua senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={usuarioEdit.senha}
                  onChange={atualizarEstado}
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:ring-4 focus:ring-lime-500/10"
                  placeholder="Digite sua senha para salvar"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 text-sm font-bold text-gray-400"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-lime-600 px-10 py-3 font-black text-white hover:bg-lime-700"
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={18} />
                ) : (
                  "SALVAR ALTERAÇÕES"
                )}
              </button>
            </div>
          </form>
        ) : (
          <>
            {usuario.tipo === "ADM" && renderAdminPanel()}
            {usuario.tipo === "ESTABELECIMENTO" && <CriarEstabelecimento/>}
            {(!usuario.tipo || usuario.tipo === "USUARIO") &&
              renderUsuarioPanel()}
          </>
        )}
        {/* <CadastrarProdutos /> */}
      </div>
    </div>
  )
}
