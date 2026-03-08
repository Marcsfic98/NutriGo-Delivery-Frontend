import { Plus } from "lucide-react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function CadastrarProdutos() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)
  return (
    <div>
      {/* Botão Cadastrar Produto */}
      {usuario.tipo === "ESTABELECIMENTO" && (
        <button
          onClick={() => navigate("/cadastrarproduto")}
          className="flex w-full items-center justify-center gap-2 rounded bg-green-600 px-6 py-2.5 font-bold text-white shadow-md transition hover:bg-green-700 sm:w-auto"
        >
          <Plus size={20} /> Cadastrar Produto
        </button>
      )}
    </div>
  )
}

export default CadastrarProdutos
