export function Footer() {
  const data = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-gray-950 py-12 text-gray-400 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-black text-white">
            Nutri<span className="text-green-500">Go</span>
          </span>
          <p className="mt-2 max-w-xs text-xs">
            A tecnologia que impulsiona o mercado de alimentação saudável
            corporativo e residencial no Brasil.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold text-white uppercase">
            Para Empresas
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white">
                Planos do SaaS
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cadastrar meu Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                API & Integrações
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold text-white uppercase">
            Para Usuários
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white">
                Criar Conta de Cliente
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Buscar por Dietas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Baixar App Mobile
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold text-white uppercase">
            Corporativo
          </h4>
          <p className="text-xs">parcerias@nutrigo.com.br</p>
          <p className="mt-1 text-xs">CNPJ: 00.000.000/0001-00</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-gray-900 px-4 pt-6 text-center text-xs text-gray-600">
        <p>© 2026 NutriGo SaaS Platform S.A. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
