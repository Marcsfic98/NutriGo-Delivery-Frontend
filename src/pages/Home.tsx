import { useState } from "react"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"

import { Clock, Store, Users, ArrowRight, Star, CheckCircle2, BarChart3, PlusCircle } from "lucide-react"
import { Dumbbell, Scale } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"

interface FoodItem {
  id: number
  name: string
  subtitle: string
  desc: string
  img: string
}

const foodData: FoodItem[] = [
  {
    id: 1,
    name: "Pizzas",
    subtitle: "Massa Integral",
    desc: "Massa de aveia com frango desfiado e queijo light",
    img: "/img/pratos/pizza.png",
  },
  {
    id: 2,
    name: "Massas",
    subtitle: "Baixo Carboidrato",
    desc: "Espaguete de abobrinha ao molho pesto e castanhas",
    img: "/img/pratos/massa.png",
  },
  {
    id: 3,
    name: "Hamburgers",
    subtitle: "Rico em Proteína",
    desc: "Blend de patinho no pão australiano integral",
    img: "/img/pratos/burguer.png",
  },
  {
    id: 4,
    name: "Doces",
    subtitle: "Zero Açúcar",
    desc: "Mousse de cacau 70% com stevia e morangos frescos",
    img: "/img/pratos/doce.png",
  },
  {
    id: 5,
    name: "Bolos",
    subtitle: "Sem Glúten",
    desc: "Bolo de banana com aveia, canela e whey protein",
    img: "/img/pratos/bolo.png",
  },
]

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleProgress = (swiper: SwiperType) => {
    swiper.slides.forEach((slide) => {
      const slideProgress = (slide as any).progress || 0
      const absProgress = Math.abs(slideProgress)
      const translateY = absProgress * -150
      const scale = 1 - absProgress * 0.3
      const opacity = 1 - absProgress * 0.5
      const rotate = slideProgress * 15
      slide.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`
      slide.style.opacity = `${opacity}`
    })
  }

  const metrics = [
    { value: "+1.200", label: "Deliveries Parceiros" },
    { value: "+45 mil", label: "Pratos Cadastrados" },
    { value: "+150 mil", label: "Clientes Ativos" },
    { value: "4.9/5", label: "Avaliação Média" },
  ]

  const partnerFeatures = [
    {
      title: "Gestão Descomplicada",
      desc: "Painel SaaS completo para gerenciar estoque, pedidos e rotas de entrega.",
      icon: <BarChart3 className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Vitrine Inteligente",
      desc: "Seus pratos saudáveis em destaque para clientes que buscam exatamente o seu nicho.",
      icon: <Store className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Cardápio Flexível",
      desc: "Cadastre ingredientes, tabelas nutricionais e objetivos (Keto, Vegano, Hiperproteico).",
      icon: <PlusCircle className="h-5 w-5 text-green-600" />,
    },
  ]

  const reviews = [
    {
      title: "Minhas vendas dobraram",
      text: `"Como restaurante saudável, era difícil competir no iFood comum. Na NutriGo só entra quem busca saúde. Nosso faturamento explodiu."`,
      author: "MARCELO - DONO DO GREENEATS",
    },
    {
      title: "Facilidade para encontrar marmitas",
      text: `"Uso como cliente. Consigo filtrar deliveries que vendem marmitas exatamente com a pesagem de carbo e proteína que meu nutricionista passou."`,
      author: "GUSTAVO PORTO - ATLETA",
    },
    {
      title: "O melhor SaaS para meu negócio",
      text: `"O sistema de gerenciamento de pratos e a facilidade que os clientes nos acham tornou a NutriGo indispensável para nossa cozinha."`,
      author: "PATRÍCIA - NUTRICHEF",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      
     

      {/* 2. HERO BANNER PRINCIPAL (MARKETPLACE & ECOSSISTEMA) */}
      <section className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden bg-[url('/img/banner/bghome.jpg')] bg-cover bg-center bg-no-repeat px-4 pt-28 pb-20 text-white">
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay escuro para destacar texto */}
        
        <div className="z-10 mb-8 text-center md:mb-14 max-w-3xl">
          <span className="rounded-full bg-green-500/20 border border-green-400/30 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-green-400">
            O Ecossistema da Alimentação Saudável
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tighter text-white uppercase sm:text-5xl md:text-5xl leading-tight">
            A plataforma que conecta <span className="text-yellow-400">Deliveries Saudáveis</span> a Clientes em potencial
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 md:text-base">
            Se você vende, gerencie seu negócio com nosso SaaS especialista. Se você busca saúde, encontre os melhores pratos com filtros nutricionais avançados.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3.5 font-bold text-gray-950 shadow-lg transition hover:bg-yellow-400 hover:scale-105">
              Cadastrar Minha Empresa <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3.5 font-bold text-white transition hover:bg-white/20">
              Explorar Pratos Saudáveis
            </button>
          </div>
        </div>

        {/* Swiper mantido como vitrine tecnológica do que existe dentro do ecossistema */}
        <div className="relative z-10 w-full max-w-5xl">
          <Swiper
            modules={[Navigation, Autoplay]}
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            speed={500}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            watchSlidesProgress={true}
            onProgress={handleProgress}
            onSetTransition={(swiper, duration) => {
              swiper.slides.forEach((slide) => { slide.style.transition = `${duration}ms ease-out` })
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 0 },
              768: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="w-full overflow-visible!"
          >
            {foodData.map((food) => (
              <SwiperSlide key={food.id} className="flex items-center justify-center">
                <div className="group relative flex w-full items-center justify-center">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="mx-auto h-auto w-60 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110 md:w-72"
                  />
                  <div className="absolute -bottom-6 left-1/2 -z-10 h-10 w-36 -translate-x-1/2 rounded-full bg-green-500/40 opacity-0 blur-2xl transition-opacity duration-500 in-[.swiper-slide-active]:opacity-100" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 3. SEÇÃO DE MÉTRICAS / PROVA SOCIAL (ESSENCIAL PARA SAAS) */}
      <section className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl font-black text-green-600 md:text-4xl">{metric.value}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PARA QUEM VENDE: SOLUÇÃO B2B (SAAS) */}
      <section id="como-funciona" className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl grid gap-12 items-center md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">Para Deliveries & Restaurantes</span>
            <h2 className="mt-2 text-3xl font-black text-gray-900 md:text-4xl leading-tight">O software definitivo para gerenciar e escalar sua cozinha saudável</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Pare de disputar espaço com redes de fast-food. Na NutriGo, seu restaurante ganha uma vitrine exclusiva focada no público fitness e dietas restritivas, além de um sistema SaaS robusto de gestão.
            </p>
            <div className="mt-8 space-y-4">
              {partnerFeatures.map((feat, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">{feat.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{feat.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gray-900 p-4 shadow-2xl border border-gray-800">
            {/* Elemento visual simulando o Dashboard do SaaS corporativo */}
            <div className="aspect-[4/3] w-full rounded-2xl bg-gray-950 p-6 text-white flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Dashboard da Empresa</span>
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">Online</span>
              </div>
              <div className="my-auto space-y-4">
                <p className="text-2xl font-black text-white">R$ 14.820,50 <span className="text-xs font-normal text-green-400 block mt-0.5">+24% este mês</span></p>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[75%]" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">📦 48 Pedidos Hoje</div>
                  <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">🥗 12 Novos Pratos</div>
                </div>
              </div>
              <button className="w-full rounded-xl bg-green-600 py-2.5 text-xs font-bold text-white transition hover:bg-green-700">Acessar Painel Admin</button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARA QUEM COMPRA: SOLUÇÃO B2C (FILTROS DE OBJETIVOS) */}
      <section id="beneficios" className="bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">Para os Clientes</span>
            <h2 className="mt-1 text-3xl font-black text-gray-900">Encontre o prato perfeito para o seu objetivo</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "PRATICIDADE", description: "Encontre empresas locais com rotinas de entregas programadas.", icon: <Clock className="h-8 w-8 text-green-500" />, bgIcon: "bg-green-50" },
              { title: "EMAGRECER", description: "Filtre pratos por calorias exatas, Low Carb e pacotes de emagrecimento.", icon: <Scale className="h-8 w-8 text-green-500" />, bgIcon: "bg-green-50" },
              { title: "MASSA MUSCULAR", description: "Acesse marmitas hiperproteicas direto de produtores focados em ganho de massa.", icon: <Dumbbell className="h-8 w-8 text-green-500" />, bgIcon: "bg-green-50" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8">
                <div className={`${item.bgIcon} shrink-0 rounded-2xl p-4`}>{item.icon}</div>
                <div className="flex flex-col">
                  <h3 className="text-base leading-tight font-black text-green-600 uppercase md:text-lg">{item.title}</h3>
                  <p className="mt-1 text-xs leading-snug text-gray-500 md:text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REVIEWS & CASES DE SUCESSO (SOCIOS E CLIENTES) */}
      <section id="depoimentos" className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-green-600 uppercase md:text-4xl">Quem usa e confia na NutriGo</h2>
          <div className="mt-4 flex justify-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((review, index) => (
              <div key={index} className="rounded-3xl bg-gray-50 p-6 text-left border border-gray-100 transition duration-300 hover:shadow-lg md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-800 md:text-lg border-b border-gray-200 pb-2 mb-3">{review.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600 md:text-sm italic">{review.text}</p>
                </div>
                <p className="mt-6 text-[11px] font-bold tracking-wider text-green-600 uppercase">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}