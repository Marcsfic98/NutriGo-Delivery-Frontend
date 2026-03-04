/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { ToastAlerta } from "../util/ToastAlerta"
import { login } from "../services/Service"

interface AuthContextProps {
  usuario: UsuarioLogin
  handleLogout(): void
  handleLogin(usuario: UsuarioLogin): Promise<void>
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    usuario: "",
    senha: "",
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
      usuario: "",
      senha: "",
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
