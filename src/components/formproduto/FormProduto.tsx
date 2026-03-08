import { ArrowLeft, LayoutGrid, PlusCircle, Save, Zap } from "lucide-react"
import type { ChangeEvent, FormEvent } from "react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Categoria from "../../models/Categoria"
import type Estabelecimento from "../../models/Estabelecimento"
import type Produto from "../../models/Produto"
import { atualizar, buscar, cadastrar } from "../../services/Service"
import { ToastAlerta } from "../../util/ToastAlerta"

export function FormProduto() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario, handleLogout } = useContext(AuthContext)

  const [categorias, setCategorias] = useState<Categoria[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    descricao: "",
    foto_produto: "",
    preco: 0,
    calorias: "",
    proteinas: "",
    carboidratos: "",
    gorduras: "",
    categoria: null,
    estabelecimento: undefined,
  } as unknown as Produto)

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info")
      navigate("/")
    } else if (usuario.tipo !== "ESTABELECIMENTO") {
      ToastAlerta("Acesso negado", "erro")
      navigate("/home")
    }
  }, [usuario.token, navigate, usuario.tipo])

  useEffect(() => {
    async function carregarDados() {
      try {
        await Promise.all([
          buscar("/categoria", setCategorias),
          buscar("/estabelecimentos", setEstabelecimentos, {
            headers: { Authorization: usuario.token },
          }),
        ])
        if (id !== undefined) await buscar(`/produtos/${id}`, setProduto)
      } catch (error) {
        if (String(error).includes("401")) handleLogout()
      }
    }
    carregarDados()
  }, [id, handleLogout, usuario.token])

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    if (name === "categoria") {
      setProduto({
        ...produto,
        categoria: { id: Number(value), nome: "", produto: [] },
      })
    } else {
      setProduto({
        ...produto,
        [name]: name === "preco" ? Number(value) : value,
      })
    }
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (id !== undefined) {
        await atualizar(`/produtos/atualizar`, produto, setProduto, {
          headers: { Authorization: usuario.token },
        })
        ToastAlerta("Produto atualizado!", "sucesso")
      } else {
        await cadastrar(`/produtos/cadastrar`, produto, setProduto, {
          headers: { Authorization: usuario.token },
        })
        ToastAlerta("Produto cadastrado!", "sucesso")
      }
      navigate("/perfil")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      ToastAlerta("Erro ao salvar", "erro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 px-6 pt-28 pb-10">
      <div className="mx-auto max-w-6xl">
        {/* Header Compacto */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate("/perfil")}
            className="flex items-center gap-2 text-xs font-black tracking-widest text-zinc-400 uppercase transition-all hover:text-emerald-600"
          >
            <ArrowLeft size={18} /> Voltar ao Painel
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-black tracking-tighter text-zinc-800 uppercase italic">
              {id !== undefined ? "Edição de Item" : "Novo Cadastro"}
            </h1>
          </div>
        </div>

        <form
          onSubmit={gerarNovoProduto}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >
          {/* COLUNA ESQUERDA: Dados Principais (7 Colunas) */}
          <div className="space-y-6 rounded-[2.5rem] border border-zinc-100 bg-white p-8 shadow-xl shadow-zinc-200/50 md:p-10 lg:col-span-7">
            <div className="mb-4 flex items-center gap-3 text-emerald-600">
              <PlusCircle size={24} />
              <h3 className="text-sm font-black tracking-widest uppercase">
                Informações de Venda
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="ml-1 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Ex: Smoothie Energético"
                  value={produto.nome}
                  onChange={atualizarEstado}
                  className="rounded-2xl border-none bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="ml-1 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                  Descrição
                </label>
                <input
                  type="text"
                  name="descricao"
                  placeholder="Breve descrição dos ingredientes..."
                  value={produto.descricao}
                  onChange={atualizarEstado}
                  className="rounded-2xl border-none bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                  Preço Sugerido
                </label>
                <input
                  type="number"
                  name="preco"
                  step="0.01"
                  value={produto.preco}
                  onChange={atualizarEstado}
                  className="rounded-2xl border-none bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                  URL da Foto
                </label>
                <input
                  type="text"
                  name="foto_produto"
                  placeholder="Link da imagem..."
                  value={produto.foto_produto}
                  onChange={atualizarEstado}
                  className="rounded-2xl border-none bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Nutrição e Categoria (5 Colunas) */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900 p-8 text-white shadow-xl md:p-10">
              <div className="mb-6 flex items-center gap-3 text-emerald-400">
                <Zap size={20} />
                <h3 className="text-sm font-black tracking-widest uppercase">
                  Ficha Nutricional
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Calorias", name: "calorias", color: "orange" },
                  { label: "Proteínas (g)", name: "proteinas", color: "blue" },
                  {
                    label: "Carbos (g)",
                    name: "carboidratos",
                    color: "emerald",
                  },
                  { label: "Gorduras (g)", name: "gorduras", color: "purple" },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-zinc-500 uppercase">
                      {f.label}
                    </label>
                    <input
                      type="text"
                      name={f.name}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      value={(produto as any)[f.name]}
                      onChange={atualizarEstado}
                      className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-sm font-black outline-none focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-zinc-100 bg-white p-8 shadow-lg shadow-zinc-200/50">
              <div className="mb-4 flex items-center gap-3 text-emerald-600">
                <LayoutGrid size={20} />
                <h3 className="text-sm font-black tracking-widest uppercase">
                  Classificação
                </h3>
              </div>
              <select
                name="categoria"
                value={produto.categoria?.id || ""}
                onChange={atualizarEstado}
                className="w-full cursor-pointer appearance-none rounded-2xl border-none bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="" disabled>
                  Selecione a Categoria
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>

              <div className="mt-8 flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 active:scale-95"
                >
                  {isLoading ? (
                    <ClipLoader color="#fff" size={20} />
                  ) : (
                    <>
                      <Save size={20} /> Salvar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
