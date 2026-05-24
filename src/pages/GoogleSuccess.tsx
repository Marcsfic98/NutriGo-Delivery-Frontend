import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext"

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
      const dadosUsuario = {
        id: 0,
        nome: decodeURIComponent(nome || ""),
        usuario: decodeURIComponent(usuarioParam),
        senha: "",
        foto: decodeURIComponent(foto || ""),
        token: token,
      }

      // Atualiza o estado global do contexto
      setUsuario(dadosUsuario)

      // Se o seu AuthContext salvar no localStorage para não perder o F5, faça aqui:
      localStorage.setItem("usuarioLogin", JSON.stringify(dadosUsuario))

      navigate("/home")
    } else {
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
