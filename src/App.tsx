import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./assets/components/navbar/Navbar"
import Home from "./assets/pages/Home"

import { Footer } from "./components/footer/Footer"
import { Cadastro } from "./pages/login/cadastro/Cadastro"
import { Login } from "./pages/login/Login"
import { AuthProvider } from "./contexts/AuthContext"


export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
