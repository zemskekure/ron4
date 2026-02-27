"use client"

import Image from "next/image"
import { useState, useRef, useCallback, useEffect } from "react"

function useResourceDebug() {
  useEffect(() => {
    const pageStart = performance.now()
    console.log(
      "%c[perf] Page component mounted at " + Math.round(pageStart) + "ms",
      "color: #1e3a6e; font-weight: bold"
    )

    // Log resources already loaded before this effect ran
    const existing = performance.getEntriesByType("resource") as PerformanceResourceTiming[]
    if (existing.length) {
      console.groupCollapsed(`[perf] ${existing.length} resources already loaded`)
      const sorted = [...existing].sort((a, b) => b.duration - a.duration)
      for (const r of sorted) {
        const sizeKB = r.transferSize ? (r.transferSize / 1024).toFixed(1) + " KB" : "cached/opaque"
        const name = r.name.split("/").slice(-2).join("/")
        console.log(
          `${Math.round(r.duration)}ms | ${sizeKB} | ${name}`
        )
      }
      console.groupEnd()
    }

    // Watch for new resources as they load
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const r = entry as PerformanceResourceTiming
        const sizeKB = r.transferSize ? (r.transferSize / 1024).toFixed(1) + " KB" : "cached/opaque"
        const name = r.name.split("/").slice(-2).join("/")
        const isLarge = r.transferSize > 500_000
        const isSlow = r.duration > 1000
        const style = isLarge || isSlow
          ? "color: red; font-weight: bold"
          : "color: gray"
        console.log(
          `%c[perf] loaded: ${Math.round(r.duration)}ms | ${sizeKB} | ${name}` +
            (isSlow ? " ⚠️ SLOW" : "") +
            (isLarge ? " 🐘 LARGE" : ""),
          style
        )
      }
    })
    observer.observe({ type: "resource", buffered: false })

    // Log image-specific timing via load events
    const images = document.querySelectorAll("img")
    const imgTimers: { el: HTMLImageElement; handler: () => void }[] = []
    images.forEach((img) => {
      if (img.complete) {
        console.log(`[perf] img already complete: ${img.src.split("/").pop()}`)
      } else {
        const start = performance.now()
        const handler = () => {
          const elapsed = Math.round(performance.now() - start)
          const w = img.naturalWidth
          const h = img.naturalHeight
          console.log(
            `[perf] img onload: ${elapsed}ms | ${w}x${h} | ${img.src.split("/").pop()}`
          )
        }
        img.addEventListener("load", handler)
        imgTimers.push({ el: img, handler })
      }
    })

    // Summary after everything settles
    const summaryTimer = setTimeout(() => {
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[]
      const images = resources.filter((r) => /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(r.name))
      const videos = resources.filter((r) => /\.(mp4|mov|webm)(\?|$)/i.test(r.name))
      const totalImgKB = images.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024
      const totalVidKB = videos.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024
      const slowest = [...resources].sort((a, b) => b.duration - a.duration).slice(0, 5)

      console.log(
        "%c[perf] ═══ SUMMARY ═══",
        "color: #1e3a6e; font-weight: bold; font-size: 14px"
      )
      console.log(`  Images: ${images.length} files, ${(totalImgKB / 1024).toFixed(1)} MB transferred`)
      console.log(`  Videos: ${videos.length} files, ${(totalVidKB / 1024).toFixed(1)} MB transferred`)
      console.log(`  Total resources: ${resources.length}`)
      console.log(`  Top 5 slowest:`)
      for (const r of slowest) {
        const sizeKB = r.transferSize ? (r.transferSize / 1024).toFixed(1) + " KB" : "cached"
        console.log(`    ${Math.round(r.duration)}ms | ${sizeKB} | ${r.name.split("/").pop()}`)
      }
    }, 5000)

    return () => {
      observer.disconnect()
      clearTimeout(summaryTimer)
      imgTimers.forEach(({ el, handler }) => el.removeEventListener("load", handler))
    }
  }, [])
}

const defaults = {
  cs: {
    subtitle: "v Čestru",
    date: "26. března 2026, restaurace Čestr",
    description: "Vícechodové degustační menu z českých surovin očima kanadského šéfkuchaře",
    cta: "Rezervovat večeři",
    ctaUrl: "#rezervace",
    about: "O Ronovi",
    aboutTitle: "Ron McKinlay",
    aboutText:
      "Rodák z Vancouveru našel svou vášeň pro vaření už v dětství \u2013 za nedělních rodinných obědů (Sunday roast), které s láskou připravovala jeho maminka. Více než deset let sbíral zkušenosti v zahraničí. V Edinburghu se učil pod michelinským šéfkuchařem **Tomem Kitchinem**, v Melbourne pak piloval techniky po boku **Scotta Picketta**. V Torontu několik let působil jako executive chef v podniku **Canoe**.",
    aboutText2:
      "Ron je známý svou disciplinovaností a hlubokým respektem k lokálním surovinám. V současné době buduje vlastní koncept, školí profesionály a poskytuje konzultace restauracím i značkám.",
    aboutQuote:
      "\u201EMoje maminka má zahradu, takže na stole bylo vždycky něco sezonního. Právě tenhle základ poctivého, dobře připraveného jídla mě pravděpodobně formoval úplně stejně silně jako jakékoli klasické kulinářské vzdělání.\u201C",
    menuTitle: "Co vás čeká",
    menuText:
      "Kanadský šéfkuchař Ron McKinlay připraví v restauraci Čestr **několikachodové degustační menu** inspirované českou sezonou. Po boku mu bude stát tým zkušených kuchařů z Ambiente.",
    menuText2:
      "V hlavní roli budou suroviny od tuzemských farmářů, především **jehněčí**, Ronovy recepty a bohaté zkušenosti. Ron staví jídla na obyčejných surovinách, z nichž díky precizně osvojeným **francouzským technikám** dokáže připravit výjimečný zážitek.",
    menuText3:
      "Během večera budete mít prostor dozvědět se o podrobnostech a vzniku menu přímo od samotného šéfkuchaře. Pop-up se koná v restauraci Čestr, která klade důraz na poctivé lokální a sezonní suroviny od spřátelených farmářů. Maso z české produkce je místní specialitou. Díky otevřené kuchyni a prosklené bourárně můžete nahlédnout do centra dění.",
    infoTitle: "Praktické informace",
    infoDate: "26. března, 17:00\u201321:00",
    infoPlace: "Restaurace Čestr, Praha",
    infoDiet:
      "Vzhledem k charakteru večeře a pevně stanovenému menu není možné připravit vegetariánskou ani veganskou variantu. V případě dietních omezení či alergií nás prosím kontaktujte před vytvořením rezervace, abychom mohli ověřit dostupné možnosti.",
    contextText:
      "Kulinářsky vyspělá Praha se čím dál častěji objevuje v hledáčku zahraničních kuchařů. Ron McKinlay přijíždí na pozvání kreativních šéfkuchařů Ambiente, aby zprostředkoval interní vzdělávací workshop a moderovanou besedu pro veřejnost. Rozhodl se však zůstat déle, a tak vznikla příležitost, aby se podělil o své zkušenosti prostřednictvím tohoto pop-upu.",
    footerCredit: "Za pop-upem stojí lidé z Ambiente",
  },
  en: {
    subtitle: "in Čestr",
    date: "26 March 2026, Čestr restaurant",
    description: "A multi-course Czech tasting menu reimagined by a Canadian chef",
    cta: "Make your reservation",
    ctaUrl: "#rezervace",
    about: "About Ron",
    aboutTitle: "Ron McKinlay",
    aboutText:
      "A Vancouver native, Ron discovered his passion for cooking early on, sparked by the Sunday roasts his mother prepared with loving care. He later embarked on an international journey spanning more than a decade: training under Michelin-starred **Tom Kitchin** in Edinburgh, perfecting his craft with **Scott Pickett** in Melbourne, and later steering the kitchen as executive chef at Toronto\u2019s **Canoe**.",
    aboutText2:
      "Ron is known for his discipline and deep respect for local ingredients. He is currently developing his own concept, training professionals and providing consulting for restaurants and brands.",
    aboutQuote:
      "\u201CMy mum had a garden in the backyard and still does. There was always something seasonal on the table. That foundation of honest, well-cooked food probably shaped me just as much as any classical training did.\u201D",
    menuTitle: "What you can look forward to",
    menuText:
      "Canadian chef Ron McKinlay will be preparing a **multi-course tasting menu** at Čestr, inspired by the Czech season. An experienced team of Ambiente chefs will be working alongside him.",
    menuText2:
      "Ingredients from local farmers, especially **lamb**, along with Ron\u2019s own recipes and his wealth of experience will be taking centre stage. Ron takes humble, everyday ingredients and transforms them into extraordinary creations through his finely honed **French techniques**.",
    menuText3:
      "Over the course of the evening, you will be able to delve into the menu\u2019s creation and its finer nuances, guided by the chef himself. The pop-up will be taking place at Čestr, a restaurant that champions honest local and seasonal ingredients sourced from trusted farmers. Meat from Czech producers is a house specialty, and the open kitchen and glass-walled butchery will give you a clear view of everything happening behind the scenes.",
    infoTitle: "Practical information",
    infoDate: "26 March, 5:00\u20139:00 PM",
    infoPlace: "Čestr restaurant, Prague",
    infoDiet:
      "The nature of the dinner and the fixed menu mean we are unable to offer a vegetarian or vegan option. If you have dietary restrictions or allergies, please contact us before making a reservation so we can verify what accommodations may be possible.",
    contextText:
      "Culinarily sophisticated Prague is appearing increasingly often on the radar of international chefs. Ron McKinlay is visiting at the invitation of Ambiente\u2019s creative chefs to lead an internal training workshop and a moderated public talk. He chose to extend his stay, creating the opportunity to share his experience through this pop-up.",
    footerCredit: "This pop-up is brought to you by the people at Ambiente",
  },
} as const

type LangContent = Record<string, string>
type SiteContent = { cs: LangContent; en: LangContent }
type Lang = "cs" | "en"

/** Renders text with **bold** markers as <strong> elements */
function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="text-inherit font-semibold">{part}</strong> : part
      )}
    </p>
  )
}

function useSpinOnClick() {
  const [spinning, setSpinning] = useState<string | null>(null)
  const spin = useCallback((id: string) => {
    setSpinning(id)
    setTimeout(() => setSpinning(null), 600)
  }, [])
  return { spinning, spin }
}

function VideoPlayer({ src, lang }: { src: string; lang: Lang }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [ccOn, setCcOn] = useState(true)

  // Enable default subtitle track on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const initTracks = () => {
      const tracks = video.textTracks
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = tracks[i].language === lang ? "showing" : "hidden"
      }
    }
    if (video.textTracks.length > 0) {
      initTracks()
    } else {
      video.addEventListener("loadedmetadata", initTracks, { once: true })
    }
  }, [])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const toggleCC = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks
      const newCcOn = !ccOn
      setCcOn(newCcOn)
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = newCcOn && tracks[i].language === lang ? "showing" : "hidden"
      }
    }
  }

  // Switch active subtitle track when language changes
  useEffect(() => {
    if (!videoRef.current || !ccOn) return
    const tracks = videoRef.current.textTracks
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = tracks[i].language === lang ? "showing" : "hidden"
    }
  }, [lang, ccOn])

  const goFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if ((video as any).webkitEnterFullscreen) {
      // iOS Safari
      (video as any).webkitEnterFullscreen()
    }
  }

  const flashControls = () => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowControls(false), 1500)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setPaused(false)
      } else {
        videoRef.current.pause()
        setPaused(true)
      }
      flashControls()
    }
  }

  return (
    <div
      className="group relative w-56 md:w-64 lg:w-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      onClick={togglePlay}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="w-full h-auto"
      >
        <track kind="subtitles" src="/images/ron-qa-en.vtt" srcLang="en" label="English" />
        <track kind="subtitles" src="/images/ron-qa-cs.vtt" srcLang="cs" label="Česky" />
      </video>
      {/* Play/pause overlay */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200 ${paused || showControls ? "opacity-100" : "opacity-0"}`}>
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white">
          {paused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <rect x="5" y="3" width="5" height="18" rx="1" />
              <rect x="14" y="3" width="5" height="18" rx="1" />
            </svg>
          )}
        </div>
      </div>
      {/* Bottom controls */}
      <div className="absolute bottom-3 right-3 z-10 flex gap-2">
        {/* Fullscreen button — mobile only */}
        <button
          onClick={goFullscreen}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors cursor-pointer"
          aria-label="Fullscreen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
        {/* CC button */}
        <button
          onClick={toggleCC}
          className={`w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-sm text-white transition-colors cursor-pointer ${ccOn ? "bg-white/80 text-black" : "bg-black/40 hover:bg-black/60"}`}
          aria-label={ccOn ? "Disable subtitles" : "Enable subtitles"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="3" />
            <text x="12" y="15" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">CC</text>
          </svg>
        </button>
        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors cursor-pointer"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export function Hero({ content }: { content?: SiteContent | null }) {
  const [lang, setLang] = useState<Lang>("cs")
  const t = content ?? defaults
  const s = t[lang]
  const { spinning, spin } = useSpinOnClick()
  const sheepAudio = useRef<HTMLAudioElement | null>(null)
  useResourceDebug()

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
            <Image src="/images/new/CES_ron_mckinlay_pcs_08.webp" alt="" width={512} height={235} className="w-36 md:w-48 lg:w-64 h-auto" />
          </div>
          <div className="absolute top-[8%] left-[-3%] md:left-[6%] animate-cloud-float opacity-25" style={{ animationDelay: "8s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_08.webp" alt="" width={512} height={235} className="w-28 md:w-40 lg:w-52 h-auto scale-x-[-1]" />
          </div>
          <div className="absolute top-[5%] left-[30%] md:left-[38%] animate-cloud-float opacity-15" style={{ animationDelay: "4s" }}>
            <Image src="/images/new/CES_ron_mckinlay_pcs_08.webp" alt="" width={512} height={235} className="w-24 md:w-36 lg:w-44 h-auto" />
          </div>
        </div>

        {/* Ingredients — around the portrait */}
        <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
          {/* Onion — right */}
          <div className="pointer-events-auto absolute top-[30%] right-[8%] md:right-[-2%] lg:right-[8%] animate-drift-slow animate-fade-in-delay-2 cursor-pointer" style={{ animationDelay: "1s" }} onClick={() => handleImageClick("onion")}>
            <Image src="/images/new/cibule.webp" alt="" width={384} height={268} className={`w-32 md:w-40 lg:w-48 h-auto mix-blend-screen ${spinning === "onion" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Parsley — left, upper */}
          <div className="pointer-events-auto absolute top-[28%] left-[8%] md:left-[8%] lg:left-[14%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "2s" }} onClick={() => handleImageClick("parsley")}>
            <Image src="/images/new/petrzel.webp" alt="" width={288} height={232} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-multiply ${spinning === "parsley" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Fish — left, lower */}
          <div className="pointer-events-auto absolute top-[48%] left-[2%] md:left-[2%] lg:left-[10%] animate-drift-slow animate-fade-in-delay-4 cursor-pointer" style={{ animationDelay: "4s" }} onClick={() => handleImageClick("fish")}>
            <Image src="/images/new/ryba.webp" alt="" width={448} height={243} className={`w-36 md:w-48 lg:w-56 h-auto mix-blend-screen ${spinning === "fish" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Knife — right, mid-lower */}
          <div className="pointer-events-auto absolute top-[42%] right-[5%] md:right-[4%] lg:right-[12%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "3s" }} onClick={() => handleImageClick("knife")}>
            <Image src="/images/new/kejta.webp" alt="" width={288} height={769} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-multiply ${spinning === "knife" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Lamb — lower left */}
          <div className="pointer-events-auto absolute bottom-[12%] left-[5%] md:left-[6%] lg:left-[14%] animate-drift animate-fade-in-delay-4 cursor-pointer" onClick={() => handleImageClick("lamb", true)}>
            <Image src="/images/new/jehnecihrebinek.webp" alt="" width={320} height={388} className={`w-28 md:w-32 lg:w-40 h-auto mix-blend-screen ${spinning === "lamb" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Topinambur — lower right */}
          <div className="pointer-events-auto absolute bottom-[14%] right-[8%] md:right-[6%] lg:right-[14%] animate-drift-slow animate-fade-in-delay-4 cursor-pointer" onClick={() => handleImageClick("topinambur")}>
            <Image src="/images/new/topinambur.webp" alt="" width={224} height={132} className={`w-20 md:w-24 lg:w-28 h-auto mix-blend-multiply ${spinning === "topinambur" ? "animate-spin-once" : ""}`} />
          </div>
          {/* Celery — top left */}
          <div className="pointer-events-auto absolute top-[18%] left-[3%] md:left-[4%] lg:left-[8%] animate-drift animate-fade-in-delay-3 cursor-pointer" style={{ animationDelay: "5s" }} onClick={() => handleImageClick("celer")}>
            <Image src="/images/new/celer.webp" alt="" width={288} height={287} className={`w-24 md:w-28 lg:w-36 h-auto mix-blend-screen ${spinning === "celer" ? "animate-spin-once" : ""}`} />
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
              src="/images/new/ron.webp"
              alt="Ron McKinlay"
              width={640}
              height={912}
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
            <blockquote className="mt-6 md:mt-8 pl-5 md:pl-6 border-l-3 border-accent/50">
              <p className="text-accent italic text-[17px] md:text-[21px] lg:text-[24px] leading-[1.6] font-serif">
                {s.aboutQuote}
              </p>
            </blockquote>
            <div className="mt-6 md:mt-8 flex flex-col gap-4">
              <RichText text={s.aboutText} className="text-[13px] md:text-[15px] leading-[1.9] text-foreground/60 font-sans" />
              <RichText text={s.aboutText2} className="text-[13px] md:text-[15px] leading-[1.9] text-foreground/60 font-sans" />
            </div>
          </div>

          {/* Right column — video mini-player */}
          <div className="flex justify-center">
            <VideoPlayer src="/images/ron-qa.mp4" lang={lang} />
          </div>
        </div>
      </section>

      {/* ── Menu / Event section ── */}
      <section className="relative px-5 py-16 md:px-10 md:py-24 lg:px-16 lg:py-32 bg-[#1e3a6e] text-[#f3efe6]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left column — text */}
          <div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight">
              {s.menuTitle}
            </h2>
            <div className="mt-8 md:mt-12 flex flex-col gap-6 text-[13px] md:text-[15px] leading-[1.9] font-sans text-[#f3efe6]/70">
              <RichText text={s.menuText} />
              <RichText text={s.menuText2} />
              <RichText text={s.menuText3} />
            </div>
          </div>
          {/* Right column — lamb image */}
          <div className="hidden md:flex justify-center">
            <Image
              src="/images/new/kejta.webp"
              alt=""
              width={288}
              height={769}
              className="w-56 md:w-64 lg:w-72 h-auto"
            />
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

          <div className="mt-8 md:mt-10 flex justify-center">
            <a
              href={s.ctaUrl ?? "#rezervace"}
              className="px-10 py-3.5 bg-[#1e3a6e] text-background border border-[#1e3a6e] hover:bg-transparent hover:text-[#1e3a6e] transition-colors duration-300 font-sans text-[11px] md:text-[12px] tracking-[0.15em] uppercase"
            >
              {s.cta}
            </a>
          </div>

          <p className="mt-8 md:mt-10 text-[12px] md:text-[13px] leading-[1.8] text-foreground/40 font-sans text-center">
            {s.infoDiet}
          </p>

          <p className="mt-6 text-[11px] md:text-[12px] leading-[1.8] text-foreground/25 font-sans italic text-center">
            {s.contextText}
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-5 py-10 md:px-10 md:py-14 lg:px-16 border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center">
          {/* Ambiente — last on mobile, first on desktop */}
          <div className="flex flex-col items-center gap-2.5 order-last sm:order-first">
            <Image
              src="/images/ambiente_logo.webp"
              alt="Ambiente"
              width={40}
              height={40}
              className="w-7 h-7 opacity-40"
            />
            <p className="text-[11px] md:text-[12px] font-sans text-foreground/35 leading-relaxed">
              {s.footerCredit}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-2.5">
            <Image
              src="/images/logo.webp"
              alt="Čestr"
              width={80}
              height={40}
              className="w-7 h-auto opacity-30"
            />
            <div className="flex flex-col gap-1 text-[11px] md:text-[12px] font-sans text-foreground/40">
              <span className="text-foreground/55">Restaurace Čestr</span>
              <a href="mailto:cestr@ambi.cz" className="hover:text-[#1e3a6e] transition-colors">cestr@ambi.cz</a>
              <a href="tel:+420739266287" className="hover:text-[#1e3a6e] transition-colors">+420 739 266 287</a>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/30">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <a
              href="https://www.instagram.com/restaurace_cestr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] md:text-[12px] font-sans text-foreground/40 hover:text-[#1e3a6e] transition-colors"
            >
              @restaurace_cestr
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
