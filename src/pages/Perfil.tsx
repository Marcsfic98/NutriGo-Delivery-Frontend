import {
  CheckCircle,
  Clock,
  Package,
  PlusCircle,
  Settings,
  ShoppingBag,
  Store,
  UserCircle,
} from "lucide-react"
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import CriarEstabelecimento from "../components/botões/CriarEstabelecimento"
import { CardProduto } from "../components/cardprodutos/CardProduto"
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
  }, [usuario.token])

  async function buscarDadosUsuario() {
    try {
      await buscar(
        `/usuarios/${usuario.id}`,
        (res: Usuario) => setUsuarioCompleto(res),
        { headers: { Authorization: usuario.token } },
      )
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error)
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioEdit({ ...usuarioEdit, [e.target.name]: e.target.value })
  }

  async function salvarEdicao(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await atualizar(
        `/usuarios/atualizar`,
        { ...usuarioEdit, id: usuario.id },
        () => {},
        {
          headers: { Authorization: usuario.token },
        },
      )
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

  // --- PAINEL DO ESTABELECIMENTO (DONO) ---
  const renderEstabelecimentoPanel = () => {
    const meuEstabelecimento = usuarioCompleto?.estabelecimento

    const produtosDoDono = usuarioCompleto?.estabelecimento?.produto || []

    return (
      <div className="animate-fadeIn mt-8 space-y-8">
        {meuEstabelecimento && (
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-2xl">
            <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row">
              <img
                src={
                  meuEstabelecimento.foto_estabelecimento ||
                  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"
                }
                alt={meuEstabelecimento.nome}
                className="h-24 w-24 rounded-2xl border-2 border-lime-400 object-cover shadow-lg"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <Store size={20} className="text-lime-400" />
                  <h2 className="text-2xl font-black tracking-tight uppercase">
                    {meuEstabelecimento.nome}
                  </h2>
                </div>
              </div>
              <button
                onClick={() =>
                  navigate(`/editarestabelecimento/${meuEstabelecimento.id}`)
                }
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold transition hover:bg-slate-700"
              >
                <Settings size={16} /> CONFIGURAR LOJA
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-700 uppercase">
              Gestão de Cardápio
            </h3>
            <button
              onClick={() => navigate("/cadastrarProduto")}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <PlusCircle size={18} /> ADICIONAR PRATO
            </button>
          </div>
          <CardProduto produtos={produtosDoDono} titulo="" isOwner={true} />
        </div>
      </div>
    )
  }

  // --- PAINEL DO USUÁRIO (CLIENTE - HISTÓRICO DE PEDIDOS) ---
  const renderUsuarioPanel = () => (
    <div className="mt-8">
      <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
        <ShoppingBag className="text-lime-600" size={28} />
        <h3 className="text-2xl font-bold text-gray-800">Meus Pedidos</h3>
      </div>

      {!usuarioCompleto ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ClipLoader color="#65a30d" size={40} />
        </div>
      ) : usuarioCompleto.pedido && usuarioCompleto.pedido.length > 0 ? (
        <div className="flex flex-col gap-8">
          {usuarioCompleto.pedido.map((pedido) => (
            <div
              key={pedido.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-lime-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                    {(pedido.estabelecimento as Estabelecimento)
                      ?.foto_estabelecimento ? (
                      <img
                        src={
                          (pedido.estabelecimento as Estabelecimento)
                            .foto_estabelecimento
                        }
                        alt="Loja"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Store className="text-gray-300" size={24} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-lime-600">
                      {(pedido.estabelecimento as Estabelecimento).nome}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      Pedido #{pedido.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Data
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {new Date(pedido.data_pedido).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1 ${pedido.status === "Entregue" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {pedido.status === "Entregue" ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    <span className="text-xs font-bold uppercase">
                      {pedido.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="space-y-3">
                  {pedido.itensPedido?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        {item.produto?.foto_produto && (
                          <img
                            src={item.produto.foto_produto}
                            alt={item.produto.nome}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        )}
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-100 text-sm font-bold text-lime-700">
                          {item.quantidade}x
                        </span>
                        <p className="text-sm font-bold text-gray-800">
                          {item.produto?.nome}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-700">
                        R${" "}
                        {(Number(item.preco_unitario) * item.quantidade)
                          .toFixed(2)
                          .replace(".", ",")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 bg-lime-50/30 px-6 py-4">
                <span className="text-sm font-bold text-lime-800">
                  Total Pago
                </span>
                <span className="text-2xl font-black text-lime-700">
                  R$ {Number(pedido.valor_total).toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 py-20 text-center">
          <Package size={60} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-bold text-gray-500">
            Nenhum pedido realizado ainda.
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className="mt-16 min-h-screen bg-[#F8FAFC] px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl md:p-10">
        {/* Header do Perfil */}
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
            <h1 className="text-4xl font-black text-slate-800">
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
              className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-black text-amber-900 shadow-lg hover:bg-amber-500"
            >
              EDITAR PERFIL
            </button>
          )}
        </div>

        {/* Lógica de Conteúdo */}
        {isEditing ? (
          <form onSubmit={salvarEdicao} className="mt-10 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">
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
                <label className="text-xs font-black text-slate-500 uppercase">
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
                <label className="text-xs font-black text-slate-500 uppercase">
                  Confirme sua senha para salvar
                </label>
                <input
                  type="password"
                  name="senha"
                  value={usuarioEdit.senha}
                  onChange={atualizarEstado}
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none focus:ring-4 focus:ring-lime-500/10"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer px-6 py-2 font-bold text-gray-400"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-2xl bg-lime-600 px-10 py-3 font-black text-white hover:bg-lime-700"
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
            {/* Se for ESTABELECIMENTO */}
            {usuario.tipo === "ESTABELECIMENTO" &&
              (usuarioCompleto?.estabelecimento?.id === undefined ? (
                <div className="mt-10">
                  <CriarEstabelecimento />
                </div>
              ) : (
                renderEstabelecimentoPanel()
              ))}

            {/* Se for USUARIO comum */}
            {(usuario.tipo === "USUARIO" || !usuario.tipo) &&
              renderUsuarioPanel()}
          </>
        )}
      </div>
    </div>
  )
}
