import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./components/footer/Footer"
import { FormProduto } from "./components/formproduto/FormProduto"
import { Navbar } from "./components/navbar/Navbar"
import { ScrollToTop } from "./components/ScrollToTop"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartProvider"
import { Cadastro } from "./pages/Cadastro"
import Carrinho from "./pages/Cart"
import { Contato } from "./pages/Contato"
import { Estabelecimentos } from "./pages/Estabelecimentos"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import DeletarPedido from "./pages/pedido/DeletarPedido"
import FormPedido from "./pages/pedido/FormPedido"
import ListaPedidos from "./pages/pedido/ListaPedidos"
import { Perfil } from "./pages/Perfil"
import { Produtos } from "./pages/Produtos"
import { Sobre } from "./pages/Sobre"

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <div className="min-h-[70vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<FormProduto />} />
              <Route path="/estabelecimentos" element={<Estabelecimentos />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/pedidos" element={<ListaPedidos />} />
              <Route path="/cadastrarPedido" element={<FormPedido />} />
              <Route path="/editarPedido/:id" element={<FormPedido />} />
              <Route path="/deletarPedido/:id" element={<DeletarPedido />} />
              <Route path="/cart" element={<Carrinho />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
