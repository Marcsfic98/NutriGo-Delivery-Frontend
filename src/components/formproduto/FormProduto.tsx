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
      navigate("/produtos")
    }
  }, [usuario.token, navigate, usuario.tipo])

  useEffect(() => {
    async function buscarCategorias() {
      try {
        await buscar("/categoria", setCategorias)
      } catch (error) {
        if (String(error).includes("401")) handleLogout()
      }
    }

    async function buscarEstabelecimentos() {
      try {
        await buscar("/estabelecimentos", setEstabelecimentos, {
          headers: { Authorization: usuario.token },
        })
      } catch (error) {
        console.error(error)
      }
    }

    async function buscarProdutoPorId(id: string) {
      try {
        await buscar(`/produtos/${id}`, setProduto)
      } catch (error) {
        ToastAlerta("Produto não encontrado!", "erro")
        navigate("/produtos")
      }
    }

    buscarCategorias()
    buscarEstabelecimentos()

    if (id !== undefined) {
      buscarProdutoPorId(id)
    }
  }, [id, handleLogout, usuario.token, navigate])

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target

    if (name === "categoria") {
      setProduto({
        ...produto,
        categoria: { id: Number(value), nome: "", produto: [] },
      })
    } else if (name === "estabelecimento") {
      const est = estabelecimentos.find((e) => e.id === Number(value))
      setProduto({
        ...produto,
        estabelecimento: est || undefined,
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

      navigate("/produtos")
    } catch (error) {
      ToastAlerta("Erro ao salvar o produto", "erro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 px-6 pt-28 pb-10">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate("/produtos")}
            className="flex items-center gap-2 text-xs font-black tracking-widest text-zinc-400 uppercase hover:text-emerald-600"
          >
            <ArrowLeft size={18} /> Voltar
          </button>

          <h1 className="text-3xl font-black tracking-tighter text-zinc-800 uppercase italic">
            {id !== undefined ? "Editar Produto" : "Novo Produto"}
          </h1>
        </div>

        <form
          onSubmit={gerarNovoProduto}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          {/* COLUNA ESQUERDA */}
          <div className="space-y-6 rounded-[2.5rem] border border-zinc-100 bg-white p-10 shadow-xl lg:col-span-7">
            <div className="flex items-center gap-3 text-emerald-600">
              <PlusCircle size={24} />
              <h3 className="text-sm font-black tracking-widest uppercase">
                Informações
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-black text-zinc-400 uppercase">
                  Nome
                </label>
                <input
                  name="nome"
                  value={produto.nome}
                  onChange={atualizarEstado}
                  className="rounded-2xl bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-black text-zinc-400 uppercase">
                  Descrição
                </label>
                <input
                  name="descricao"
                  value={produto.descricao}
                  onChange={atualizarEstado}
                  className="rounded-2xl bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-zinc-400 uppercase">
                  Preço
                </label>
                <input
                  type="number"
                  name="preco"
                  value={produto.preco}
                  onChange={atualizarEstado}
                  className="rounded-2xl bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-zinc-400 uppercase">
                  Foto
                </label>
                <input
                  name="foto_produto"
                  value={produto.foto_produto}
                  onChange={atualizarEstado}
                  className="rounded-2xl bg-zinc-50 p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="space-y-6 lg:col-span-5">
            {/* NUTRIÇÃO */}
            <div className="rounded-[2.5rem] border border-zinc-800 bg-zinc-900 p-8 text-white shadow-xl">
              <div className="mb-6 flex items-center gap-3 text-emerald-400">
                <Zap size={20} />
                <h3 className="text-sm font-black uppercase">Nutrição</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["calorias", "proteinas", "carboidratos", "gorduras"].map(
                  (campo) => (
                    <input
                      key={campo}
                      name={campo}
                      value={(produto as any)[campo]}
                      onChange={atualizarEstado}
                      placeholder={campo}
                      className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-sm font-black"
                    />
                  ),
                )}
              </div>
            </div>

            {/* CATEGORIA */}
            <div className="rounded-[2.5rem] border border-zinc-100 bg-white p-8 shadow-lg">
              <div className="mb-4 flex items-center gap-3 text-emerald-600">
                <LayoutGrid size={20} />
                <h3 className="text-sm font-black uppercase">Categoria</h3>
              </div>

              <select
                name="categoria"
                value={produto.categoria?.id || ""}
                onChange={atualizarEstado}
                className="w-full rounded-2xl bg-zinc-50 p-4 font-bold"
                required
              >
                <option value="" disabled>
                  Selecione
                </option>

                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>

              {/* ESTABELECIMENTO */}

              <select
                name="estabelecimento"
                value={produto.estabelecimento?.id || ""}
                onChange={atualizarEstado}
                className="mt-4 w-full rounded-2xl bg-zinc-50 p-4 font-bold"
                required
              >
                <option value="">Estabelecimento</option>

                {estabelecimentos
                  .filter((est) => est.usuario?.id === usuario.id)
                  .map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nome}
                    </option>
                  ))}
              </select>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 font-black text-white hover:bg-emerald-700"
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
        </form>
      </div>
    </div>
  )
}
