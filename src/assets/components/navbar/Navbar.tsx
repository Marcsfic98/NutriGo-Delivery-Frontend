import { useState } from "react"

const Navbar = () => {
  // Estado para controlar qual link está ativo
  const [activeTab, setActiveTab] = useState("Homepage")

  const navLinks = [
    "Homepage",
    "Foods",
    "Today Offers",
    "Contact us",
    "About us",
  ]

  return (
    <header className="flex w-full flex-col items-center border-b bg-[url('/img/banner/bgmenu.avif')] bg-cover bg-center bg-no-repeat py-6 text-green-800">
      <div className="mb-6">
        <img className="w-30" src="/img/logo/logo.png" />
      </div>

      {/* Navigation Links */}
      <nav className="w-full max-w-4xl">
        <ul className="flex items-center justify-between px-8 md:px-16">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                onClick={() => setActiveTab(link)}
                className={`cursor-pointer text-sm font-medium transition-colors duration-300 hover:text-yellow-500 md:text-base ${activeTab === link ? "text-yellow-600" : "text-green-800"}`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
