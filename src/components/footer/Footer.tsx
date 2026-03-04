import { Link, useLocation } from "react-router-dom"
import {
  FacebookLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react"

export function Footer() {
  const data = new Date().getFullYear()
  const location = useLocation()

  if (location.pathname === "/login" || location.pathname === "/cadastro") {
    return null
  }

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* <div className="text-teal-600">
            <img src="" alt="Logo da NutriGo Delivery" className="w-35 items-center" />
          </div> */}

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <Link
                to="#"
                rel="noreferrer"
                target="_blank"
                className="text-green-800 transition hover:text-green-600 hover:opacity-75"
              >
                <span className="sr-only">Facebook</span>
                <FacebookLogoIcon size={24} weight="fill" />
              </Link>
            </li>
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-green-800 transition hover:text-green-600 hover:opacity-75"
              >
                <span className="sr-only">Instagram</span>
                <InstagramLogoIcon size={24} weight="fill" />
              </a>
            </li>
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-green-800 transition hover:text-green-600 hover:opacity-75"
              >
                <span className="sr-only">Twitter</span>
                <TwitterLogoIcon size={24} weight="fill" />
              </a>
            </li>
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-green-800 transition hover:text-green-600 hover:opacity-75"
              >
                <span className="sr-only">GitHub</span>
                <GithubLogoIcon size={24} weight="fill" />
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <p className="font-medium text-green-800">Acesso Rápido</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Estabelecimentos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Meus Pedidos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Meu Perfil
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-green-800">Descubra</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="/sobre"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Comida Saudável
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Lanches & Fast Food
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Sobremesas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Restaurantes em Destaque
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-green-800">Institucional</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="/contato"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Fale Conosco
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Cadastre seu Restaurante
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Seja um Entregador
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-green-800">Legal</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Política de Reembolso / Cancelamento
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-600 transition hover:opacity-75"
                >
                  Dúvidas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-green-600">
          © {data}. NutriGo Delivery. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
