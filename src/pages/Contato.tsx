import React from "react"
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react"
import { type ChangeEvent, type FormEvent, useState } from "react"

const teamContacts = [
  {
    name: "Matheus C.",
    role: "Backend Developer",
    email: "matheusc@nutrigo.com.br",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    avatar: "MC",
    color: "bg-green-700",
  },
  {
    name: "Marcos",
    role: "Frontend Developer",
    email: "marcos@nutrigo.com.br",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    avatar: "MA",
    color: "bg-lime-600",
  },
  {
    name: "Matheus L.",
    role: "Full Stack Developer",
    email: "matheusl@nutrigo.com.br",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    avatar: "ML",
    color: "bg-green-800",
  },
  {
    name: "Allyson",
    role: "Full Stack Developer",
    email: "allyson@nutrigo.com.br",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    avatar: "AL",
    color: "bg-yellow-600",
  },
  {
    name: "Alexandre",
    role: "Frontend Developer",
    email: "alexandre.julio8772@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    avatar: "AX",
    color: "bg-lime-700",
  },
]

interface FormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

export function Contato(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })
  const [enviado, setEnviado] = useState(false)

  function atualizar(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEnviado(true)
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" })
    setTimeout(() => setEnviado(false), 4000)
  }

  return (
    <div className="mt-16 min-h-screen bg-white">

      <section className="relative overflow-hidden bg-green-800 px-6 py-24 text-white">
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-lime-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-lime-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-lime-300">
            Fale conosco
          </span>
          <h1 className="text-5xl font-black uppercase tracking-tight md:text-6xl">
            Entre em{" "}
            <span className="text-yellow-400">Contato</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-green-100">
            Tem alguma dúvida, sugestão ou quer saber mais sobre o NutriGo?
            Preencha o formulário ou fale diretamente com nossa equipe.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-green-800 uppercase">
              Envie uma mensagem
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Respondemos em até 24 horas úteis.
            </p>
            {enviado && (
              <div className="mt-4 rounded-xl bg-lime-50 p-4 text-sm font-semibold text-lime-700 border border-lime-200">
                ✅ Mensagem enviada com sucesso! Em breve entraremos em contato.
              </div>
            )}
            <form className="mt-6 flex flex-col gap-4" onSubmit={enviar}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-lime-800">Nome</label>
                <input type="text" name="nome" placeholder="Seu nome completo"
                  value={formData.nome} onChange={atualizar} required
                  className="rounded-xl border-2 border-lime-200 p-3 text-sm focus:border-lime-600 focus:ring-1 focus:ring-lime-600 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-lime-800">E-mail</label>
                <input type="email" name="email" placeholder="seuemail@exemplo.com"
                  value={formData.email} onChange={atualizar} required
                  className="rounded-xl border-2 border-lime-200 p-3 text-sm focus:border-lime-600 focus:ring-1 focus:ring-lime-600 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-lime-800">Assunto</label>
                <select name="assunto" value={formData.assunto} onChange={atualizar} required
                  className="rounded-xl border-2 border-lime-200 p-3 text-sm focus:border-lime-600 focus:ring-1 focus:ring-lime-600 focus:outline-none">
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida geral</option>
                  <option value="parceria">Quero ser parceiro</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="bug">Reportar um problema</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-lime-800">Mensagem</label>
                <textarea name="mensagem" placeholder="Escreva sua mensagem aqui..."
                  value={formData.mensagem} onChange={atualizar} required rows={5}
                  className="resize-none rounded-xl border-2 border-lime-200 p-3 text-sm focus:border-lime-600 focus:ring-1 focus:ring-lime-600 focus:outline-none" />
              </div>
              <button type="submit"
                className="rounded-xl bg-lime-600 py-3 font-bold text-white transition hover:bg-lime-700 active:scale-95">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-lime-600">Informações</span>
              <h2 className="mt-1 text-3xl font-black text-green-800 uppercase">NutriGo Delivery</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-2xl bg-green-50 p-5">
                <MapPinIcon size={22} className="mt-0.5 shrink-0 text-green-700" weight="fill" />
                <div>
                  <p className="font-bold text-green-800">Endereço</p>
                  <p className="text-sm text-gray-600">Av. Nutrição Saudável, 1234 — Sala 10<br />São Paulo, SP — CEP 01310-000</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-green-50 p-5">
                <EnvelopeSimpleIcon size={22} className="mt-0.5 shrink-0 text-green-700" weight="fill" />
                <div>
                  <p className="font-bold text-green-800">E-mail</p>
                  <p className="text-sm text-gray-600">contato@nutrigo.com.br</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-green-50 p-5">
                <PhoneIcon size={22} className="mt-0.5 shrink-0 text-green-700" weight="fill" />
                <div>
                  <p className="font-bold text-green-800">Telefone</p>
                  <p className="text-sm text-gray-600">(11) 99999-0000</p>
                  <p className="text-xs text-gray-400">Seg–Sex, 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-lime-600">Time de desenvolvimento</span>
            <h2 className="mt-2 text-3xl font-black text-green-800 uppercase">Fale com a equipe</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamContacts.map((member, i) => (
              <div key={i} className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className={`${member.color} flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white`}>
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-black text-green-800">{member.name}</p>
                    <p className="text-xs font-semibold text-lime-600">{member.role}</p>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <EnvelopeSimpleIcon size={14} className="text-green-700" weight="fill" />
                  {member.email}
                </p>
                <div className="mt-4 flex gap-3 border-t border-gray-100 pt-3">
                  <a href={member.github} target="_blank" rel="noreferrer" className="text-green-800 transition hover:text-green-600">
                    <GithubLogoIcon size={18} weight="fill" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-green-800 transition hover:text-green-600">
                    <LinkedinLogoIcon size={18} weight="fill" />
                  </a>
                  <a href={member.instagram} target="_blank" rel="noreferrer" className="text-green-800 transition hover:text-green-600">
                    <InstagramLogoIcon size={18} weight="fill" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}