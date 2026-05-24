import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext"
import { ToastAlerta } from "../util/ToastAlerta"

export function GoogleSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setUsuario } = useContext(AuthContext)

  useEffect(() => {
    const token = searchParams.get("token")
    const usuarioParam = searchParams.get("usuario")
    const nome = searchParams.get("nome")
    const foto = searchParams.get("foto")

    if (token && usuarioParam) {
      // Objeto completo com TODOS os campos exigidos pela interface UsuarioComToken
      const dadosUsuario = {
        id: 0,
        nome: decodeURIComponent(nome || ""),
        usuario: decodeURIComponent(usuarioParam),
        senha: "",
        foto: decodeURIComponent(foto || ""),
        tipo: "USUARIO", // Incluído para bater com o Enum do backend
        pedido: [], // Array vazio exigido pelo modelo
        estabelecimento: null, // Campo do relacionamento com estabelecimento
        token: token,
      }

      setUsuario(dadosUsuario)

      if (localStorage) {
        localStorage.setItem("usuarioLogin", JSON.stringify(dadosUsuario))
      }

      ToastAlerta("Autenticado via Google com sucesso!", "sucesso")
      navigate("/home")
    } else {
      ToastAlerta("Falha na sincronização com o Google.", "erro")
      navigate("/login")
    }
  }, [searchParams, navigate, setUsuario])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-100">
      <ClipLoader color="#15803d" size={40} />
      <p className="animate-pulse font-medium text-gray-600">
        Sincronizando sua conta Google...
      </p>
    </div>
  )
}
