import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext"
import { ToastAlerta } from "../util/ToastAlerta"

// Função auxiliar para decodificar o payload de um JWT sem bibliotecas externas
function decodificarToken(token: string): any {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error)
    return null
  }
}

export function GoogleSuccess() {
  const navigate = useNavigate()
  const { setUsuario } = useContext(AuthContext)
  const processado = useRef(false)

  useEffect(() => {
    if (processado.current) return

    const urlParams = new URLSearchParams(window.location.search)

    const token = urlParams.get("token")
    const usuarioParam = urlParams.get("usuario")
    const nome = urlParams.get("nome")
    const foto = urlParams.get("foto")

    if (token && usuarioParam) {
      processado.current = true

      // 1. Extrai o ID real diretamente de dentro do Token JWT (Garantia Absoluta!)
      const tokenLimpo = token.replace("Bearer ", "")
      const payloadDecodificado = decodificarToken(tokenLimpo)

      // Tenta pegar o id do token. Se não achar, tenta da URL. Se tudo falhar, usa 0.
      const idDoToken = payloadDecodificado?.id
      const idDaUrl = urlParams.get("id")
      const idFinal = idDoToken
        ? Number(idDoToken)
        : idDaUrl
          ? parseInt(idDaUrl, 10)
          : 0

      console.log("=== [GOOGLE OAUTH] DECODIFICAÇÃO DE SEGURANÇA ===")
      console.log("ID extraído do JWT:", idDoToken)
      console.log("ID extraído da URL:", idDaUrl)
      console.log("ID final que será gravado:", idFinal)

      const dadosUsuario = {
        id: isNaN(idFinal) ? 0 : idFinal,
        nome: decodeURIComponent(nome || ""),
        usuario: decodeURIComponent(usuarioParam),
        senha: "",
        foto: decodeURIComponent(foto || ""),
        tipo: payloadDecodificado?.role || "USUARIO", // Também pega o perfil (role) do token se disponível
        pedido: [],
        estabelecimento: null,
        token: token,
      }

      console.log(
        "=== [GOOGLE OAUTH] GRAVANDO NO LOCALSTORAGE ===",
        dadosUsuario,
      )

      setUsuario(dadosUsuario)

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("usuarioLogin", JSON.stringify(dadosUsuario))
      }

      ToastAlerta("Autenticado via Google com sucesso!", "sucesso")
      navigate("/home", { replace: true })
    } else {
      if (!processado.current && !token) {
        console.warn("Aviso: Parâmetros ausentes no ciclo de renderização.")
      }
    }
  }, [navigate, setUsuario])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-100">
      <ClipLoader color="#15803d" size={40} />
      <p className="animate-pulse font-medium text-gray-600">
        Sincronizando sua conta Google...
      </p>
    </div>
  )
}
