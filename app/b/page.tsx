'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://vxpvgeyktgyasegvycfp.supabase.co",
  "sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w"
)

// ──────────────────────── COUNTRIES LIST ────────────────────────
const countries = [
  { name: "O'zbekiston", code: "+998", flag: "🇺🇿", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Qozog'iston", code: "+7", flag: "🇰🇿", placeholder: "000 000 00 00", minLength: 10 },
  { name: "Rossiya", code: "+7", flag: "🇷🇺", placeholder: "000 000 00 00", minLength: 10 },
  { name: "AQSH", code: "+1", flag: "🇺🇸", placeholder: "000 000 0000", minLength: 10 },
  { name: "Kanada", code: "+1", flag: "🇨🇦", placeholder: "000 000 0000", minLength: 10 },
  { name: "Buyuk Britaniya", code: "+44", flag: "🇬🇧", placeholder: "0000 000000", minLength: 10 },
  { name: "Germaniya", code: "+49", flag: "🇩🇪", placeholder: "000 00000000", minLength: 10 },
  { name: "Fransiya", code: "+33", flag: "🇫🇷", placeholder: "0 00 00 00 00", minLength: 9 },
  { name: "Turkiya", code: "+90", flag: "🇹🇷", placeholder: "000 000 00 00", minLength: 10 },
  { name: "Ozarbayjon", code: "+994", flag: "🇦🇿", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Qirg'iziston", code: "+996", flag: "🇰🇬", placeholder: "000 000 000", minLength: 9 },
  { name: "Tojikiston", code: "+992", flag: "🇹🇯", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Turkmaniston", code: "+993", flag: "🇹🇲", placeholder: "00 000 00 00", minLength: 8 },
  { name: "Ukraina", code: "+380", flag: "🇺🇦", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Belarus", code: "+375", flag: "🇧🇾", placeholder: "00 000 00 00", minLength: 9 },
  { name: "BAA", code: "+971", flag: "🇦🇪", placeholder: "00 000 0000", minLength: 9 },
  { name: "Saudiya Arabistoni", code: "+966", flag: "🇸🇦", placeholder: "00 000 0000", minLength: 9 },
  { name: "Janubiy Koreya", code: "+82", flag: "🇰🇷", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Yaponiya", code: "+81", flag: "🇯🇵", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Xitoy", code: "+86", flag: "🇨🇳", placeholder: "000 0000 0000", minLength: 11 },
  { name: "Hindiston", code: "+91", flag: "🇮🇳", placeholder: "00000 00000", minLength: 10 },
  { name: "Pokiston", code: "+92", flag: "🇵🇰", placeholder: "000 00000 00", minLength: 10 },
  { name: "Indoneziya", code: "+62", flag: "🇮🇩", placeholder: "000 0000 0000", minLength: 10 },
  { name: "Malayziya", code: "+60", flag: "🇲🇾", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Misr", code: "+20", flag: "🇪🇬", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Nigeriya", code: "+234", flag: "🇳🇬", placeholder: "000 000 0000", minLength: 10 },
  { name: "Janubiy Afrika", code: "+27", flag: "🇿🇦", placeholder: "00 000 0000", minLength: 9 },
  { name: "Braziliya", code: "+55", flag: "🇧🇷", placeholder: "00 00000 0000", minLength: 10 },
  { name: "Meksika", code: "+52", flag: "🇲🇽", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Avstraliya", code: "+61", flag: "🇦🇺", placeholder: "0 0000 0000", minLength: 9 },
  { name: "Italiya", code: "+39", flag: "🇮🇹", placeholder: "000 000 0000", minLength: 10 },
  { name: "Ispaniya", code: "+34", flag: "🇪🇸", placeholder: "000 000 000", minLength: 9 },
  { name: "Polsha", code: "+48", flag: "🇵🇱", placeholder: "000 000 000", minLength: 9 },
  { name: "Niderlandiya", code: "+31", flag: "🇳🇱", placeholder: "0 000 0000", minLength: 9 },
  { name: "Shvetsiya", code: "+46", flag: "🇸🇪", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Norvegiya", code: "+47", flag: "🇳🇴", placeholder: "000 00 000", minLength: 8 },
  { name: "Daniya", code: "+45", flag: "🇩🇰", placeholder: "00 00 00 00", minLength: 8 },
  { name: "Finlyandiya", code: "+358", flag: "🇫🇮", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Shveytsariya", code: "+41", flag: "🇨🇭", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Avstriya", code: "+43", flag: "🇦🇹", placeholder: "000 000 0000", minLength: 10 },
  { name: "Gretsiya", code: "+30", flag: "🇬🇷", placeholder: "000 000 0000", minLength: 10 },
  { name: "Chexiya", code: "+420", flag: "🇨🇿", placeholder: "000 000 000", minLength: 9 },
  { name: "Ruminiya", code: "+40", flag: "🇷🇴", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Vengriya", code: "+36", flag: "🇭🇺", placeholder: "00 000 0000", minLength: 9 },
  { name: "Portugaliya", code: "+351", flag: "🇵🇹", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Irlandiya", code: "+353", flag: "🇮🇪", placeholder: "00 000 0000", minLength: 9 },
  { name: "Belgiya", code: "+32", flag: "🇧🇪", placeholder: "000 00 00 00", minLength: 9 },
  { name: "Serbiya", code: "+381", flag: "🇷🇸", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Xorvatiya", code: "+385", flag: "🇭🇷", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Bolgariya", code: "+359", flag: "🇧🇬", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Gruziya", code: "+995", flag: "🇬🇪", placeholder: "000 00 00 00", minLength: 9 },
  { name: "Armaniston", code: "+374", flag: "🇦🇲", placeholder: "00 000 000", minLength: 8 },
  { name: "Moldova", code: "+373", flag: "🇲🇩", placeholder: "00 000 000", minLength: 8 },
  { name: "Litva", code: "+370", flag: "🇱🇹", placeholder: "000 00 000", minLength: 8 },
  { name: "Latviya", code: "+371", flag: "🇱🇻", placeholder: "00 000 000", minLength: 8 },
  { name: "Estoniya", code: "+372", flag: "🇪🇪", placeholder: "0000 0000", minLength: 8 },
  { name: "Islandiya", code: "+354", flag: "🇮🇸", placeholder: "000 0000", minLength: 7 },
  { name: "Kipr", code: "+357", flag: "🇨🇾", placeholder: "00 000 000", minLength: 8 },
  { name: "Malta", code: "+356", flag: "🇲🇹", placeholder: "0000 0000", minLength: 8 },
  { name: "Marokash", code: "+212", flag: "🇲🇦", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Tunis", code: "+216", flag: "🇹🇳", placeholder: "00 000 000", minLength: 8 },
  { name: "Iordaniya", code: "+962", flag: "🇯🇴", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Quvayt", code: "+965", flag: "🇰🇼", placeholder: "0000 0000", minLength: 8 },
  { name: "Qatar", code: "+974", flag: "🇶🇦", placeholder: "0000 0000", minLength: 8 },
  { name: "Ummon", code: "+968", flag: "🇴🇲", placeholder: "0000 0000", minLength: 8 },
  { name: "Bahrayn", code: "+973", flag: "🇧🇭", placeholder: "0000 0000", minLength: 8 },
  { name: "Iroq", code: "+964", flag: "🇮🇶", placeholder: "000 000 0000", minLength: 10 },
  { name: "Liviya", code: "+218", flag: "🇱🇾", placeholder: "00 000 0000", minLength: 9 },
  { name: "Jazoir", code: "+213", flag: "🇩🇿", placeholder: "00 00 00 00 00", minLength: 9 },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Shri-Lanka", code: "+94", flag: "🇱🇰", placeholder: "00 000 0000", minLength: 9 },
  { name: "Nepal", code: "+977", flag: "🇳🇵", placeholder: "00 000 0000", minLength: 10 },
  { name: "Myanma", code: "+95", flag: "🇲🇲", placeholder: "00 000 0000", minLength: 9 },
  { name: "Vetnam", code: "+84", flag: "🇻🇳", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Tailand", code: "+66", flag: "🇹🇭", placeholder: "00 000 0000", minLength: 9 },
  { name: "Filippin", code: "+63", flag: "🇵🇭", placeholder: "000 000 0000", minLength: 10 },
  { name: "Singapur", code: "+65", flag: "🇸🇬", placeholder: "0000 0000", minLength: 8 },
  { name: "Gonkong", code: "+852", flag: "🇭🇰", placeholder: "0000 0000", minLength: 8 },
  { name: "Tayvan", code: "+886", flag: "🇹🇼", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Yangi Zelandiya", code: "+64", flag: "🇳🇿", placeholder: "00 000 0000", minLength: 9 },
  { name: "Argentina", code: "+54", flag: "🇦🇷", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Chili", code: "+56", flag: "🇨🇱", placeholder: "0 0000 0000", minLength: 9 },
  { name: "Kolumbiya", code: "+57", flag: "🇨🇴", placeholder: "000 000 0000", minLength: 10 },
  { name: "Peru", code: "+51", flag: "🇵🇪", placeholder: "000 000 000", minLength: 9 },
  { name: "Ekvador", code: "+593", flag: "🇪🇨", placeholder: "00 000 0000", minLength: 9 },
]

export default function PageB() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [formState, setFormState] = useState<"idle" | "loading">("idle")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [timerDisplay, setTimerDisplay] = useState("02:00")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Country selector states & refs
  const [countryCode, setCountryCode] = useState("+998")
  const [countryName, setCountryName] = useState("O'zbekiston")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const countryButtonRef = useRef<HTMLButtonElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  const selectedCountry =
    countries.find((c) => c.code === countryCode && c.name === countryName) || countries[0]

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  )

  // ─── Click outside handler for country dropdown (within modal) ──────────
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node) &&
        countryButtonRef.current &&
        !countryButtonRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false)
        setCountrySearch("")
      }
    }
    if (showCountryDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  // ─── Escape key closes dropdown ───────────────────────────────────────
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && showCountryDropdown) {
        setShowCountryDropdown(false)
        setCountrySearch("")
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [showCountryDropdown])

  // ─── 2-daqiqalik looping timer ─────────────────────────────────────────
  useEffect(() => {
    let duration = 60 * 2
    timerRef.current = setInterval(() => {
      const minutes = Math.floor((duration % 3600) / 60)
      const seconds = duration % 60
      const mm = minutes < 10 ? "0" + minutes : String(minutes)
      const ss = seconds < 10 ? "0" + seconds : String(seconds)
      setTimerDisplay(mm + ":" + ss)
      if (--duration < 0) duration = 60 * 2
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  // ─── Scroll reveal ────────────────────────────────────────────────────
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible")
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) =>
      observerRef.current?.observe(el)
    )
    return () => observerRef.current?.disconnect()
  }, [])

  // ─── Body scroll lock ─────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [modalOpen])

  // ─── Mouse parallax blobs ─────────────────────────────────────────────
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      document.querySelectorAll<HTMLElement>(".blob").forEach((blob, i) => {
        const f = i % 2 === 0 ? 18 : -14
        blob.style.transform = `translate(${x * f}px,${y * f}px)`
      })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  // ─── Telefon formatlash (digits + spaces) ─────────────────────────────
  const handlePhone = (val: string) => {
    // Allow only digits, spaces and common separators, then let user format freely
    let v = val.replace(/[^\d\s]/g, "")
    setPhone(v)
  }

  // ─── Forma yuborish ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (name.trim().length < 2) {
      setError("Iltimos, to'liq ismingizni kiriting.")
      return
    }

    const phoneDigits = phone.replace(/\D/g, "")
    if (!phoneDigits || phoneDigits.length < (selectedCountry?.minLength || 7)) {
      setError("Iltimos, telefon raqamingizni to'g'ri kiriting.")
      return
    }

    setFormState("loading")

    try {
      const { error: sbError } = await supabase
        .from("leads")
        .insert([
          {
            full_name: name.trim(),
            phone_number: `${countryCode}${phoneDigits}`,
            type: "b",
            created_at: new Date().toISOString(),
          },
        ])

      if (sbError) {
        setError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
        setFormState("idle")
        return
      }

      router.push("/thank-you")
    } catch (err) {
      console.error("Submission error:", err)
      setError("Server bilan bog'liq xatolik. Iltimos, keyinroq urinib ko'ring.")
      setFormState("idle")
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setShowCountryDropdown(false)
    setCountrySearch("")
    setTimeout(() => {
      setFormState("idle")
      setName("")
      setPhone("")
      setError("")
      setCountryCode("+998")
      setCountryName("O'zbekiston")
    }, 350)
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:none} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes glowBlink{ 0%,100%{opacity:0.45} 50%{opacity:1} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(0.82)} to{opacity:1;transform:scale(1)} }
        @keyframes slideDown{ from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:none} }
        @keyframes timerPulse{ 0%,100%{text-shadow:0 0 8px rgba(239,68,68,0.4)} 50%{text-shadow:0 0 22px rgba(239,68,68,0.9)} }

        .reveal      { opacity:0;transform:translateY(36px);transition:opacity 0.7s ease,transform 0.7s ease }
        .reveal-left { opacity:0;transform:translateX(-36px);transition:opacity 0.65s ease,transform 0.65s ease }
        .reveal-right{ opacity:0;transform:translateX(36px);transition:opacity 0.65s ease,transform 0.65s ease }
        .reveal.is-visible,.reveal-left.is-visible,.reveal-right.is-visible{ opacity:1;transform:none }

        .anim-badge { animation:slideDown 0.6s 0.1s ease both }
        .anim-sub   { animation:fadeUp   0.7s 0.25s ease both }
        .anim-timer { animation:fadeUp   0.7s 0.35s ease both }
        .anim-cta   { animation:fadeUp   0.6s 0.8s  ease both }
        .anim-img   { animation:fadeIn   1s   0.2s  ease both }

        .blink-blob { animation:glowBlink 3.5s ease-in-out infinite }

        .timer-num  { animation:timerPulse 2s ease-in-out infinite }

        .btn-red {
          position:relative;
          display:inline-flex;align-items:center;justify-content:center;
          width:100%;
          background:linear-gradient(180deg,#ef4444 0%,#dc2626 45%,#b91c1c 100%);
          color:#fff;font-weight:800;letter-spacing:.09em;
          border-radius:12px;border:none;cursor:pointer;
          box-shadow:0 8px 0 #610a0a,0 0 60px rgba(234,43,43,0.35);
          transition:all .1s ease;
          padding:20px 32px;font-size:16px;
        }
        .btn-red::before{
          content:'';position:absolute;inset-x:0;top:0;height:48%;
          background:linear-gradient(to bottom,rgba(255,255,255,.2),transparent);
          border-radius:12px 12px 0 0;
        }
        .btn-red:hover{ box-shadow:0 8px 0 #610a0a,0 0 100px rgba(234,43,43,0.65); }
        .btn-red:active{ transform:translateY(5px);box-shadow:0 2px 0 #610a0a; }
        .btn-red:disabled{ opacity:.65;cursor:not-allowed; }

        /* Country dropdown custom styles */
        .country-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          top: calc(100% + 4px);
          background: #1a1a1a;
          border: 1px solid rgba(234,67,67,0.3);
          border-radius: 12px;
          z-index: 60;
          max-height: 280px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        }
        .country-dropdown input {
          background: #2a2a2a;
          border: 1px solid #3a3a3a;
          color: #ddd;
          border-radius: 8px;
          padding: 8px 10px 8px 34px;
          font-size: 13px;
        }
        .country-dropdown input::placeholder {
          color: #777;
        }
        .country-dropdown .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          width: 16px;
          height: 16px;
        }
        .country-option {
          width: 100%;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: #ddd;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .country-option:hover {
          background: rgba(234,67,67,0.15);
        }
        .country-option.selected {
          background: rgba(234,67,67,0.25);
          font-weight: 700;
        }
      `}</style>

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 72% 48%, rgba(40,2,2,.98) 0%, #050505 68%)" }}
      >
        {/* Ambient blobs */}
        <div className="blob blink-blob absolute w-[580px] h-[540px] right-[-130px] top-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(234,43,43,.38) 0%,transparent 70%)" }} />
        <div className="blob blink-blob absolute w-[380px] h-[380px] left-[-110px] bottom-[80px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(234,43,43,.18) 0%,transparent 70%)", animationDelay: "1.6s" }} />
        <div className="blob blink-blob absolute w-[240px] h-[240px] right-[28%] top-[10%] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,190,190,.1) 0%,transparent 70%)", animationDelay: ".9s" }} />

        <div className="relative z-[2] w-full max-w-[1200px] px-5">

          {/* Date badge */}
          <div className="flex justify-center pt-11 anim-badge -mt-5">
            <div className="inline-flex items-center justify-center border-[1.5px] border-red-600 rounded-full bg-red-600/10 backdrop-blur-md px-[26px] py-[9px]">
              <span className="text-[13px] tracking-[.05em] text-white font-medium">
                8-9-10 May &nbsp;|&nbsp; Soat 20:00 da
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="anim-sub text-center mt-4 text-[13px] font-medium text-white/60 tracking-[.04em]">
            Iman Akhmedovna bilan 3 kunlik&nbsp;
            <span className="text-red-600 font-bold">BEPUL</span>
            &nbsp;marafon
          </p>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center -mt-0">
            {/* LEFT column */}
            <div>
              <p className="text-[22px] text-center font-bold leading-[1.65] text-white mb-7">
                Duo ijobati orqali, qarz va kreditlardan halos bo'lishni 3 ta yo'li
              </p>

              {/* Speaker image */}
              <div className="anim-img flex justify-center items-end relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[240px] bg-red-600/60 blur-[44px] z-0" />
                <img
                  src="./22.png"
                  alt="Speaker"
                  className="relative z-[1] max-w-full max-h-[320px] object-contain"
                />
              </div>

              {/* CTA */}
              <div className="anim-cta -mt-1">
                <button className="btn-red" onClick={() => setModalOpen(true)}>
                  RO&apos;YXATDAN O&apos;TISH
                </button>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <img
                    src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
                    alt="arrow"
                    className="w-12 invert"
                  />
                  <span className="text-4xl font-extrabold text-white">BEPUL</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block" />
          </div>
        </div>

        <br />
        {/* Timer */}
        <div className="flex items-center gap-5 bg-white/5 border border-red-600/30 rounded-4xl px-6 py-4 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-white/40 uppercase tracking-widest mb-1"> Ro`yxatdan o`tish tugashiga</span>
            <span className="timer-num text-5xl font-black text-red-500 font-mono tracking-[4px]">
              {timerDisplay}
            </span>
          </div>
        </div>

        {/* Benefits list */}
        <div className="w-full max-w-[513px] px-5 mx-auto mb-8 mt-8">
          <p className="text-[20px] font-bold mb-5 text-white text-center">Marafonda siz:</p>
          {[
            "Qanday qilib psihologik tomondan o'zingizni RAT holatiga keltirib duolaringiz ijobat bo'lish usulini",
            "Qanday qilib 3 ta yo'l orqali qarzdorlikdan chiqib, moliyaviy erkinlikka chiqish yo'llarini",
            "Ong osti psixologik bloklarni yengib, 2026 yil moliyaviy erkinlikka chiqishni usullarini",
            "Qanday qilib yetishmovchilik dasturini to'g'ri prorobotka qilib, doimiy yetishmovchiliklardan halos bo'lish yo'llarini o'rganasiz",
          ].map((text, idx) => (
            <div key={idx} className="flex gap-3 mb-4 last:mb-0">
              <img
                src="https://optim.tildacdn.one/tild3534-6335-4562-b366-386462303035/-/resize/70x/-/format/webp/Ellipse_163.png.webp"
                alt="icon"
                className="w-6 h-5 mt-0.5 flex-shrink-0"
              />
              <p className="text-[13px] font-light text-white leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Second CTA */}
        <div className="w-full max-w-[513px] px-5 mx-auto mb-12">
          <button className="btn-red" onClick={() => setModalOpen(true)}>
            RO&apos;YXATDAN O&apos;TISH
          </button>
          <div className="flex items-center justify-center gap-3 mt-3">
            <img
              src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
              alt="arrow"
              className="w-12 invert"
            />
            <span className="text-4xl font-extrabold text-white">BEPUL</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-gradient-to-b from-[#0c0c0c] to-[#050505] border-t border-red-600/20 py-[52px] px-5">
        <div className="max-w-[580px] mx-auto text-center">
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-[11px] text-white/20 leading-[1.65]">
              This site or product is not part of or endorsed by Facebook, Google, or any social media platform in any way.
              FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc.
            </p>
          </div>
          <p className="mt-6 text-[11px] text-white/20">Barcha huquqlar himoyalangan, 2026.</p>
        </div>
      </footer>

      {/* ════════════════════════════════════════
          MODAL with country selector
      ════════════════════════════════════════ */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-5"
          style={{ animation: "fadeIn 0.28s ease" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div
            className="relative w-full max-w-[440px] bg-gradient-to-br from-[#1c1c1c] to-[#111] border border-red-600/30 rounded-3xl shadow-[0_0_80px_rgba(234,43,43,0.22),0_40px_80px_rgba(0,0,0,0.6)]"
            style={{ padding: "40px 34px", animation: "scaleIn 0.38s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            {/* Inner glow */}
            <div className="absolute -top-[50px] -right-[50px] w-[220px] h-[220px] bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 border-none cursor-pointer text-white text-lg flex items-center justify-center hover:bg-red-600/30 transition-colors z-10"
            >
              ✕
            </button>

            <h2 className="text-[1.1rem] font-bold text-white text-center mb-1.5 leading-[1.4]">
              Ro&apos;yxatdan o&apos;tish
            </h2>
            <p className="text-[13px] text-white/40 text-center mb-7">
              Ma&apos;lumotlaringizni kiriting!
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Ism */}
              <div>
                <label className="block text-[13px] text-white/60 font-medium mb-2">Ismingiz</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-[14px] px-[18px] text-white placeholder:text-white/30 outline-none focus:border-red-600 transition-all"
                  placeholder="Ism Familiya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  disabled={formState === "loading"}
                />
              </div>

              {/* Telefon with country selector */}
              <div>
                <label className="block text-[13px] text-white/60 font-medium mb-2">Telefon raqamingiz</label>
                <div className="flex items-stretch bg-white/10 border border-white/20 rounded-xl overflow-visible focus-within:border-red-600 transition-all relative">
                  {/* Country trigger button */}
                  <button
                    ref={countryButtonRef}
                    type="button"
                    onClick={() => {
                      setShowCountryDropdown(prev => !prev)
                      setCountrySearch("")
                    }}
                    disabled={formState === "loading"}
                    className="flex items-center gap-1.5 px-3 py-[13px] bg-white/5 border-r border-white/10 text-white text-sm font-semibold hover:bg-red-600/20 transition rounded-l-xl shrink-0"
                  >
                    <span className="text-lg leading-none">{selectedCountry?.flag}</span>
                    <span>{selectedCountry?.code}</span>
                    <svg className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Phone input */}
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    className="flex-1 bg-transparent border-none py-[13px] px-3 text-white placeholder:text-white/30 outline-none min-w-0 rounded-r-xl"
                    placeholder={selectedCountry?.placeholder || "00 000 00 00"}
                    value={phone}
                    onChange={(e) => handlePhone(e.target.value)}
                    maxLength={16}
                    disabled={formState === "loading"}
                  />
                </div>

                {/* Country dropdown */}
                {showCountryDropdown && (
                  <div ref={countryDropdownRef} className="country-dropdown">
                    <div className="p-2 border-b border-white/10 sticky top-0 bg-[#1a1a1a] z-10 relative">
                      <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Davlatni qidirish..."
                        autoFocus
                      />
                    </div>
                    <div className="overflow-y-auto max-h-52">
                      {filteredCountries.map((c, idx) => (
                        <button
                          key={`${c.code}-${c.name}-${idx}`}
                          type="button"
                          onClick={() => {
                            setCountryCode(c.code)
                            setCountryName(c.name)
                            setShowCountryDropdown(false)
                            setCountrySearch("")
                            setTimeout(() => phoneInputRef.current?.focus(), 100)
                          }}
                          className={`country-option ${(c.code === countryCode && c.name === countryName) ? 'selected' : ''}`}
                        >
                          <span className="text-xl">{c.flag}</span>
                          <span className="flex-1 text-left text-[13px]">{c.name}</span>
                          <span className="text-white/40 text-xs">{c.code}</span>
                        </button>
                      ))}
                      {filteredCountries.length === 0 && (
                        <p className="text-center text-white/40 py-6 text-sm">😔 Davlat topilmadi</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Phone hint */}
                <p className="text-[11px] text-white/20 mt-1.5">
                  Namuna: {selectedCountry?.code} {selectedCountry?.placeholder}
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-600/20 border border-red-600/50 rounded-xl py-[10px] px-[14px] text-[13px] text-red-300">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "loading"}
                className="btn-red mt-1"
                style={{ padding: "18px 32px" }}
              >
                {formState === "loading" ? "Yuborilmoqda..." : "DAVOM ETISH"}
              </button>

              <p className="text-[11px] text-white/20 text-center leading-[1.55]">
                Ma&apos;lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi.
              </p>
            </form>
          </div>
        </div>
      )}
      <script async src="https://spliturltest.asosit.uz/abtest.js" data-site-id="s1JyprFIVWNXo-WI" data-api-base="https://spliturltest.asosit.uz"></script>
    </>
  )
}