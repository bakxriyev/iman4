'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  "https://vxpvgeyktgyasegvycfp.supabase.co",
  "sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w"
)

export default function SiteA() {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [timerDisplay, setTimerDisplay] = useState('02:00')
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setFormError('Telefon raqamingizni kiriting!')
      return
    }
    
    setFormError('')
    setIsSubmitting(true)
    
    try {
      // Insert into 'leads' table with correct column names
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name.trim(),
            phone_number: formData.phone.trim(),
            type: 'a', // Fixed type for /a page
            created_at: new Date().toISOString(),
          }
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
                  1-2-3 may | Soat 20:00 da
                </span>
                <p className="text-xs font-light text-black mb-2 order-2">
                  Iman Akhmedovnadan 3 kunlik bepul onlayn dars
                </p>
                <h1 className="text-2xl font-extrabold text-black mb-3 order-3">
                  QANDAY QILIB ... 2026
                </h1>
                <h2 className="text-lg font-bold text-black leading-tight mb-6 order-4">
                  Qanday qilib <span className="text-red-700">yangi yilda</span> zararli odatlardan
                  qutilish va o‘z maqsadingizga intizom bilan erishish mumkin?
                </h2>
                <div className="flex justify-center items-end pt-0 order-5 md:order-1 -mt-12">
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
                <div className="bg-gray-50 border-2 border-gray-300 rounded-3xl p-5 w-full max-w-[513px] mx-auto mb-8 order-7">
                  <p className="text-sm font-bold mb-4 text-black">Marafonda siz:</p>
                  {[
                    'Qanday qilib <strong>2026 yil uchun</strong> to‘g‘ri va aniq maqsad qo‘yishning yangi usulini',
                    'Qanday qilib dangasalikni yengib, <strong>istalgan maqsadga kuchli intizom bilan erishish</strong> qadamlarini',
                    '<strong>2026-yilda</strong> yaxshi odatlarni shakllantirib, istalgan ko‘nikmani <strong>10 baravar tezroq o‘rganish</strong> usullarini',
                  ].map((text, idx) => (
                    <div key={idx} className="flex gap-3 mb-4 last:mb-0">
                      <img
                        src="https://optim.tildacdn.one/tild3534-6335-4562-b366-386462303035/-/resize/70x/-/format/webp/Ellipse_163.png.webp"
                        alt="icon"
                        className="w-6 h-5 mt-0.5"
                      />
                      <p
                        className="text-xs font-light text-black leading-relaxed"
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
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 w-full shadow-xl">
                  <p className="text-lg font-bold mb-5 text-black flex items-center gap-2">
                    <span className="text-red-600 text-2xl">✦</span> Marafonda siz:
                  </p>
                  <div className="space-y-4">
                    {[
                      'Qanday qilib <strong class="text-red-700">2026 yil uchun</strong> to‘g‘ri va aniq maqsad qo‘yishning yangi usulini',
                      'Qanday qilib dangasalikni yengib, <strong class="text-red-700">istalgan maqsadga kuchli intizom bilan erishish</strong> qadamlarini',
                      '<strong class="text-red-700">2026-yilda</strong> yaxshi odatlarni shakllantirib, istalgan ko‘nikmani <strong class="text-red-700">10 baravar tezroq o‘rganish</strong> usullarini',
                    ].map((text, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                          <img
                            src="https://optim.tildacdn.one/tild3534-6335-4562-b366-386462303035/-/resize/70x/-/format/webp/Ellipse_163.png.webp"
                            alt="icon"
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
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

      {/* POPUP with Supabase integration */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <h3 className="text-lg md:text-xl font-bold text-center mb-6 text-black">
              Ro‘yxatdan o‘tish uchun ma’lumotlaringizni kiriting!
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">Ismingiz</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:border-red-500 outline-none transition"
                  placeholder="Ismingiz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">Telefon raqamingiz</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-red-500">
                  <span className="bg-gray-100 px-3 py-2 text-black border-r border-gray-300 flex items-center gap-1">
                    🇺🇿 +998
                  </span>
                  <input
                    type="tel"
                    className="flex-1 px-3 py-2 text-black outline-none"
                    placeholder="00-000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={11}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              {formError && <p className="text-red-600 text-sm text-center mb-3">{formError}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow-[0_5px_0_#8b0e0e] active:shadow-[0_2px_0_#8b0e0e] active:translate-y-1 transition-all duration-100 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'YUBORILMOQDA...' : 'DAVOM ETISH'}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  )
}