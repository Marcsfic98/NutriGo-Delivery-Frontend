import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Footer } from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { ScrollToTop } from "./components/ScrollToTop"
import { AuthProvider } from "./contexts/AuthContext"
import { Cadastro } from "./pages/Cadastro"
import Estabelecimentos from "./pages/Estabelecimentos"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import Produtos from "./pages/Produtos"

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/estabelecimentos" element={<Estabelecimentos />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
