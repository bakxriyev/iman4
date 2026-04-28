'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  "https://vxpvgeyktgyasegvycfp.supabase.co",
  "sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w"
)

// ======================= COUNTRIES LIST =======================
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

export default function SiteA() {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [timerDisplay, setTimerDisplay] = useState('02:00')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+998',
    countryName: "O'zbekiston",
  })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const countryButtonRef = useRef<HTMLButtonElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Get selected country info
  const selectedCountry =
    countries.find(
      (c) => c.code === formData.countryCode && c.name === formData.countryName
    ) || countries[0]

  // Filter countries based on search
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  )

  // Click outside handler for country dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node) &&
        countryButtonRef.current &&
        !countryButtonRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false)
        setCountrySearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Escape key to close dropdown
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && showCountryDropdown) {
        setShowCountryDropdown(false)
        setCountrySearch('')
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showCountryDropdown])

  useEffect(() => {
    let duration = 60 * 2 // 2 minutes
    timerRef.current = setInterval(() => {
      const minutes = Math.floor((duration % 3600) / 60)
      const seconds = duration % 60
      const mm = minutes < 10 ? '0' + minutes : String(minutes)
      const ss = seconds < 10 ? '0' + seconds : String(seconds)
      setTimerDisplay(mm + ':' + ss)
      if (--duration < 0) duration = 60 * 2
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      setFormError('Ismingizni kiriting!')
      return
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!phoneDigits || phoneDigits.length < (selectedCountry?.minLength || 7)) {
      setFormError('Telefon raqamingizni to\'g\'ri kiriting!')
      return
    }

    setFormError('')
    setIsSubmitting(true)

    try {
      // Insert into 'leads' table with correct column names
      const { error } = await supabase.from('leads').insert([
        {
          full_name: formData.name.trim(),
          phone_number: `${formData.countryCode}${phoneDigits}`,
          type: 'a', // Fixed type for /a page
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        setFormError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.')
        setIsSubmitting(false)
        return
      }

      // Success: redirect to thank-you page
      router.push('/thank-you')
    } catch (err) {
      console.error('Submission error:', err)
      setFormError('Server bilan bog‘liq xatolik. Iltimos, keyinroq urinib ko‘ring.')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="min-h-[760px] flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10 md:px-8"
        style={{
          backgroundImage: `url('https://static.tildacdn.one/tild6462-6430-4235-b135-383431393738/desktop_3_1.svg')`,
        }}
      >
        <div className="max-w-7xl w-full mx-auto">
          {/* ========== MOBILE VERSION (exactly as original) ========== */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-0">
              <div className="flex flex-col items-center text-center">
                <span className="inline-block border -mt-9 border-red-600 rounded-full px-3 py-1.5 text-xs font-medium text-black mb-4 order-1">
                  8-9-10 may | Soat 20:00 da
                </span>
                <p className="text-xs font-light text-black mb-2 order-2">
                  Iman Akhmedovnadan 3 kunlik bepul onlayn dars
                </p>
                <h2 className="text-[20px] font-bold text-black leading-tight mb-6 order-4">
                  <span className="text-red-700">Top-5 ta</span><span> texnika:</span>
                  Qanday qilib chala qolgan ishlarni <span className="text-red-700">100% </span>natija bilan yakunlash mumkin?
                </h2>
                <div className="flex justify-center items-end pt-0 order-5 md:order-1 -mt-5">
                  <img
                    src="./aa.png"
                    alt="Iman Akhmedovna"
                    className="w-full max-w-[250px] h-auto mx-auto"
                  />
                </div>
                <div className="w-full max-w-[340px] mx-auto order-6 -mt-12 mb-8">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-red-600 text-white font-extrabold text-xs tracking-wider uppercase py-4 px-5 rounded-xl shadow-[0_6px_0_#8b0e0e] active:shadow-[0_2px_0_#8b0e0e] active:translate-y-1 transition-all duration-100 hover:bg-red-700"
                  >
                    RO‘YXATDAN O‘TISH
                  </button>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <img
                      src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
                      alt="arrow"
                      className="w-12 transition-transform duration-200 hover:translate-x-1"
                    />
                    <span className="text-4xl font-extrabold text-black">BEPUL</span>
                  </div>
                  <div className="w-full text-center bg-black/4 mt-4 rounded-2xl py-3 px-2 order-9">
                    <span className="text-2xl font-extrabold text-black">{timerDisplay}</span>
                  </div>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-3xl p-5 w-full max-w-[513px] mx-auto mb-8 order-7 text-left">
                  <p className="text-sm font-bold mb-4 text-black text-center">
                    Marafonda siz:
                  </p>

                  {[
                    'Qanday qilib Ichki "tormozlar" va psixologik bloklar diagnostikasini yechish orqali Energiyangizni so‘rayotgan "ochiq fayllar" (tugallanmagan ishlar) ro‘yxatini tuzish va ularni saralashni',
                    '"Minimal qadam" texnikasi orqali eng qiyin vazifani muzlatilgan joyidan qo‘zg‘atishni',
                    'Erkakcha "shunqorlik" emas, balki ayollik energiyasini saqlagan holda maqsadga erishishni',
                    'Yakuniy finish va "G\'oliblik" strategiyasini mustahkamlashni ko\'rib chiqamiz',
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3 mb-4 last:mb-0 w-full">
                      <img
                        src="https://optim.tildacdn.one/tild3534-6335-4562-b366-386462303035/-/resize/70x/-/format/webp/Ellipse_163.png.webp"
                        alt="icon"
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                      />

                      <p
                        className="text-xs font-bold text-black leading-relaxed text-left w-full"
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    </div>
                  ))}
                </div>
                <div className="w-full max-w-[340px] mx-auto order-8 mb-8">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-red-600 text-white font-extrabold text-xs tracking-wider uppercase py-4 px-5 rounded-xl shadow-[0_6px_0_#8b0e0e] active:shadow-[0_2px_0_#8b0e0e] active:translate-y-1 transition-all duration-100 hover:bg-red-700"
                  >
                    RO‘YXATDAN O‘TISH
                  </button>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <img
                      src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
                      alt="arrow"
                      className="w-12 transition-transform duration-200 hover:translate-x-1"
                    />
                    <span className="text-4xl font-extrabold text-black">BEPUL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== DESKTOP VERSION ========== */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div className="relative flex justify-center">
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent rounded-full blur-3xl"></div>
                  <img
                    src="./a2.png"
                    alt="Iman Akhmedovna"
                    className="w-full max-w-[520px] h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-red-100 rounded-full blur-2xl opacity-40 -z-0"></div>
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-amber-100 rounded-full blur-2xl opacity-30 -z-0"></div>
              </div>
              <div className="flex flex-col items-start space-y-6">
                <span className="inline-block border-2 border-red-600 rounded-full px-4 py-1.5 text-sm font-semibold text-black bg-white/50 backdrop-blur-sm shadow-sm">
                  🔥 1-2-3 may | Soat 20:00 da
                </span>
                <p className="text-base font-medium text-black/80 tracking-wide">
                  Iman Akhmedovnadan 3 kunlik bepul onlayn dars
                </p>
                <h1 className="text-5xl font-black text-black leading-tight">QANDAY QILIB ... 2026</h1>
                <h2 className="text-2xl font-bold text-black leading-snug">
                  Qanday qilib <span className="text-red-600 underline decoration-wavy">yangi yilda</span> zararli odatlardan
                  qutilish va o‘z maqsadingizga intizom bilan erishish mumkin?
                </h2>
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 w-full shadow-xl text-left">
                  <p className="text-lg font-bold mb-5 text-black flex gap-2 items-center">
                    <span className="text-red-600 text-2xl">✦</span>
                    Marafonda siz:
                  </p>

                  <div className="space-y-4">
                    {[
                      'Qanday qilib <strong class="text-red-700">2026 yil uchun</strong> to‘g‘ri va aniq maqsad qo‘yishning yangi usulini',
                      'Qanday qilib dangasalikni yengib, <strong class="text-red-700">istalgan maqsadga kuchli intizom bilan erishish</strong> qadamlarini',
                      '<strong class="text-red-700">2026-yilda</strong> yaxshi odatlarni shakllantirib, istalgan ko‘nikmani <strong class="text-red-700">10 baravar tezroq o‘rganish</strong> usullarini',
                    ].map((text, idx) => (
                      <div key={idx} className="flex gap-3 items-start w-full">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <img
                            src="https://optim.tildacdn.one/tild3534-6335-4562-b366-386462303035/-/resize/70x/-/format/webp/Ellipse_163.png.webp"
                            alt="icon"
                            className="w-4 h-4"
                          />
                        </div>

                        <p
                          className="text-sm font-medium text-gray-800 leading-relaxed text-left w-full"
                          dangerouslySetInnerHTML={{ __html: text }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl py-4 px-6 flex items-center justify-between shadow-inner">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Aktsiya tugashiga:</span>
                  <span className="text-5xl font-black text-red-600 font-mono tracking-wider bg-white px-6 py-2 rounded-lg shadow-md">{timerDisplay}</span>
                </div>
                <div className="w-full space-y-4 pt-2">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-red-600 text-white font-extrabold text-base tracking-wider uppercase py-5 rounded-xl shadow-[0_8px_0_#8b0e0e] hover:shadow-[0_4px_0_#8b0e0e] hover:translate-y-1 transition-all duration-150 hover:bg-red-700 flex items-center justify-center gap-3 group"
                  >
                    RO‘YXATDAN O‘TISH
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                  <div className="flex items-center justify-end gap-4">
                    <img
                      src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
                      alt="arrow"
                      className="w-16 transition-transform duration-200 hover:translate-x-2"
                    />
                    <div className="flex items-baseline gap-1 bg-black/5 px-5 py-2 rounded-full">
                      <span className="text-2xl font-bold text-black">BEPUL</span>
                      <span className="text-xs text-gray-500">qatnashish</span>
                    </div>
                  </div>
                </div>
                <div className="w-full pt-2">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-white border-2 border-red-600 text-red-600 font-extrabold text-sm tracking-wider uppercase py-3 rounded-xl hover:bg-red-50 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Yana bir bor ro‘yxatdan o‘tish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg font-medium mb-2">Iman Akhmedovna</p>
          <p className="text-xs leading-relaxed mb-3">
            This site or product is not part of or endorsed by Facebook, Google, or any social media
            platform in any way FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE
            are trademarks of ALPHABET, Inc.
          </p>
          <p className="text-xs">Barcha huquqlar himoyalangan, 2025.</p>
        </div>
      </footer>

      {/* POPUP with Supabase integration and Country Selector */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPopup(false)
              setShowCountryDropdown(false)
              setCountrySearch('')
            }
          }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative animate-in fade-in zoom-in duration-300 overflow-visible">
            <button
              onClick={() => {
                setShowPopup(false)
                setShowCountryDropdown(false)
                setCountrySearch('')
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <h3 className="text-lg md:text-xl font-bold text-center mb-6 text-black">
              Ro‘yxatdan o‘tish uchun ma’lumotlaringizni kiriting!
            </h3>
            <form onSubmit={handleSubmit}>
              {/* Name input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">Ismingiz</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black focus:border-red-500 outline-none transition"
                  placeholder="Ismingiz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone input with country selector */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-black mb-1">Telefon raqamingiz</label>
                <div className="flex border border-gray-300 rounded-lg overflow-visible focus-within:border-red-500 transition">
                  {/* Country selector button */}
                  <button
                    ref={countryButtonRef}
                    type="button"
                    onClick={() => {
                      setShowCountryDropdown(!showCountryDropdown)
                      setCountrySearch('')
                    }}
                    className="bg-gray-100 px-2.5 py-2.5 text-black border-r border-gray-300 flex items-center gap-1 hover:bg-gray-200 transition min-w-[85px] justify-between rounded-l-lg flex-shrink-0"
                    disabled={isSubmitting}
                  >
                    <span className="text-lg leading-none">{selectedCountry?.flag}</span>
                    <span className="text-sm font-semibold">{selectedCountry?.code}</span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Phone number input */}
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    className="flex-1 px-3 py-2.5 text-black outline-none rounded-r-lg"
                    placeholder={selectedCountry?.placeholder || '00 000 00 00'}
                    value={formData.phone}
                    onChange={(e) => {
                      // Allow only digits and spaces
                      const val = e.target.value.replace(/[^\d\s]/g, '')
                      setFormData({ ...formData, phone: val })
                    }}
                    maxLength={16}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Country dropdown */}
                {showCountryDropdown && (
                  <div
                    ref={countryDropdownRef}
                    className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-xl shadow-2xl z-[60] max-h-72 overflow-hidden"
                  >
                    {/* Search input inside dropdown */}
                    <div className="p-2 border-b border-gray-200 sticky top-0 bg-white z-10">
                      <div className="relative">
                        <svg
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <input
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Davlatni qidirish..."
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-red-400 transition bg-gray-50"
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Country list */}
                    <div className="overflow-y-auto max-h-52">
                      {filteredCountries.map((country, idx) => {
                        const isSelected =
                          formData.countryCode === country.code &&
                          formData.countryName === country.name
                        return (
                          <button
                            key={`${country.code}-${country.name}-${idx}`}
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                countryCode: country.code,
                                countryName: country.name,
                              })
                              setShowCountryDropdown(false)
                              setCountrySearch('')
                              // Focus back on phone input
                              setTimeout(() => phoneInputRef.current?.focus(), 100)
                            }}
                            className={`w-full px-3 py-2.5 text-left flex items-center gap-3 hover:bg-red-50 transition text-sm border-b border-gray-100 last:border-b-0 ${
                              isSelected ? 'bg-red-100 font-bold' : ''
                            }`}
                          >
                            <span className="text-xl leading-none flex-shrink-0">{country.flag}</span>
                            <span className="flex-1 text-black text-xs sm:text-sm leading-tight">
                              {country.name}
                            </span>
                            <span className="text-gray-500 text-xs flex-shrink-0">{country.code}</span>
                          </button>
                        )
                      })}
                      {filteredCountries.length === 0 && (
                        <p className="text-center text-gray-500 py-6 text-sm">
                          😔 Davlat topilmadi
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone hint */}
              <p className="text-xs text-gray-400 -mt-2 mb-4">
                Namuna: {selectedCountry?.code} {selectedCountry?.placeholder}
              </p>

              {formError && (
                <p className="text-red-600 text-sm text-center mb-3 bg-red-50 py-2 rounded-lg">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-[0_5px_0_#8b0e0e] active:shadow-[0_2px_0_#8b0e0e] active:translate-y-1 transition-all duration-100 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    YUBORILMOQDA...
                  </span>
                ) : (
                  'DAVOM ETISH'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
      <script async src="https://spliturltest.asosit.uz/abtest.js" data-site-id="s1JyprFIVWNXo-WI" data-api-base="https://spliturltest.asosit.uz"></script>
    </>
  )
}