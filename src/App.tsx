import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer } from "./components/footer/Footer"
import { Navbar } from "./components/navbar/Navbar"
import { AuthProvider } from "./contexts/AuthContext"
import { Cadastro } from "./pages/Cadastro"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { ScrollToTop } from "./components/ScrollToTop"

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
