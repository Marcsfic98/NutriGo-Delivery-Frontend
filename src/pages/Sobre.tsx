import React from "react"
import { EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

const team = [
  {
  name: "Alexandre Julio",
  role: "Fullstack Developer",
  bio: "Estudante de Engenharia da Computação e desenvolvedor Full Stack em formação, apaixonado por tecnologia e pela criação de soluções digitais eficientes. Possuo experiência no desenvolvimento de aplicações web utilizando JavaScript, TypeScript, React e Node.js, além de conhecimentos em bancos de dados, APIs REST e arquitetura de software. Tenho interesse em construir sistemas escaláveis, bem estruturados e focados na experiência do usuário, sempre buscando evoluir tecnicamente e contribuir com projetos que gerem impacto real.",
  github: "https://github.com/AlexandreJulioDev",
  linkedin: "https://www.linkedin.com/in/alexandre-julio-0b007a211/",
  email: "alexandre.julio8772@gmail.com",
  photo: "https://i.imgur.com/mmEyoyZ.jpg",
  avatar: "AX",
  color: "bg-lime-700",
},
{
    name: "Allyson Gonçalves",
    role: "Fullstack Developer",
    bio: "Desenvolvedor focado em soluções práticas e eficientes. Acredita que boa arquitetura de software é a base de tudo.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "allyson.goncalves@nutrigo.com.br",
    photo: "https://i.imgur.com/8M35N5M.jpg",
    avatar: "AL",
    color: "bg-yellow-600",
  },
  {
    name: "Juliermes Mendes",
    role: "Fullstack Developer",
    bio: "Curioso por natureza, sempre em busca de aprender algo novo. Acredita que comunicação clara é tão importante quanto código limpo.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "juliermes.mendes@nutrigo.com.br",
    photo: "https://i.imgur.com/aqakWgu.jpg",
    avatar: "JM",
    color: "bg-lime-700",
  },
  {
    name: "Marcos Ribeiro",
    role: "Fullstack Developer",
    bio: "Entusiasta de UI/UX e design de interfaces. Acredita que um bom visual faz toda a diferença na experiência do usuário.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "marcos.ribeiro@nutrigo.com.br",
    photo: "https://i.imgur.com/5LsB7S2.jpg",
    avatar: "MA",
    color: "bg-lime-600",
  },
  {
    name: "Matheus Carvalho",
    role: "Fullstack Developer",
    bio: "Especialista em backend e integrações. Apaixonado por performance e segurança em aplicações web modernas.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "matheus.carvalho@nutrigo.com.br",
    photo: "https://i.imgur.com/hIIvSiU.jpg",
    avatar: "MC",
    color: "bg-green-700",
  },
  {
    name: "Matheus Lins",
    role: "Fullstack Developer",
    bio: "Desenvolvedor criativo com foco em funcionalidades que fazem sentido para o usuário final. Ama transformar ideias em código.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "matheus.lins@nutrigo.com.br",
    photo: "https://i.imgur.com/ieGZ7Gw.jpg",
    avatar: "ML",
    color: "bg-green-800",
  },
]

const values = [
  {
    icon: "🥗",
    title: "Alimentação Saudável",
    desc: "Conectamos pessoas a estabelecimentos comprometidos com ingredientes frescos e nutritivos.",
  },
  {
    icon: "⚡",
    title: "Agilidade",
    desc: "Pedidos rápidos e rastreamento em tempo real para você não perder tempo.",
  },
  {
    icon: "🤝",
    title: "Parceria",
    desc: "Apoiamos restaurantes e nutricionistas locais a expandirem seu alcance.",
  },
  {
    icon: "💚",
    title: "Bem-estar",
    desc: "Acreditamos que comer bem é o primeiro passo para uma vida equilibrada.",
  },
]

export function Sobre(): React.ReactElement {
  return (
    <div className="mt-16 min-h-screen bg-white">

      <section className="relative overflow-hidden bg-green-800 px-6 py-24 text-white">
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-lime-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-lime-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-lime-300">
            Quem somos
          </span>
          <h1 className="text-5xl font-black uppercase tracking-tight md:text-6xl">
            Nutrição que{" "}
            <span className="text-yellow-400">chega até você</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-green-100">
            O <strong className="text-white">NutriGo</strong> nasceu da ideia de
            que alimentação saudável deve ser acessível, prática e saborosa.
            Somos uma plataforma de delivery especializada em comida nutritiva,
            conectando você aos melhores estabelecimentos fitness da sua região.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-lime-600">
                Nossa Missão
              </span>
              <h2 className="mt-2 text-4xl font-black text-green-800 uppercase">
                Saúde no prato, <br />
                praticidade na tela
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                Desenvolvemos o NutriGo como projeto acadêmico com um objetivo
                real: mostrar que tecnologia e nutrição andam juntas. Nossa
                plataforma facilita o pedido de refeições balanceadas, tornando
                a vida saudável mais simples para quem não tem tempo a perder.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Mais do que um sistema de delivery, o NutriGo é uma ponte entre
                quem quer se alimentar melhor e quem produz comida de qualidade.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
                  <span className="text-3xl">{v.icon}</span>
                  <h3 className="mt-3 font-black text-green-800">{v.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-lime-600">
              Os desenvolvedores
            </span>
            <h2 className="mt-2 text-4xl font-black text-green-800 uppercase">
              Nosso Time
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Estudantes apaixonados por tecnologia que uniram forças para
              construir o NutriGo do zero.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-black text-green-800">{member.name}</h3>
                    <p className="text-sm font-semibold text-lime-600">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-snug text-gray-500">{member.bio}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-3 flex items-center gap-2 text-xs text-gray-400 transition hover:text-lime-600"
                >
                  <EnvelopeSimpleIcon size={14} weight="fill" />
                  {member.email}
                </a>
                <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
                  <a href={member.github} target="_blank" rel="noreferrer" className="text-green-800 transition hover:text-green-600">
                    <GithubLogoIcon size={20} weight="fill" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-green-800 transition hover:text-green-600">
                    <LinkedinLogoIcon size={20} weight="fill" />
                  </a>
                  <a href={`mailto:${member.email}`} className="text-green-800 transition hover:text-green-600">
                    <EnvelopeSimpleIcon size={20} weight="fill" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-lime-300">
            Tecnologia
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase">
            Feito com as melhores ferramentas
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["React", "TypeScript", "Tailwind CSS", "Axios", "React Router", "Vite"].map((tech) => (
              <span key={tech} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}