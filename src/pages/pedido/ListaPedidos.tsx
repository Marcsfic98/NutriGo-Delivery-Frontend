import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Estabelecimento from "../../models/Estabelecimento"
import type Pedido from "../../models/Pedido"
import type Usuario from "../../models/Usuario"
import { buscar } from "../../services/Service"
import { ToastAlerta } from "../../util/ToastAlerta"

function ListaPedidos() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  const [usuarioData, setUsuarioData] = useState<Usuario>({} as Usuario)
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento>(
    {} as Estabelecimento,
  )
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  const authHeader = (token: string) => ({
    headers: {
      Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
    },
  })

  useEffect(() => {
    if (usuario.token !== "") {
      buscar(
        `/usuarios/${usuario.id}`,
        setUsuarioData,
        authHeader(usuario.token),
      )
    } else {
      ToastAlerta("Você precisa estar logado!", "info")
      navigate("/login")
    }
  }, [usuario.token, usuario.id])

 useEffect(() => {
  if (usuarioData.estabelecimento?.id) {
    buscar(
      `/estabelecimentos/${usuarioData.estabelecimento.id}`,
      setEstabelecimento,
      authHeader(usuario.token)
    )
  }
}, [usuarioData, usuario.token])

  useEffect(() => {
    if (estabelecimento.pedido) {
      const ordenados = [...estabelecimento.pedido].sort(
        (a, b) => (b.id || 0) - (a.id || 0),
      )
      setPedidos(ordenados)
    }
  }, [estabelecimento])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cancelado":
        return "bg-rose-500"
      case "Saiu para entrega":
        return "bg-blue-500"
      case "Entregue":
        return "bg-emerald-500"
      case "Em preparo":
        return "bg-amber-500"
      default:
        return "bg-zinc-400"
    }
  }

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Cancelado":
        return "bg-rose-50 text-rose-600 border-rose-100"
      case "Saiu para entrega":
        return "bg-blue-50 text-blue-600 border-blue-100"
      case "Entregue":
        return "bg-emerald-50 text-emerald-600 border-emerald-100"
      default:
        return "bg-amber-50 text-amber-600 border-amber-100"
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-emerald-50/70 via-white to-white pt-32 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Banner de Boas-vindas (Estilo Versão 1) */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-100/70 blur-xl" />
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {estabelecimento.foto_estabelecimento && (
                <img
                  src={estabelecimento.foto_estabelecimento}
                  className="h-20 w-20 rounded-2xl border-2 border-white object-cover shadow-md"
                  alt="Logo"
                />
              )}
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-emerald-600 uppercase">
                  Painel Administrativo
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-800 sm:text-4xl">
                  {estabelecimento.nome || "Seus Pedidos"}
                </h1>
                <p className="mt-2 text-sm text-zinc-500">
                  Gerencie as entregas e o status dos pedidos em tempo real.
                </p>
              </div>
            </div>
            
          </div>
        </section>

        <div className="mt-12 mb-8 flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-zinc-800 uppercase">
              Fila de Produção
            </h2>
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
            {pedidos.length} total
          </span>
        </div>

        {pedidos.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white/50 p-20 text-center">
            <p className="font-medium text-zinc-500">
              Nenhum pedido encontrado para este estabelecimento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pedidos.map((p) => (
              <article
                key={p.id}
                className="relative flex min-h-[280px] overflow-hidden rounded-[2.5rem] border border-white bg-white/80 shadow-xl shadow-zinc-200/40 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-100/50"
              >
                <div className={`w-2.5 shrink-0 ${getStatusColor(p.status)}`} />

                <div className="flex flex-1 flex-col p-6 pl-4">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-wider text-zinc-400 uppercase">
                        Ref. #{p.id}
                      </span>
                      <h2 className="mt-0.5 text-2xl font-black text-zinc-800">
                        {p.valor_total.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </h2>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`rounded-lg border px-2 py-1 text-[9px] font-bold tracking-wider uppercase ${getBadgeStyle(p.status)}`}
                      >
                        {p.status}
                      </div>

                      <div className="flex gap-1.5">
                        <Link
                          to={`/editarPedido/${p.id}`}
                          className="rounded-lg bg-amber-50 p-2 text-amber-600 transition-colors hover:bg-amber-100"
                          title="Editar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </Link>
                        <Link
                          to={`/deletarPedido/${p.id}`}
                          className="rounded-lg bg-rose-50 p-2 text-rose-600 transition-colors hover:bg-rose-100"
                          title="Deletar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden rounded-3xl border border-zinc-100/50 bg-zinc-50/50 p-4">
                    <p className="mb-3 text-[9px] font-black tracking-widest text-zinc-400 uppercase">
                      Itens Pedidos
                    </p>
                    <div className="custom-scrollbar max-h-40 space-y-3 overflow-y-auto pr-2">
                      {p.itensPedido?.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.produto.foto_produto}
                            className="h-10 w-10 rounded-xl border border-white object-cover shadow-sm"
                            alt=""
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs leading-tight font-bold text-zinc-800">
                              {item.produto.nome}
                            </p>
                            <p className="text-[10px] font-semibold text-zinc-500">
                              {item.quantidade}x •{" "}
                              {item.preco_unitario.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">
                      {new Date(p.data_pedido).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="text-[10px] font-black tracking-tighter text-emerald-600/60 italic">
                      PRONTO PARA ENVIO
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListaPedidos
