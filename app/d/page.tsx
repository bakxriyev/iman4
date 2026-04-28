'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase client ───────────────────────────────────────────────────
const supabase = createClient(
  'https://vxpvgeyktgyasegvycfp.supabase.co',
  'sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w'
)

export default function Home() {
  const router = useRouter()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timerDisplay, setTimerDisplay] = useState('02:00')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 2‑daqiqali sikl timer
  useEffect(() => {
    let duration = 60 * 2
    timerRef.current = setInterval(() => {
      const minutes = Math.floor((duration % 3600) / 60)
      const seconds = duration % 60
      setTimerDisplay(
        `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
      )
      if (--duration < 0) duration = 60 * 2
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Forma yuborish – Supabase orqali
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validatsiya
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
      const { error } = await supabase.from('leads').insert([
        {
          full_name: formData.name.trim(),
          phone_number: formData.phone.trim(),
          type: 'd',               // ← /d sahifa uchun
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error('Supabase error:', error)
        setFormError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.')
        setIsSubmitting(false)
        return
      }

      // Muvaffaqiyatli – thank-you ga yo‘naltirish
      router.push('/thank-you')
    } catch (err) {
      console.error('Submission error:', err)
      setFormError('Server bilan bog‘liq xatolik. Iltimos, keyinroq urinib ko‘ring.')
      setIsSubmitting(false)
    }
  }

  const benefits = [
    "Miyani kattaroq raqamlarga va yangi imkoniyatlarga moslashtirish orqali boylikka chiqish sirlari",
    "`Qora kun` uchun emas, `Omadli kun` uchun jamg'arma yig'ish psixologiyasi. Qarzlar va kreditlar — ularning ruhiy sabablarini o'rganamiz",
    "Duo orqali tez, oson va yengil boy bo'lishni psiholohik tahlillarini",
    "Qanday qilib ayollik energiyasini ushlab turgan holda boy va badavlat bo'lishni 3 ta etapini ko'rib chiqamiz",
  ]

  return (
    <>
      {/* Global stillar */}
      <style>{`
        .font-unbounded { font-family: 'Unbounded', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-simple { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fadeup-1 { animation: fadeUp 0.5s 0.1s forwards; opacity: 0; }
        .animate-fadeup-2 { animation: fadeUp 0.5s 0.25s forwards; opacity: 0; }
        .animate-fadeup-3 { animation: fadeUp 0.5s 0.4s forwards; opacity: 0; }
        .animate-popin    { animation: popIn 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        .glow-green {
          box-shadow: 0 0 32px rgba(29,202,52,0.45), 0 0 8px rgba(29,202,52,0.3);
          transition: box-shadow 0.2s, transform 0.15s;
        }
        .glow-green:hover {
          box-shadow: 0 0 48px rgba(29,202,52,0.65), 0 0 14px rgba(29,202,52,0.4);
          transform: translateY(-1px);
        }
        .glow-green:active { transform: translateY(0); }

        .input-focus:focus { border-color: #1dca34 !important; background: #fff !important; outline: none; }

        .speaker-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 300px;
          margin-top: 20px;
        }

        /* Yangi timer – qizil fonga, oq raqamlarga */
        .timer-card {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          
          border-radius: 16px;
          padding: 12px 28px;
          box-shadow: 0 8px 24px rgba(220,38,38,0.35), 0 0 0 1px rgba(255,255,255,0.1);
        }
        .timer-digit {
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          min-width: 40px;
          text-align: center;
        }
        .timer-colon {
          font-size: 1.8rem;
          font-weight: 900;
          color: rgba(255,255,255,0.8);
          line-height: 1;
        }
      `}</style>

      <main className="font-unbounded bg-black min-h-screen">
        {/* ====== HERO + BENEFITS SECTION ====== */}
        <section
          className="relative flex flex-col items-center overflow-hidden px-4 pb-12"
          style={{
            background: "radial-gradient(ellipse at 55% 36%, #4a0b0b 0%, #2a0505 32%, #0d0d0d 70%)",
          }}
        >
          {/* Radar circles */}
          {[300, 460, 620, 780].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/[0.055] pointer-events-none"
              style={{
                width: size,
                height: size,
                top: "32%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Date badge */}
          <div className="font-unbounded mt-8 border border-[#ea2b2b] rounded-full px-6 py-2 text-white text-[13px] font-medium z-10">
            8-9-10 May | Soat 20:00 da
          </div>

          {/* Subtitle */}
          <p className="font-unbounded mt-4 text-white/70 text-[13px] font-extralight z-10 text-center">
            Iman Akhmedovnadan 3 kunlik bepul marafon
          </p>

          {/* Main question */}
          <h2 className="font-unbounded mt-4 text-white text-[17px] font-bold z-10 text-center leading-relaxed max-w-[340px]">
            Qanday qilib <span className="text-[#e60a0a]">30 kun</span> kun ichida pullar bilan munosabatingizni o'zgartirib, daromadingizni yangi darajaga olib chiqish mumkin?
          </h2>

          {/* CTA Button 1 */}
          <div className="mt-6 z-10 w-full flex justify-center">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="glow-green font-unbounded bg-[#1dca34] text-white font-bold text-[13px] tracking-widest rounded-[5px] py-4 w-full max-w-[340px]"
            >
              RO&apos;YXATDAN O&apos;TISH
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <img
              src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
              alt="arrow"
              className="w-12 invert"
            />
            <span className="text-4xl font-extrabold text-white">BEPUL</span>
          </div>

          {/* Timer – qizil fon, oq raqamlar */}
          <div className="mt-6 z-10">
            <div className="timer-card">
              {timerDisplay.split('').map((char, idx) => (
                <React.Fragment key={idx}>
                  {char === ':' ? (
                    <span className="timer-colon">:</span>
                  ) : (
                    <span className="timer-digit">{char}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-white/50 text-xs text-center mt-2">Ro`yxatdan o`tish tugashiga</p>
          </div>

          {/* ====== SPEAKER IMAGE ====== */}
          <div className="speaker-wrapper">
            <img
              src="./d.png"
              alt="Iman Akhmedovna"
              style={{
                display: "block",
                width: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
                filter: "contrast(1.15) brightness(1.1) saturate(1.1)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 bottom-0 w-[30%] bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-[30%] bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-[#1e0404]/50 to-transparent pointer-events-none" />
          </div>

          {/* ====== BENEFITS ====== */}
          <div className="relative z-10 w-full max-w-[400px] mt-2">
            <h2 className="font-unbounded text-white text-xl font-semibold text-center mb-7 leading-normal">
              Bepul marafonda siz:
            </h2>

            {benefits.map((text, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 mb-7 ${
                  i === 0 ? "animate-fadeup-1" : i === 1 ? "animate-fadeup-2" : "animate-fadeup-3"
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                    <ellipse
                      cx="13" cy="10"
                      rx="11.5" ry="7.5"
                      stroke="#ea2b2b"
                      strokeWidth="2.5"
                      fill="none"
                      transform="rotate(-18 13 10)"
                    />
                  </svg>
                </div>
                <p className="font-simple text-white/90 text-[15px] font-normal leading-relaxed">
                  {text}
                </p>
              </div>
            ))}

            {/* CTA Button 2 */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsPopupOpen(true)}
                className="glow-green font-unbounded bg-[#1dca34] text-white font-bold text-[13px] tracking-widest rounded-[5px] py-4 w-full max-w-[340px]"
              >
                RO&apos;YXATDAN O&apos;TISH
              </button>
            </div>
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

        {/* ====== FOOTER ====== */}
        <footer className="bg-black border-t border-white/10 px-6 pt-9 pb-14 text-center">
          <p className="font-montserrat text-white text-lg font-medium tracking-wide mb-4">
            IMAN AKHMEDOVNA
          </p>
          <p className="font-montserrat text-white/50 text-[11px] leading-relaxed max-w-xs mx-auto mb-3">
            000 IMAN ACADEMY
          </p>
          <p className="font-montserrat text-white/40 text-[11px] leading-relaxed max-w-xs mx-auto mb-4">
            This site or product is not part of or endorsed by Facebook, Google,
            or any social media platform in any way. FACEBOOK is a trademark of
            META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET,
            Inc.
          </p>
          <p className="font-montserrat text-white/40 text-[11px]">
            Barcha huquqlar himoyalangan, 2026.
          </p>
        </footer>

        {/* ====== POPUP MODAL (Supabase orqali jo‘natadi) ====== */}
        {isPopupOpen && (
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsPopupOpen(false)
            }}
          >
            <div className="animate-popin bg-white rounded-xl px-6 pt-9 pb-7 w-full max-w-[440px] relative">
              {/* Close button */}
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-3 right-3 bg-transparent border-none cursor-pointer p-1 leading-none"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <line x1="2" y1="2" x2="18" y2="18" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="2" x2="2" y2="18" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <h3 className="font-unbounded text-[18px] font-bold text-center text-black mb-6 leading-snug">
                Ro&apos;yxatdan o&apos;tish uchun ma&apos;lumotlaringizni kiriting!
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Ism */}
                <div className="mb-4">
                  <label className="font-unbounded block text-[13px] font-medium text-gray-700 mb-2">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Ismingizni kiriting"
                    disabled={isSubmitting}
                    className="input-focus font-unbounded w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-black bg-gray-50"
                  />
                </div>

                {/* Telefon */}
                <div className="mb-6">
                  <label className="font-unbounded block text-[13px] font-medium text-gray-700 mb-2">
                    Telefon raqamingiz
                  </label>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <span className="font-unbounded flex items-center gap-1 px-3 py-3 text-[13px] text-gray-700 bg-gray-100 border-r border-gray-300 whitespace-nowrap">
                      🇺🇿 +998
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="90-123-4567"
                      required
                      disabled={isSubmitting}
                      className="input-focus font-unbounded flex-1 px-3 py-3 text-sm text-black bg-gray-50 border-none"
                    />
                  </div>
                </div>

                {/* Xatolik xabari */}
                {formError && (
                  <p className="text-red-600 text-sm text-center mb-3">{formError}</p>
                )}

                {/* Submit tugmasi */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-unbounded w-full bg-[#1dca34] text-white font-bold text-sm tracking-widest rounded-md py-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: "0 4px 20px rgba(29,202,52,0.35)",
                  }}
                >
                  {isSubmitting ? 'YUBORILMOQDA...' : 'DAVOM ETISH'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  )
}