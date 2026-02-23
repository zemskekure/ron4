"use client"

import Image from "next/image"
import { useState, useRef, useCallback } from "react"

const defaults = {
  cs: {
    subtitle: "v Čestru",
    date: "26. března 2026, restaurace Čestr",
    description: "Vícechodové večerní menu z českých surovin očima kanadského šéfkuchaře",
    cta: "Rezervovat večeři",
    ctaUrl: "#rezervace",
    about: "O Ronovi",
    aboutTitle: "Ron McKinlay",
    aboutText:
      "Rodák z Vancouveru našel svou vášeň pro vaření už v dětství – za nedělních rodinných obědů (sunday roast), které s láskou připravovala jeho maminka. Více než deset let sbíral zkušenosti v prestižních kuchyních ve Velké Británii, Austrálii a na Blízkém východě. V Edinburghu se učil pod michelinským šéfkuchařem Tomem Kitchinem, v Melbourne pak piloval své řemeslo po boku Scotta Picketta. V Kanadě několik let pracoval jako executive chef v podniku Canoe, kde naplno ukázal schopnost povýšit bohatství kanadské přírody, díky preciznímu propojení klasických francouzských technik a současného kulinárního myšlení.",
    aboutText2:
      "Ron je známý svou disciplinovaností a hlubokým respektem k lokálním surovinám. V současné době buduje vlastní koncept, školí profesionály a poskytuje konzultace restauracím i značkám.",
    aboutQuote:
      "\u201EFrancouzskou kuchyni jsme doma nejedli, ale jedli jsme čerstvé suroviny. Moje maminka na zahradě pěstovala, a pořád pěstuje, vlastní produkty, takže na stole bylo vždycky něco sezónního. Právě tenhle základ poctivého, dobře připraveného jídla mě pravděpodobně formoval úplně stejně silně jako jakékoli klasické kulinární vzdělání.\u201C",
    menuTitle: "Co vás čeká",
    menuText:
      "Kanadský šéfkuchař Ron McKinlay v restauraci Čestr uvaří několikachodové menu odrážející jeho pohled na českou sezónu. Prim budou hrát suroviny od místních farmářů, především pak jehněčí, a Ronovy zkušenosti a recepty. V jeho vizi ho podpoří tým kuchařů z Ambiente.",
    menuText2:
      "Ron miluje obyčejné suroviny a díky preciznímu technickému přístupu z nich dokáže připravit výjimečný zážitek. Žádné zkratky. Poctivé řemeslo. Plná chuť.",
    menuText3:
      "Během večeře však bude Ron věnovat pozornost především vám – hostům. A tak bude prostor se o menu dozvědět více přímo od něj. Přijďte se podívat, jak vypadá a chutná kanadská kultura v kombinaci s tou českou.",
    menuText4:
      "Pop-up se koná v restauraci Čestr, která klade důraz na poctivé lokální a sezónní suroviny od spřátelených farmářů a právě maso z české produkce je místní specialitou. Díky otevřené kuchyni a prosklené bourárně budete mít dění doslova na dohled.",
    infoTitle: "Praktické informace",
    infoDate: "26. března 2026",
    infoPlace: "Restaurace Čestr, Praha",
    infoDiet:
      "Vzhledem k charakteru večeře a pevně stanovenému menu není možné připravit vegetariánskou ani veganskou variantu. V případě dietních omezení či alergií nás prosím kontaktujte před vytvořením rezervace, abychom mohli ověřit dostupné možnosti.",
    contextText:
      "Praha je kulinářsky na vzestupu a vzbuzuje čím dál větší zájem zahraničních kuchařů. Ron McKinlay přijel na pozvání kreativních šéfkuchařů Ambiente, aby zprostředkoval interní vzdělávací workshop a besedu pro veřejnost. Rozhodl se však zůstat déle a tak vznikla i příležitost podělit se o jeho zkušenosti v celé šíři prostřednictvím tohoto pop-upu.",
    footerCredit: "Za pop-upem stojí lidé z Ambiente",
  },
  en: {
    subtitle: "in Čestr",
    date: "March 26, 2026, Čestr Restaurant",
    description: "A multi-course evening menu from Czech ingredients through the eyes of a Canadian chef",
    cta: "Reserve a dinner",
    ctaUrl: "#rezervace",
    about: "About Ron",
    aboutTitle: "Ron McKinlay",
    aboutText:
      "A native of Vancouver, Ron discovered his passion for cooking as a child — during the Sunday roasts lovingly prepared by his mother. Over more than a decade, he honed his skills in prestigious kitchens across the UK, Australia, and the Middle East. In Edinburgh, he trained under Michelin-starred chef Tom Kitchin; in Melbourne, he refined his craft alongside Scott Pickett. In Canada, he spent several years as executive chef at Canoe, where he fully demonstrated his ability to elevate the richness of Canadian nature through a precise fusion of classical French techniques and contemporary culinary thinking.",
    aboutText2:
      "Ron is known for his discipline and deep respect for local ingredients. He is currently building his own concept, training professionals, and consulting for restaurants and brands.",
    aboutQuote:
      "\u201CWe did not grow up around French food, but we grew up around fresh food. My mum had a garden in the backyard and still does. There was always something seasonal on the table. That foundation of honest, well cooked food probably shaped me just as much as any classical training did.\u201D",
    menuTitle: "What to expect",
    menuText:
      "Canadian chef Ron McKinlay will prepare a multi-course menu at Čestr restaurant, reflecting his perspective on the Czech season. The starring roles go to ingredients from local farmers — especially lamb — and Ron\u2019s experience and recipes. He will be supported by the Ambiente kitchen team.",
    menuText2:
      "Ron loves simple ingredients and, through a precise technical approach, transforms them into an exceptional experience. No shortcuts. Honest craft. Full flavor.",
    menuText3:
      "During the dinner, Ron will devote his attention above all to you — the guests. There will be space to learn more about the menu directly from him. Come see what Canadian culture looks and tastes like when combined with Czech tradition.",
    menuText4:
      "The pop-up takes place at Čestr restaurant, which emphasizes honest, local, and seasonal ingredients from partner farmers — Czech-raised meat is the house specialty. Thanks to the open kitchen and glass-walled butchery, you\u2019ll have a front-row seat to the action.",
    infoTitle: "Practical information",
    infoDate: "March 26, 2026",
    infoPlace: "Čestr Restaurant, Prague",
    infoDiet:
      "Due to the nature of the dinner and a fixed menu, we are unable to prepare a vegetarian or vegan option. If you have dietary restrictions or allergies, please contact us before making a reservation so we can verify available options.",
    contextText:
      "Prague\u2019s culinary scene is on the rise and attracting growing interest from international chefs. Ron McKinlay came at the invitation of Ambiente\u2019s creative chefs to lead an internal training workshop and a public talk. He decided to stay longer, creating the opportunity to share his experience in full through this pop-up.",
    footerCredit: "This pop-up is brought to you by the people at Ambiente",
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
          {/* Onion — right, portrait level */}
          <div className="pointer-events-auto absolute top-[30%] right-[8%] md:right-[-2%] lg:right-[8%] animate-drift-slow animate-fade-in-delay-2 cursor-pointer" style={{ animationDelay: "1s" }} onClick={() => handleImageClick("onion")}>
            <Image src="/images/new/cibule.png" alt="" width={600} height={500} className={`w-32 md:w-40 lg:w-48 h-auto mix-blend-screen ${spinning === "onion" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Parsley — left, portrait level */}
          <div className="pointer-events-auto absolute top-[28%] left-[8%] md:left-[8%] lg:left-[14%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "2s" }} onClick={() => handleImageClick("parsley")}>
            <Image src="/images/new/petrzel.png" alt="" width={400} height={200} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-multiply ${spinning === "parsley" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Fish — left, lower */}
          <div className="pointer-events-auto absolute top-[48%] left-[2%] md:left-[2%] lg:left-[10%] animate-drift-slow animate-fade-in-delay-4 cursor-pointer" style={{ animationDelay: "4s" }} onClick={() => handleImageClick("fish")}>
            <Image src="/images/new/ryba.png" alt="" width={600} height={600} className={`w-36 md:w-48 lg:w-56 h-auto mix-blend-screen ${spinning === "fish" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Knife — right, mid-lower */}
          <div className="pointer-events-auto absolute top-[42%] right-[5%] md:right-[4%] lg:right-[12%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "3s" }} onClick={() => handleImageClick("knife")}>
            <Image src="/images/new/kejta.png" alt="" width={300} height={500} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-multiply ${spinning === "knife" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Lamb — lower left */}
          <div className="pointer-events-auto absolute bottom-[12%] left-[5%] md:left-[6%] lg:left-[14%] animate-drift animate-fade-in-delay-4 cursor-pointer" onClick={() => handleImageClick("lamb", true)}>
            <Image src="/images/new/jehnecihrebinek.png" alt="" width={600} height={600} className={`w-28 md:w-32 lg:w-40 h-auto mix-blend-screen ${spinning === "lamb" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Topinambur — lower right */}
          <div className="pointer-events-auto absolute bottom-[14%] right-[8%] md:right-[6%] lg:right-[14%] animate-drift-slow animate-fade-in-delay-4 cursor-pointer" onClick={() => handleImageClick("topinambur")}>
            <Image src="/images/new/topinambur.png" alt="" width={300} height={200} className={`w-20 md:w-24 lg:w-28 h-auto mix-blend-multiply ${spinning === "topinambur" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Celery — top left, near clouds */}
          <div className="pointer-events-auto absolute top-[18%] left-[3%] md:left-[4%] lg:left-[8%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "5s" }} onClick={() => handleImageClick("celer")}>
            <Image src="/images/new/celer.png" alt="" width={500} height={500} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-screen ${spinning === "celer" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Parsley root — bottom center-right */}
          <div className="pointer-events-auto absolute bottom-[8%] right-[25%] md:right-[28%] lg:right-[30%] animate-drift-slow animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "6s" }} onClick={() => handleImageClick("petrzel")}>
            <Image src="/images/new/petrzel.png" alt="" width={400} height={200} className={`w-20 md:w-24 lg:w-28 h-auto mix-blend-multiply ${spinning === "petrzel" ? "animate-spin-once" : ""}`} />
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
              src="/images/new/ron.png"
              alt="Ron McKinlay"
              width={500}
              height={650}
              className={`w-52 sm:w-60 md:w-72 lg:w-80 h-auto mix-blend-screen ${spinning === "ron" ? "animate-spin-once" : "hover:animate-jiggle"} cursor-pointer`}
              priority
            />
          </div>

          <div className="mt-5 md:mt-6 flex flex-col items-center gap-5 animate-fade-in-delay-3 font-sans text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[#1e3a6e] text-center">
            <p>{s.date}</p>
            <p className="text-foreground/50 normal-case tracking-normal text-[13px] md:text-[15px] max-w-md">{s.description}</p>
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
              <blockquote className="mt-4 pl-4 border-l-2 border-accent/40">
                <p className="text-accent italic text-[13px] md:text-[15px] leading-[1.8] font-serif">
                  {s.aboutQuote}
                </p>
              </blockquote>
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

      {/* ── Menu / Event section ── */}
      <section className="relative px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32 bg-[#1e3a6e] text-[#f3efe6]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight text-center">
            {s.menuTitle}
          </h2>
          <div className="mt-8 md:mt-12 flex flex-col gap-6 text-[13px] md:text-[15px] leading-[1.9] font-sans text-[#f3efe6]/70">
            <p>{s.menuText}</p>
            <p className="text-[#f3efe6] font-medium">{s.menuText2}</p>
            <p>{s.menuText3}</p>
            <p>{s.menuText4}</p>
          </div>
        </div>
      </section>

      {/* ── Practical info section ── */}
      <section id="rezervace" className="relative px-5 py-12 md:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#1e3a6e] tracking-tight text-center">
            {s.infoTitle}
          </h2>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center text-center">
            <div>
              <span className="block text-[10px] md:text-[11px] font-sans tracking-[0.15em] uppercase text-[#1e3a6e]/40 mb-1">
                {lang === "cs" ? "Datum" : "Date"}
              </span>
              <span className="text-[14px] md:text-[16px] font-serif text-[#1e3a6e]">
                {s.infoDate}
              </span>
            </div>
            <div className="hidden sm:block w-px bg-border" />
            <div>
              <span className="block text-[10px] md:text-[11px] font-sans tracking-[0.15em] uppercase text-[#1e3a6e]/40 mb-1">
                {lang === "cs" ? "Místo" : "Venue"}
              </span>
              <span className="text-[14px] md:text-[16px] font-serif text-[#1e3a6e]">
                {s.infoPlace}
              </span>
            </div>
          </div>

          <p className="mt-8 md:mt-10 text-[12px] md:text-[13px] leading-[1.8] text-foreground/40 font-sans text-center">
            {s.infoDiet}
          </p>

          <p className="mt-6 text-[12px] md:text-[13px] leading-[1.8] text-foreground/35 font-sans italic text-center">
            {s.contextText}
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="flex flex-col items-center gap-5 px-5 py-10 md:py-16 border-t border-border">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={80}
          height={40}
          className="w-10 md:w-12 h-auto opacity-40"
        />
        <span className="text-[11px] md:text-[12px] font-sans text-foreground/40 tracking-wide">
          {s.footerCredit}
        </span>
        <a
          href="https://www.instagram.com/restaurace_cestr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-[11px] font-sans tracking-[0.15em] uppercase text-[#1e3a6e]/50 hover:text-[#1e3a6e] transition-colors duration-200"
        >
          @restaurace_cestr
        </a>
      </footer>
    </div>
  )
}
