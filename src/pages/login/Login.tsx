import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type UsuarioLogin from "../../models/UsuarioLogin"

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
    <>
      <div className="grid h-screen grid-cols-1 place-items-center font-bold lg:grid-cols-2">
        <form
          className="flex w-1/2 flex-col items-center justify-center gap-4"
          onSubmit={login}
        >
          <h2 className="text-5xl text-lime-800">Entrar</h2>
          <div className="flex w-full flex-col">
            <label htmlFor="usuario" className="font-bold text-lime-800">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="rounded border-2 border-lime-600 p-2 focus:border-lime-800 focus:ring-1 focus:ring-lime-800 focus:outline-none"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="senha" className="font-bold text-lime-800">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="rounded border-2 border-lime-600 p-2 focus:border-lime-800 focus:ring-1 focus:ring-lime-800 focus:outline-none"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button
            type="submit"
            className="flex w-1/2 justify-center rounded bg-lime-600 py-2 text-white hover:bg-lime-800"
          >
            {isLoading ? (
              <ClipLoader color="#3f6212" size={24} />
            ) : (
              <span>Entrar</span>
            )}
          </button>

          <hr className="w-full border-slate-800" />

          <p>
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className="text-lime-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
        {/* <div className="hidden min-h-screen w-full bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center bg-no-repeat lg:block"></div> */}
      </div>
    </>
  )
}
