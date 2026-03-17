🍎 Nutrigo - Delivery App (Frontend)

O Nutrigo é o terceiro Projeto Integrador da formação JavaScript Fullstack da Generation Brasil.
A aplicação consiste em uma plataforma completa de delivery, onde usuários podem realizar pedidos e estabelecimentos podem gerenciar seus produtos e vendas.

Este repositório contém o Front-end da aplicação, desenvolvido para consumir a API e o banco de dados criados previamente no módulo de Backend.

🚀 Funcionalidades
👤 Para o Usuário (Cliente)

🔐 Autenticação

Cadastro de conta

Login seguro

🛍️ Catálogo

Visualização de estabelecimentos

Listagem de produtos disponíveis

🧾 Pedidos

Seleção de itens

Finalização de pedidos

🏢 Para o Estabelecimento (Admin)

📦 Gestão de Produtos

Criar, listar, atualizar e deletar itens do cardápio (CRUD)

📊 Gestão de Pedidos

Controle e monitoramento das ordens recebidas

🖥️ Painel Administrativo

Interface para gerenciamento de estoque e vendas

🛠️ Tecnologias Utilizadas
⚙️ Core

React 19

TypeScript

⚡ Build Tool

Vite

🎨 Estilização

Tailwind CSS v4 (com @tailwindcss/vite)

🧭 Roteamento

React Router DOM v7

🎯 UX/UI

Swiper (Carrosséis)

React Spinners (Loadings)

React Toastify (Notificações)

🎨 Ícones

Phosphor Icons

Lucide React

🌐 Comunicação com API

Axios

🧹 Qualidade de Código

ESLint

Prettier

📦 Como Executar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/SEU_USUARIO/nutrigo-delivery-frontend.git
2️⃣ Acesse a pasta do projeto
cd nutrigo-delivery-frontend
3️⃣ Instale as dependências
npm install
4️⃣ Execute o projeto
npm run dev
🌐 Acesse a Aplicação

👉 https://nutrigodelivery.vercel.app/

📁 Estrutura do Projeto (Sugestão)
src/
├── assets/        # Imagens e arquivos estáticos
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Configuração de API (Axios)
├── routes/        # Definição de rotas
├── hooks/         # Hooks customizados
├── contexts/      # Context API (estado global)
└── styles/        # Estilos globais
🔧 Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto:

VITE_API_URL=http://localhost:3000
🧪 Scripts Disponíveis
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera a build de produção
npm run preview   # Visualiza a build localmente
npm run lint      # Executa o ESLint
🤝 Contribuição

Contribuições são bem-vindas!

Faça um fork do projeto

Crie uma branch para sua feature

git checkout -b minha-feature

Commit suas alterações

git commit -m "feat: minha nova feature"

Push para a branch

git push origin minha-feature

Abra um Pull Request 🚀

📄 Licença

Este projeto está sob a licença MIT.
Sinta-se livre para usar e modificar.

👨‍💻 Autor

Desenvolvido por Marcos Alexandre 🚀
