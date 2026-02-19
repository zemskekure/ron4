"use client"

import Image from "next/image"
import { useState } from "react"

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
      "Ron McKinlay (Vancouver). 10+ let zkušeností z UK, Austrálie a Blízkého východu. Precizní technika, respekt k surovinám, plná chuť. V Praze vaří výjimečné menu postavené na lokální sezóně.",
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
      "Ron McKinlay (Vancouver). 10+ years of experience across the UK, Australia and the Middle East. Precise technique, respect for ingredients, full flavour. In Prague he cooks an exceptional menu built on local season.",
    aboutQuote:
      '\u201C...I can showcase the natural richness of the land I now call home.\u201D',
  },
} as const

type LangContent = Record<string, string>
type SiteContent = { cs: LangContent; en: LangContent }
type Lang = "cs" | "en"

export function Hero({ content }: { content?: SiteContent | null }) {
  const [lang, setLang] = useState<Lang>("cs")
  const t = content ?? defaults
  const s = t[lang]

  return (
    <div>
      {/* ── Hero section ── */}
      <section className="relative min-h-svh flex flex-col px-5 py-4 md:px-10 md:py-6 lg:px-16 lg:py-8 overflow-hidden">
        {/* Background decorative layer (behind portrait) */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Leeks — upper right, bleeding off edge */}
          <div className="absolute top-[8%] right-[-8%] md:right-[-2%] lg:right-[8%] animate-drift-slow animate-fade-in-delay-2" style={{ animationDelay: "1s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_02.png" alt="" width={600} height={500} className="w-48 md:w-64 lg:w-80 h-auto mix-blend-screen" />
          </div>
          {/* Pepper — left of title */}
          <div className="absolute top-[14%] left-[-4%] md:left-[8%] lg:left-[16%] animate-drift animate-fade-in-delay-3" style={{ animationDelay: "2s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_03.png" alt="" width={400} height={200} className="w-32 md:w-44 lg:w-52 h-auto mix-blend-multiply" />
          </div>
          {/* Tomatoes — left, overlapping portrait level */}
          <div className="absolute top-[38%] left-[-10%] md:left-[2%] lg:left-[10%] animate-drift-slow animate-fade-in-delay-4" style={{ animationDelay: "4s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_05.png" alt="" width={600} height={600} className="w-44 md:w-56 lg:w-64 h-auto mix-blend-screen" />
          </div>
          {/* Knife — right, diagonal, overlapping portrait level */}
          <div className="absolute top-[24%] right-[-6%] md:right-[4%] lg:right-[12%] animate-drift animate-fade-in-delay-3" style={{ animationDelay: "3s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_07.png" alt="" width={300} height={500} className="w-32 md:w-44 lg:w-52 h-auto mix-blend-multiply" />
          </div>
        </div>

        {/* Top bar */}
        <header className="relative z-20 flex items-center justify-between w-full animate-fade-in">
          <div>
            <button
              onClick={() => setLang(lang === "cs" ? "en" : "cs")}
              className="text-[10px] md:text-[11px] font-sans tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors duration-200 cursor-pointer border border-foreground/20 hover:border-foreground/40 rounded-full px-2.5 py-1"
            >
              {lang === "cs" ? "EN" : "CZ"}
            </button>
          </div>

          {/* Info badge */}
          <div className="bg-background/80 backdrop-blur-md border border-foreground/10 rounded-2xl px-4 py-2.5 text-right shadow-sm">
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#1e3a6e] font-sans font-medium">
              {s.date}
            </p>
            <p className="text-[10px] md:text-[11px] tracking-[0.12em] text-[#1e3a6e]/50 font-sans mt-0.5">
              {s.reservation}
            </p>
            <p className="text-[11px] md:text-[12px] tracking-[0.12em] text-accent font-sans font-medium mt-0.5">
              {s.dinners}
            </p>
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

          <div className="relative mt-3 md:mt-4 animate-fade-in-delay-2">
            <Image
              src="/images/new/CES_ron_mckinlay_pcs_01.png"
              alt="Ron McKinlay"
              width={500}
              height={650}
              className="w-52 sm:w-60 md:w-72 lg:w-80 h-auto mix-blend-screen hover:animate-jiggle cursor-pointer"
              priority
            />
          </div>

          <div className="mt-4 md:mt-5 max-w-[320px] md:max-w-[360px] animate-fade-in-delay-3">
            <p className="font-sans text-[12px] md:text-[13px] leading-[1.7] text-foreground/70 text-center">
              {s.description}
            </p>
            <p className="font-sans text-[10px] md:text-[11px] tracking-[0.15em] text-foreground/35 text-center mt-2 uppercase">
              {s.tags}
            </p>
          </div>

          {/* CTA + About link together */}
          <div className="mt-5 md:mt-6 flex flex-col items-center gap-4 animate-fade-in-delay-4">
            <a
              href={s.ctaUrl ?? "#rezervace"}
              className="inline-block font-sans text-[11px] md:text-[12px] tracking-[0.25em] uppercase px-10 py-3.5 border border-[#1e3a6e] text-[#1e3a6e] hover:bg-[#1e3a6e] hover:text-background transition-colors duration-300"
            >
              {s.cta}
            </a>
            <span className="text-[9px] md:text-[10px] font-sans text-foreground/30 tracking-[0.1em]">
              {s.ctaSub}
            </span>
            <a
              href="#o-ronovi"
              className="text-[11px] md:text-[12px] font-sans tracking-[0.2em] uppercase text-[#1e3a6e]/50 hover:text-accent transition-colors duration-200 border-b border-[#1e3a6e]/25 hover:border-accent pb-0.5"
            >
              {s.about} &darr;
            </a>
          </div>
        </div>

        {/* Foreground decorative layer (in front of portrait) */}
        <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
          {/* Lamb — lower left, overlapping content */}
          <div className="absolute bottom-[16%] left-[-6%] md:left-[6%] lg:left-[14%] animate-drift animate-fade-in-delay-4">
            <Image src="/images/new/CES_ron_mckinlay_pcs_04.png" alt="" width={600} height={600} className="w-40 md:w-52 lg:w-64 h-auto mix-blend-screen" />
          </div>
          {/* Morel — lower right, overlapping content */}
          <div className="absolute bottom-[18%] right-[-4%] md:right-[6%] lg:right-[14%] animate-drift-slow animate-fade-in-delay-4">
            <Image src="/images/new/CES_ron_mckinlay_pcs_06.png" alt="" width={300} height={200} className="w-32 md:w-44 lg:w-52 h-auto mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* ── About section ── */}
      <section
        id="o-ronovi"
        className="relative flex flex-col items-center justify-center px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32"
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#1e3a6e] tracking-tight text-center">
          {s.aboutTitle}
        </h2>
        <div className="mt-6 md:mt-8 max-w-md flex flex-col gap-5">
          <p className="text-[13px] md:text-[15px] leading-[1.9] text-foreground/60 font-sans text-center">
            {s.aboutText}
          </p>
          <p className="text-accent italic text-[13px] md:text-[15px] leading-[1.8] font-serif text-center">
            {s.aboutQuote}
          </p>
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
