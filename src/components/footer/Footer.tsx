import {
  FacebookLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export function Footer() {
  const data = new Date().getFullYear()

  return (
    <footer className="z-50 mt-10 border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-green-800 uppercase">
              Acesso Rápido
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Estabelecimentos
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Meu Perfil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-green-800 uppercase">
              Descubra
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Comida Saudável
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Lanches & Fast Food
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Sobremesas
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Destaques
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-green-800 uppercase">
              Institucional
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/contato"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Cadastre sua Loja
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Seja Entregador
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-green-800 uppercase">
              Legal
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  Reembolso
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-green-600 transition hover:text-emerald-400"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior: Logo e Redes Sociais */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-zinc-100 pt-8 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <img src="/img/logo/logo.png" alt="NutriGo Logo" className="w-28" />
            <p className="text-xs font-medium text-green-600 italic">
              Sua saúde na sua porta.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-green-800 transition-colors hover:text-emerald-500"
            >
              <FacebookLogoIcon size={24} weight="fill" />
            </a>
            <a
              href="#"
              className="text-green-800 transition-colors hover:text-emerald-500"
            >
              <InstagramLogoIcon size={24} weight="fill" />
            </a>
            <a
              href="#"
              className="text-green-800 transition-colors hover:text-emerald-500"
            >
              <TwitterLogoIcon size={24} weight="fill" />
            </a>
            <a
              href="#"
              className="text-green-800 transition-colors hover:text-emerald-500"
            >
              <GithubLogoIcon size={24} weight="fill" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
            © {data} NutriGo Delivery. Desenvolvido por{" "}
            <span className="text-emerald-600 italic">
              Grupo 2 - Generation
            </span>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
