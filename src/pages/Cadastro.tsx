import { Image, Lock, Mail, Shield, User } from "lucide-react"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Usuario from "../models/Usuario"
import { cadastrarUsuario } from "../services/Service"
import { ToastAlerta } from "../util/ToastAlerta"

export function Cadastro() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    tipo: "USUARIO",
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      navigate("/login")
    }
  }, [usuario, navigate])

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
      } catch {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro")
      }
    } else {
      ToastAlerta("Dados inconsistentes! Verifique a senha.", "erro")
      setUsuario({ ...usuario, senha: "" })
      setConfirmarSenha("")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-6 md:p-10">
      <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl lg:flex-row">
        <div className="hidden bg-[url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center lg:block lg:w-5/12"></div>

        <div className="w-full p-8 md:p-12 lg:w-7/12">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="mb-2 text-3xl font-black text-green-700">
              Crie sua conta
            </h2>
            <p className="text-gray-500">
              Junte-se ao NutriGo e transforme sua alimentação.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <label
                  htmlFor="nome"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Nome Completo
                </label>
                <div className="relative">
                  <User
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Seu nome"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    value={usuario.nome}
                    onChange={atualizarEstado}
                    required
                  />
                </div>
              </div>

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
                    type="email"
                    id="usuario"
                    name="usuario"
                    placeholder="seu@email.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    value={usuario.usuario}
                    onChange={atualizarEstado}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="foto"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Link da Foto
                </label>
                <div className="relative">
                  <Image
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    id="foto"
                    name="foto"
                    placeholder="URL da sua foto"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    value={usuario.foto}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="tipo"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Tipo de Conta
                </label>
                <div className="relative">
                  <Shield
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    id="tipo"
                    name="tipo"
                    className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    value={usuario.tipo}
                    onChange={atualizarEstado}
                  >
                    <option value="USUARIO">Cliente</option>
                    <option value="ESTABELECIMENTO">
                      Estabelecimento Parceiro
                    </option>
                  </select>
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
                    placeholder="Mín. 8 caracteres"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    value={usuario.senha}
                    onChange={atualizarEstado}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="confirmarSenha"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Repita a senha"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-gray-700 transition-all outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                    value={confirmarSenha}
                    onChange={handleConfirmarSenha}
                    required
                    minLength={8}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 text-center font-bold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800 sm:w-1/3"
              >
                Voltar
              </Link>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-2xl bg-green-600 py-4 font-bold text-white shadow-lg shadow-green-200 transition-all hover:bg-green-700 active:scale-95 sm:w-2/3"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={24} />
                ) : (
                  <span>Finalizar Cadastro</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
