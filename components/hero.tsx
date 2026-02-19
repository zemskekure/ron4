"use client"

import Image from "next/image"
import { useState, useRef, useCallback } from "react"

const defaults = {
  cs: {
    subtitle: "v Čestru",
    date: "Čtvrtek 26. 3.",
    reservation: "Rezervace od 17:00",
    dinners: "150 večeří",
    description: "Vícechodové menu z české sezóny očima kanadského šéfkuchaře.",
    tags: "Jehněčí z Rudimova  ·  Spřátelení farmáři  ·  Poctivé řemeslo",
    cta: "Rezervovat večeři",
    ctaSub: "Rezervace se otevřou v 17:00",
    ctaUrl: "#rezervace",
    about: "O Ronovi",
    city: "Praha, 2026",
    aboutTitle: "Ron McKinlay",
    aboutText:
      "Rodák z Vancouveru našel svou vášeň pro vaření už v dětství – za nedělních rodinných obědů (sunday roast), která s láskou připravovala jeho maminka. Více než deset let sbíral zkušenosti v prestižních kuchyních ve Velké Británii, Austrálii a na Blízkém východě. V Edinburghu se učil pod michelinským šéfkuchařem Tomem Kitchinem, v Melbourne pak piloval své řemeslo po boku Scotta Picketta.",
    aboutText2:
      "Ron je známý svou disciplinovaností a hlubokým respektem k lokálním surovinám. V restauraci Canoe naplno ukázal schopnost povýšit bohatství kanadské přírody, díky preciznímu propojení klasických francouzských technik a současného kulinárního myšlení.",
    aboutQuote:
      "\u201E...dok\u00E1\u017Eu uk\u00E1zat p\u0159irozen\u00E9 bohatstv\u00ED zem\u011B, kterou naz\u00FDv\u00E1m domovem.\u201C",
  },
  en: {
    subtitle: "in Čestr",
    date: "Thursday, Mar 26",
    reservation: "Reservations from 17:00",
    dinners: "150 dinners",
    description: "A multi-course menu from the Czech season through the eyes of a Canadian chef.",
    tags: "Lamb from Rudimov  ·  Partner farmers  ·  Honest craft",
    cta: "Reserve a dinner",
    ctaSub: "Reservations open at 17:00",
    ctaUrl: "#rezervace",
    about: "About Ron",
    city: "Prague, 2026",
    aboutTitle: "Ron McKinlay",
    aboutText:
      "A native of Vancouver, Ron discovered his passion for cooking as a child — during the Sunday roasts lovingly prepared by his mother. Over more than a decade, he honed his skills in prestigious kitchens across the UK, Australia, and the Middle East. In Edinburgh, he trained under Michelin-starred chef Tom Kitchin; in Melbourne, he refined his craft alongside Scott Pickett.",
    aboutText2:
      "Ron is known for his discipline and deep respect for local ingredients. At restaurant Canoe, he fully demonstrated his ability to elevate the richness of Canadian nature through a precise fusion of classical French techniques and contemporary culinary thinking.",
    aboutQuote:
      '\u201C...I can showcase the natural richness of the land I now call home.\u201D',
  },
} as const

type LangContent = Record<string, string>
type SiteContent = { cs: LangContent; en: LangContent }
type Lang = "cs" | "en"

function useSpinOnClick() {
  const [spinning, setSpinning] = useState<string | null>(null)
  const spin = useCallback((id: string) => {
    setSpinning(id)
    setTimeout(() => setSpinning(null), 600)
  }, [])
  return { spinning, spin }
}

export function Hero({ content }: { content?: SiteContent | null }) {
  const [lang, setLang] = useState<Lang>("cs")
  const t = content ?? defaults
  const s = t[lang]
  const { spinning, spin } = useSpinOnClick()
  const sheepAudio = useRef<HTMLAudioElement | null>(null)

  const handleImageClick = (id: string, isSheep?: boolean) => {
    spin(id)
    if (isSheep) {
      if (!sheepAudio.current) {
        sheepAudio.current = new Audio("/images/sheep.mp3")
      }
      sheepAudio.current.currentTime = 0
      sheepAudio.current.play()
    }
  }

  return (
    <div>
      {/* ── Hero section ── */}
      <section className="relative min-h-svh flex flex-col px-5 py-4 md:px-10 md:py-6 lg:px-16 lg:py-8 overflow-hidden">
        {/* Clouds — around the typography at the top */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-[2%] right-[5%] md:right-[15%] animate-cloud-float opacity-30">
            <Image src="/images/new/CES_ron_mckinlay_pcs_08.png" alt="" width={600} height={250} className="w-36 md:w-48 lg:w-64 h-auto" />
          </div>
          <div className="absolute top-[8%] left-[-3%] md:left-[6%] animate-cloud-float opacity-25" style={{ animationDelay: "8s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_08.png" alt="" width={600} height={250} className="w-28 md:w-40 lg:w-52 h-auto scale-x-[-1]" />
          </div>
          <div className="absolute top-[5%] left-[30%] md:left-[38%] animate-cloud-float opacity-15" style={{ animationDelay: "4s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_08.png" alt="" width={600} height={250} className="w-24 md:w-36 lg:w-44 h-auto" />
          </div>
        </div>

        {/* Ingredients — below the headline, around the portrait */}
        <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
          {/* Leeks — right, portrait level */}
          <div className="pointer-events-auto absolute top-[30%] right-[8%] md:right-[-2%] lg:right-[8%] animate-drift-slow animate-fade-in-delay-2 cursor-pointer" style={{ animationDelay: "1s" }} onClick={() => handleImageClick("leeks")}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_02.png" alt="" width={600} height={500} className={`w-32 md:w-40 lg:w-48 h-auto mix-blend-screen ${spinning === "leeks" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Pepper — left, portrait level */}
          <div className="pointer-events-auto absolute top-[28%] left-[8%] md:left-[8%] lg:left-[14%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "2s" }} onClick={() => handleImageClick("pepper")}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_03.png" alt="" width={400} height={200} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-multiply ${spinning === "pepper" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Tomatoes — left, lower */}
          <div className="pointer-events-auto absolute top-[48%] left-[2%] md:left-[2%] lg:left-[10%] animate-drift-slow animate-fade-in-delay-4 cursor-pointer" style={{ animationDelay: "4s" }} onClick={() => handleImageClick("tomatoes")}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_05.png" alt="" width={600} height={600} className={`w-28 md:w-36 lg:w-44 h-auto mix-blend-screen ${spinning === "tomatoes" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Knife — right, mid-lower */}
          <div className="pointer-events-auto absolute top-[42%] right-[5%] md:right-[4%] lg:right-[12%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "3s" }} onClick={() => handleImageClick("knife")}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_07.png" alt="" width={300} height={500} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-multiply ${spinning === "knife" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Lamb — lower left */}
          <div className="pointer-events-auto absolute bottom-[12%] left-[5%] md:left-[6%] lg:left-[14%] animate-drift animate-fade-in-delay-4 cursor-pointer" onClick={() => handleImageClick("lamb", true)}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_04.png" alt="" width={600} height={600} className={`w-28 md:w-32 lg:w-40 h-auto mix-blend-screen ${spinning === "lamb" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Morel — lower right */}
          <div className="pointer-events-auto absolute bottom-[14%] right-[8%] md:right-[6%] lg:right-[14%] animate-drift-slow animate-fade-in-delay-4 cursor-pointer" onClick={() => handleImageClick("morel")}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_06.png" alt="" width={300} height={200} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-multiply ${spinning === "morel" ? "animate-spin-once" : ""}`} />
          </div>
        </div>

        {/* Top bar */}
        <header className="relative z-20 flex items-center justify-between w-full animate-fade-in">
          <div>
            <button
              onClick={() => setLang(lang === "cs" ? "en" : "cs")}
              className="text-[10px] md:text-[11px] font-sans tracking-[0.15em] uppercase text-[#1e3a6e] hover:text-[#1e3a6e]/70 transition-colors duration-200 cursor-pointer border border-[#1e3a6e] hover:border-[#1e3a6e]/70 rounded-full px-2.5 py-1"
            >
              {lang === "cs" ? "EN" : "CZ"}
            </button>
          </div>

        </header>

        {/* Main content area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
          <h1 className="font-serif text-center leading-[0.95] tracking-tight animate-fade-in-delay-1">
            <span className="block text-[13vw] md:text-[9vw] lg:text-[7rem] text-[#1e3a6e]">
              Ron McKinlay
            </span>
            <span className="block text-[13vw] md:text-[9vw] lg:text-[7rem] text-[#1e3a6e]/40 mt-[-0.05em]">
              {s.subtitle}
            </span>
          </h1>

          <div className="relative mt-3 md:mt-4 animate-fade-in-delay-2 cursor-pointer" onClick={() => handleImageClick("ron")}>
            <Image
              src="/images/new/CES_ron_mckinlay_pcs_01.png"
              alt="Ron McKinlay"
              width={500}
              height={650}
              className={`w-52 sm:w-60 md:w-72 lg:w-80 h-auto mix-blend-screen ${spinning === "ron" ? "animate-spin-once" : "hover:animate-jiggle"} cursor-pointer`}
              priority
            />
          </div>

          <div className="mt-5 md:mt-6 flex flex-col items-center gap-5 animate-fade-in-delay-3 font-sans text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[#1e3a6e] text-center">
            <p>{s.date}</p>
            <p className="text-foreground/50">{s.description}</p>
            <a
              href={s.ctaUrl ?? "#rezervace"}
              className="px-10 py-3.5 bg-[#1e3a6e] text-background border border-[#1e3a6e] hover:bg-transparent hover:text-[#1e3a6e] transition-colors duration-300"
            >
              {s.cta}
            </a>
            <a
              href="#o-ronovi"
              className="text-[#1e3a6e]/50 hover:text-accent transition-colors duration-200 border-b border-[#1e3a6e]/25 hover:border-accent pb-0.5"
            >
              {s.about} &darr;
            </a>
          </div>
        </div>

      </section>

      {/* ── About section ── */}
      <section
        id="o-ronovi"
        className="relative px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left column — text */}
          <div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#1e3a6e] tracking-tight">
              {s.aboutTitle}
            </h2>
            <div className="mt-6 md:mt-8 flex flex-col gap-4">
              <p className="text-[13px] md:text-[15px] leading-[1.9] text-foreground/60 font-sans">
                {s.aboutText}
              </p>
              <p className="text-[13px] md:text-[15px] leading-[1.9] text-foreground/60 font-sans">
                {s.aboutText2}
              </p>
              <p className="text-accent italic text-[13px] md:text-[15px] leading-[1.8] font-serif mt-2">
                {s.aboutQuote}
              </p>
            </div>
          </div>

          {/* Right column — video */}
          <div>
            <video
              src="/images/ron.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="flex flex-col items-center gap-4 px-5 py-8 md:py-12">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={80}
          height={40}
          className="w-10 md:w-12 h-auto opacity-40"
        />
        <span className="text-[10px] md:text-[11px] font-sans text-foreground/30 tracking-[0.15em] uppercase">
          {s.city}
        </span>
      </footer>
    </div>
  )
}
