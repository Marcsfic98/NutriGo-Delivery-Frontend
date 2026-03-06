import { useContext, useState } from "react" // Adicionado useState
import { FaBars, FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa" // Adicionado ícones de menu
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../util/ToastAlerta"

export const Navbar = () => {
  const { usuario, handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()

  // Estado para o menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function logout() {
    handleLogout()
    ToastAlerta("Usuário deslogado com sucesso", "info")
    navigate("/")
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white font-sans shadow-sm">
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* LOGO (Mantida Original) */}
        <div className="absolute top-0 left-0 flex h-30 w-64 items-center justify-center rounded-b-[200px] bg-white">
          <Link to="/home">
            <img
              src="/img/logo/logo.png"
              alt="Fit Delivery Logo"
              className="w-38 object-contain"
            />
          </Link>
        </div>

        <div className="w-24"></div>

        {/* BOTÃO HAMBÚRGUER (Apenas visível no Mobile) */}
        <button
          className="z-50 text-green-800 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>

        {/* LINKS DESKTOP (Sua estilização original preservada com md:flex) */}
        <div className="hidden items-center gap-6 md:flex">
          <Link className="text-green-800 hover:text-yellow-600" to="/home">
            Home
          </Link>
          <Link className="text-green-800 hover:text-yellow-600" to="/Sobre">
            Sobre
          </Link>
          <Link className="text-green-800 hover:text-yellow-600" to="/produtos">
            Produtos
          </Link>
          <Link
            className="text-green-800 hover:text-yellow-600"
            to="/estabelecimentos"
          >
            Estabelecimentos
          </Link>
          <Link className="text-green-800 hover:text-yellow-600" to="/pedidos">
            Pedidos
          </Link>

          {usuario.token ? (
            <div className="flex items-center gap-4 border-l border-green-200 pl-4">
              <Link to="/perfil" className="group flex items-center gap-2">
                <img
                  src={
                    usuario.foto ||
                    "https://ik.imagekit.io/yvn7qbnm7/undraw_pic_profile_re_7g2h.svg?updatedAt=1738096387060"
                  }
                  alt="Perfil"
                  className="h-10 w-10 rounded-full border-2 border-green-800 object-cover group-hover:border-yellow-600"
                />
                <span className="text-sm font-semibold text-green-800 group-hover:text-yellow-600">
                  Olá, {usuario.nome?.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="text-red-500 transition hover:text-red-700"
                title="Sair"
              >
                <FaSignOutAlt size={20} />
              </button>
            </div>
          ) : (
            <Link
              className="flex items-center gap-2 rounded-full border-2 border-green-800 px-4 py-2 text-green-800 transition hover:border-yellow-600 hover:text-yellow-600"
              to="/login"
            >
              <FaUser />
              <span className="text-sm font-bold">Login</span>
            </Link>
          )}
        </div>

        {/* MENU MOBILE (Exibido apenas quando isMenuOpen é true e em telas pequenas) */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 flex w-full flex-col gap-4 border-t border-gray-100 bg-white p-6 shadow-lg md:hidden">
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="text-green-800"
              to="/home"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="text-green-800"
              to="/Sobre"
            >
              Sobre
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="text-green-800"
              to="/produtos"
            >
              Produtos
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="text-green-800"
              to="/estabelecimentos"
            >
              Estabelecimentos
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="text-green-800"
              to="/pedidos"
            >
              Pedidos
            </Link>
            <hr className="border-green-100" />
            {usuario.token ? (
              <div className="flex items-center justify-between">
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to="/perfil"
                  className="flex items-center gap-2"
                >
                  <img
                    src={usuario.foto || "..."}
                    className="h-8 w-8 rounded-full"
                    alt="Perfil"
                  />
                  <span className="font-semibold text-green-800">
                    Meu Perfil
                  </span>
                </Link>
                <button onClick={logout} className="text-red-500">
                  <FaSignOutAlt size={20} />
                </button>
              </div>
            ) : (
              <Link
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 font-bold text-green-800"
                to="/login"
              >
                <FaUser /> Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
