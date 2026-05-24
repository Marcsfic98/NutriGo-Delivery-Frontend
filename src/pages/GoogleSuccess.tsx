import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext"
import { ToastAlerta } from "../util/ToastAlerta"

export function GoogleSuccess() {
  const navigate = useNavigate()
  const { setUsuario } = useContext(AuthContext)

  // Cria uma referência para travar execuções duplicadas do useEffect
  const processado = useRef(false)

  useEffect(() => {
    // Se já processou o login com sucesso uma vez, não faz mais nada e sai fora
    if (processado.current) return

    const urlParams = new URLSearchParams(window.location.search)

    const token = urlParams.get("token")
    const idParam = urlParams.get("id")
    const usuarioParam = urlParams.get("usuario")
    const nome = urlParams.get("nome")
    const foto = urlParams.get("foto")

    if (token && usuarioParam) {
      // Ativa a trava imediatamente para ignorar a segunda renderização fantasma
      processado.current = true

      console.log("=== [GOOGLE OAUTH] PARÂMETROS DA URL (SUCESSO) ===")
      console.log("ID capturado:", idParam)

      const idConvertido = idParam ? parseInt(idParam, 10) : 0

      const dadosUsuario = {
        id: isNaN(idConvertido) ? 0 : idConvertido,
        nome: decodeURIComponent(nome || ""),
        usuario: decodeURIComponent(usuarioParam),
        senha: "",
        foto: decodeURIComponent(foto || ""),
        tipo: "USUARIO",
        pedido: [],
        estabelecimento: null,
        token: token,
      }

      console.log("=== [GOOGLE OAUTH] SALVANDO USUÁRIO REAL ===", dadosUsuario)

      setUsuario(dadosUsuario)

      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("usuarioLogin", JSON.stringify(dadosUsuario))
      }

      ToastAlerta("Autenticado via Google com sucesso!", "sucesso")

      // Força o redirecionamento imediato para a Home
      navigate("/home", { replace: true })
    } else {
      // Só dispara o erro se a primeira tentativa REAL falhar e não houver token nenhum
      if (!processado.current && !token) {
        console.warn("Aviso: Parâmetros ausentes na leitura atual do ciclo.")
        // Removemos o redirecionamento forçado do else para não chutar o usuário logado de volta pro login
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
