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
    console.log(usuario)
  }, [])

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
        if (String(error).includes("401")) {
          handleLogout()
        }
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
        console.error(error)
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
        estabelecimento: est || undefined, // passa o objeto completo
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
    console.log(produto)
    try {
      if (id !== undefined) {
        await atualizar(`/produtos/atualizar`, produto, setProduto, {
          headers: { Authorization: usuario.token },
        })
        ToastAlerta("Produto atualizado com sucesso", "sucesso")
      } else {
        await cadastrar(`/produtos/cadastrar`, produto, setProduto, {
          headers: { Authorization: usuario.token },
        })
        ToastAlerta("Produto cadastrado com sucesso", "sucesso")
      }
      navigate("/produtos")
    } catch (error: unknown) {
      console.error(error)
      ToastAlerta("Erro ao salvar o produto", "erro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-20 flex min-h-screen items-center justify-center bg-gray-50 px-4 pb-20">
      <form
        onSubmit={gerarNovoProduto}
        className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">
          {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
        </h1>

        <div className="flex flex-col">
          <label className="font-bold text-gray-700">Nome do Produto</label>
          <input
            type="text"
            name="nome"
            value={produto.nome}
            onChange={atualizarEstado}
            className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-bold text-gray-700">Descrição</label>
          <input
            type="text"
            name="descricao"
            value={produto.descricao}
            onChange={atualizarEstado}
            className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Preço (R$)</label>
            <input
              type="number"
              name="preco"
              step="0.01"
              min="0"
              value={produto.preco}
              onChange={atualizarEstado}
              className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Foto (URL)</label>
            <input
              type="text"
              name="foto_produto"
              value={produto.foto_produto}
              onChange={atualizarEstado}
              className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Calorias (kcal)</label>
            <input
              type="text"
              name="calorias"
              value={produto.calorias}
              onChange={atualizarEstado}
              className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Proteínas (g)</label>
            <input
              type="text"
              name="proteinas"
              value={produto.proteinas}
              onChange={atualizarEstado}
              className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Carboidratos (g)</label>
            <input
              type="text"
              name="carboidratos"
              value={produto.carboidratos}
              onChange={atualizarEstado}
              className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Gorduras (g)</label>
            <input
              type="text"
              name="gorduras"
              value={produto.gorduras}
              onChange={atualizarEstado}
              className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
              required
            />
          </div>

          {/* Categoria */}
          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Categoria</label>
            <select
              name="categoria"
              value={produto.categoria?.id || ""}
              onChange={atualizarEstado}
              className="rounded-lg border bg-white p-3 focus:border-green-600 focus:outline-none"
              required
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          {/* estabelecimento */}
          <div className="flex flex-col">
            <label className="font-bold text-gray-700">Estabelecimento</label>
            <select
              name="estabelecimento"
              value={produto.estabelecimento?.id || ""}
              onChange={atualizarEstado}
              className="rounded-lg border bg-white p-3 focus:border-green-600 focus:outline-none"
              required
            >
              <option value="" disabled>
                Selecione um Estabelecimento
              </option>
              {estabelecimentos
                .filter(
                  (estabelecimento) =>
                    estabelecimento.usuario?.id === usuario.id,
                ) // só mostra os do usuário
                .map((estabelecimento) => (
                  <option key={estabelecimento.id} value={estabelecimento.id}>
                    {estabelecimento.nome}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button
            type="button"
            // Por enquanto vai ficar voltando para o perfil depois vai voltar para estabelecimento do usuario
            onClick={() => navigate("/perfil")}
            className="rounded-lg bg-red-400 px-6 py-3 font-bold text-white hover:bg-red-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  )
}
