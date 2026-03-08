import { Lock, Mail } from "lucide-react"
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../contexts/AuthContext"
import type UsuarioLogin from "../models/UsuarioLogin"

export function Login() {
  const navigate = useNavigate()
  const { usuario, handleLogin, isLoading } = useContext(AuthContext)
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin,
  )

  useEffect(() => {
    if (usuario?.token !== "") {
      navigate("/home")
    }
  }, [usuario, navigate])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    })
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-6 md:p-10">
      <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:flex-row">
        <div className="hidden w-1/2 bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center lg:block"></div>

        <div className="w-full p-8 md:w-1/2 md:p-16">
          <div className="mb-10 text-center md:text-left">
            <h2 className="mb-2 text-4xl font-black text-green-700">NutriGo</h2>
            <p className="text-gray-500">
              Bem-vindo de volta! Acesse sua conta.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={login}>
            <div className="relative">
              <label
                htmlFor="usuario"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Seu e-mail cadastrado"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="senha"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Senha
              </label>
              <div className="relative">
                <Lock
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Sua senha secreta"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-2xl bg-green-600 py-4 font-bold text-white shadow-lg shadow-green-200 transition-all hover:bg-green-700 active:scale-95"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>Entrar na Plataforma</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Ainda não faz parte do NutriGo?{" "}
            <Link
              to="/cadastro"
              className="font-bold text-green-600 transition-colors hover:text-green-800"
            >
              Crie sua conta aqui
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
