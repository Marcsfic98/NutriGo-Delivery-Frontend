/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import type Usuario from "../models/Usuario"
import { ToastAlerta } from "../util/ToastAlerta"
import { login } from "../services/Service"

interface UsuarioComToken extends Usuario {
  token: string
}

interface AuthContextProps {
  usuario: UsuarioComToken
  handleLogout(): void
  handleLogin(usuarioLogin: UsuarioLogin): Promise<void>
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioComToken>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true)
    try {
      await login(`/usuarios/logar`, usuarioLogin, setUsuario)
      ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
    } catch (error) {
      ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
    }
    setIsLoading(false)
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    })
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
