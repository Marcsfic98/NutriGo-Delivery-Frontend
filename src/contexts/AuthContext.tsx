/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode } from "react"
import type Estabelecimento from "../models/Estabelecimento"
import type Usuario from "../models/Usuario"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../util/ToastAlerta"

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
    tipo: "",
    pedido: [],
    estabelecimento: [],
    token: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true)
    try {
      // Criamos uma variável temporária para tratar o dado antes de salvar no state
      await login(`/auth/logar`, usuarioLogin, (resposta: any) => {
        // Se o backend vier como Array, pegamos a primeira posição [0]
        // Se vier como Objeto, pegamos direto a resposta
        const dadosTratados = Array.isArray(resposta) ? resposta[0] : resposta
        setUsuario(dadosTratados)
      })
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
      tipo: "",
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
