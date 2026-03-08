import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { CartContext } from "../contexts/CartContext"
import { ToastAlerta } from "../util/ToastAlerta"

function Carrinho() {
  const { itens, valorTotal, finalizarPedido, removerProduto } =
    useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Formatador de moeda (Brasil)
  const formatarMoeda = (valor: number | string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(valor || 0))
  }

  // Pega a taxa de entrega do primeiro item (se houver)
  const taxaEntrega = Number(
    itens[0]?.produto.estabelecimento?.taxa_entrega || 0,
  )

  const handleCheckout = async () => {
    if (itens.length === 0) return

    setLoading(true)
    try {
      // Pegamos o ID do estabelecimento do primeiro produto no carrinho
      const estId = itens[0].produto.estabelecimento?.id

      if (!estId) {
        throw new Error("ID do estabelecimento não encontrado")
      }

      await finalizarPedido(estId, taxaEntrega)
      ToastAlerta("Pedido realizado com sucesso!", "sucesso")
      navigate("/pedidos") // Redireciona para a lista de pedidos
    } catch (e) {
      ToastAlerta("Erro ao finalizar o pedido. Verifique sua conexão.", "erro")
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Tela de Carrinho Vazio
  if (itens.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 pt-20">
        <div className="rounded-full bg-zinc-100 p-8">
          <ShoppingBag size={64} className="text-zinc-300" />
        </div>
        <h2 className="mt-6 text-2xl font-black text-zinc-800">
          Seu carrinho está vazio
        </h2>
        <p className="mt-2 text-zinc-500">
          Adicione itens para começar seu pedido!
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft size={20} /> Voltar para a loja
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 px-4 pt-32 pb-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-800">
              Meu Carrinho
            </h1>
            <p className="font-medium text-zinc-500">
              Você tem {itens.length} {itens.length === 1 ? "item" : "itens"}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Lista de Produtos */}
          <div className="space-y-4 lg:col-span-2">
            {itens.map((item) => (
              <div
                key={item.produto.id}
                className="group relative flex items-center gap-6 rounded-[2rem] border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <img
                  src={item.produto.foto_produto}
                  alt={item.produto.nome}
                  className="h-24 w-24 rounded-2xl object-cover shadow-sm"
                />

                <div className="flex flex-1 flex-col">
                  <h4 className="text-lg font-black text-zinc-800">
                    {item.produto.nome}
                  </h4>
                  <p className="text-sm font-bold text-zinc-400">
                    {item.quantidade}x • {formatarMoeda(item.preco_unitario)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="text-lg font-black text-zinc-800">
                    {formatarMoeda(
                      Number(item.preco_unitario) * item.quantidade,
                    )}
                  </span>
                  <button
                    onClick={() => removerProduto(item.produto.id)}
                    className="rounded-full bg-rose-50 p-2.5 text-rose-500 transition-colors hover:bg-rose-100 hover:text-rose-600"
                    title="Remover item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo Financeiro */}
          <aside className="h-fit rounded-[2.5rem] border border-zinc-100 bg-white p-8 shadow-2xl shadow-zinc-200/50">
            <h2 className="mb-6 text-2xl font-black text-zinc-800">Resumo</h2>

            <div className="space-y-4">
              <div className="flex justify-between font-bold text-zinc-500">
                <span>Subtotal</span>
                <span>{formatarMoeda(valorTotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-zinc-500">
                <span>Taxa de Entrega</span>
                <span>{formatarMoeda(taxaEntrega)}</span>
              </div>

              <div className="my-6 h-px bg-zinc-100" />

              <div className="flex justify-between text-2xl font-black text-emerald-600">
                <span>Total</span>
                <span>{formatarMoeda(Number(valorTotal) + taxaEntrega)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-8 flex h-16 w-full items-center justify-center rounded-2xl bg-emerald-600 text-lg font-black text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 hover:shadow-emerald-200 active:scale-[0.98] disabled:bg-zinc-200 disabled:shadow-none"
            >
              {loading ? (
                <ClipLoader size={24} color="#ffffff" />
              ) : (
                "Finalizar Pedido"
              )}
            </button>

            <p className="mt-4 text-center text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Pagamento na entrega
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Carrinho
