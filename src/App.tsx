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

import DeletarPedido from "./pages/pedido/DeletarPedido"
import FormPedido from "./pages/pedido/FormPedido"
import ListaPedidos from "./pages/pedido/ListaPedidos"

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
          <Route path="/pedidos" element={<ListaPedidos />} />
          <Route path="/cadastrarPedido" element={<FormPedido />} />
          <Route path="/editarPedido/:id" element={<FormPedido />} />
          <Route path="/deletarPedido/:id" element={<DeletarPedido />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
