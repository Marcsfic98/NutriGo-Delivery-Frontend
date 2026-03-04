import { useState } from "react"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Clock } from "@phosphor-icons/react"
import { Dumbbell, Scale } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"

const foodData = [
  {
    id: 1,
    name: "Pizzas",
    tamil: "Massa Integral",
    desc: "Massa de aveia com frango desfiado e queijo light",
    img: "/img/pratos/pizza.png",
  },
  {
    id: 2,
    name: "Massas",
    tamil: "Baixo Carboidrato",
    desc: "Espaguete de abobrinha ao molho pesto e castanhas",
    img: "/img/pratos/massa.png",
  },
  {
    id: 3,
    name: "Hamburgers",
    tamil: "Rico em Proteína",
    desc: "Blend de patinho no pão australiano integral",
    img: "/img/pratos/burguer.png",
  },
  {
    id: 4,
    name: "Doces",
    tamil: "Zero Açúcar",
    desc: "Mousse de cacau 70% com stevia e morangos frescos",
    img: "/img/pratos/doce.png",
  },
  {
    id: 5,
    name: "Bolos",
    tamil: "Sem Glúten",
    desc: "Bolo de banana com aveia, canela e whey protein",
    img: "/img/pratos/bolo.png",
  },
]

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProgress = (swiper: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    swiper.slides.forEach((slide: any) => {
      const slideProgress = slide.progress
      const absProgress = Math.abs(slideProgress)

      const translateY = absProgress * -150
      const scale = 1 - absProgress * 0.3
      const opacity = 1 - absProgress * 0.5
      const rotate = slideProgress * 15

      slide.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`
      slide.style.opacity = `${opacity}`
    })
  }

  const reviews = [
    {
      title: "Perfeito para a dieta",
      text: `"Me ajudou a manter o foco na dieta sem abrir mão do sabor. Estou adorando, recomendo!"`,
      author: "FERNANDA",
    },
    {
      title: "Embalagem impecável",
      text: `"A embalagem é linda e mantém a qualidade do produto. Nota 10! Parabéns a todos da Fit!"`,
      author: "GUSTAVO PORTO",
    },
    {
      title: "Excelente custo-benefício",
      text: `"A qualidade é muito superior ao preço. Vale muito a pena!"`,
      author: "PATRÍCIA CARDOSO",
    },
  ]

  const objectives = [
    {
      title: "PRATICIDADE",
      description: "Refeições equilibradas para o dia a dia corrido",
      icon: <Clock className="h-8 w-8 text-green-500" />,
      bgIcon: "bg-green-50",
    },
    {
      title: "EMAGRECER",
      description: "Programas de 3 à 13 dias pra eliminar até 6kg",
      icon: <Scale className="h-8 w-8 text-green-500" />,
      bgIcon: "bg-green-50",
    },
    {
      title: "MASSA MUSCULAR",
      description: "Marmitas protéicas com 450g e muitos nutrientes",
      icon: <Dumbbell className="h-8 w-8 text-green-500" />,
      bgIcon: "bg-green-50",
    },
  ]

  return (
    <>
      <div className="relative mt-16 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[url('img/banner/bghome.jpg')] bg-cover bg-no-repeat p-4 text-white">
        <div className="z-10 mb-20 text-center">
          <h2 className="text-4xl font-bold text-white transition-all duration-500 select-none">
            {foodData[activeIndex]?.tamil}
          </h2>
          <h1 className="-mt-4 text-7xl font-black tracking-tighter text-yellow-600 uppercase transition-all duration-700">
            {foodData[activeIndex]?.name}
          </h1>
          <p className="mt-2 text-gray-200 italic">
            {foodData[activeIndex]?.desc}
          </p>
        </div>
        <div className="relative w-full max-w-5xl">
          <Swiper
            modules={[Navigation, Autoplay]}
            centeredSlides={true}
            grabCursor={true}
            slidesPerView={3}
            loop={true}
            loopedSlides={4}
            speed={500}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            watchSlidesProgress={true}
            onProgress={handleProgress}
            onSetTransition={(swiper, duration) => {
              swiper.slides.forEach((slide) => {
                slide.style.transition = `${duration}ms ease-out`
              })
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="overflow-visible!"
          >
            {foodData.map((food) => (
              <SwiperSlide
                key={food.id}
                className="flex flex-col items-center justify-center"
              >
                <div className="group relative">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="h-auto w-70 drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-110 md:w-87.5"
                  />

                  <div className="absolute -bottom-10 left-1/2 -z-10 h-14 w-44 -translate-x-1/2 rounded-full bg-green-600/30 opacity-0 blur-[50px] transition-opacity duration-500 in-[.swiper-slide-active]:opacity-100" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute bottom-10 left-1/2 h-0.5 w-48 -translate-x-1/2 bg-white/10">
          <div
            className="h-full bg-green-600 shadow-[0_0_10px_#ea580c] transition-all duration-700"
            style={{ width: `${((activeIndex + 1) / foodData.length) * 100}%` }}
          />
        </div>
      </div>

      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Título Principal */}
          <h2 className="mb-12 text-center text-3xl font-black tracking-tight text-green-600 uppercase md:text-4xl">
            Descubra seu fit ideal
          </h2>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {objectives.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 rounded-2xl bg-white p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Container do Ícone */}
                <div className={`${item.bgIcon} flex-shrink-0 rounded-2xl p-4`}>
                  {item.icon}
                </div>

                {/* Texto */}
                <div className="flex flex-col">
                  <h3 className="text-lg leading-tight font-black text-green-600 uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          {/* Título */}
          <h2 className="text-4xl font-extrabold text-green-500 uppercase">
            Será que é bom?
          </h2>

          {/* Estrelas topo */}
          <div className="mt-4 flex justify-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-500">de 15.676 avaliações</p>

          {/* Cards */}
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-8 text-left shadow-md transition hover:shadow-lg"
              >
                {/* Estrelas do card */}
                <div className="mb-4 flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-800">
                  {review.title}
                </h3>

                <p className="mt-4 leading-relaxed text-gray-600">
                  {review.text}
                </p>

                <p className="mt-6 font-bold text-lime-600">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
