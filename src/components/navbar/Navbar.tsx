import { FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white font-sans shadow-sm">
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Área curva da logo */}
        <div className="absolute top-0 left-0 flex h-30 w-64 items-center justify-center rounded-b-[200px] bg-white">
          <img
            src="/img/logo/logo.png"
            alt="Fit Delivery Logo"
            className="w-38 object-contain"
          />
        </div>

        {/* Espaço para compensar a curva */}
        <div className="w-24"></div>

        {/* Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <Link className="text-green-800 hover:text-yellow-600" to="/">
            Home
          </Link>
          <Link className="text-green-800 hover:text-yellow-600" to="/sobre">
            Sobre
          </Link>
          <Link
            className="text-green-800 hover:text-yellow-600"
            to={"/pedidos"}
          >
            Pedidos
          </Link>
          <Link
            className="text-green-800 hover:text-yellow-600"
            to={"/estabelecimentos"}
          >
            Estabelecimentos
          </Link>
          <Link
            className="rounded-full border-2 border-green-800 p-2 text-green-800 hover:border-yellow-600 hover:text-yellow-600"
            to={"/login"}
          >
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
