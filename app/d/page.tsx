"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timerDisplay, setTimerDisplay] = useState("05:00");

  useEffect(() => {
    let duration = 60 * 5;
    const interval = setInterval(() => {
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;
      setTimerDisplay(
        `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
      );
      if (--duration < 0) duration = 60 * 5;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setSubmitted(false);
      setName("");
      setPhone("");
    }, 2000);
  };

  const benefits = [
    "Miyani kattaroq raqamlarga va yangi imkoniyatlarga moslashtirish orqali boylikka chiqish sirlari",
    "`Qora kun` uchun emas, `Omadli kun` uchun jamg'arma yig'ish psixologiyasi. Qarzlar va kreditlar — ularning ruhiy sabablarini o'rganamiz",
    "Duo orqali tez, oson va yengil boy bo'lishni psiholohik tahlillarini",
    "Qanday qilib ayollik energiyasini ushlab turgan holda boy va badavlat bo'lishni 3 ta etapini ko'rib chiqamiz",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

        .font-unbounded { font-family: 'Unbounded', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

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

        /* Rasmning orqasidagi har qanday oq/kulrang fonni olib tashlash uchun */
        .speaker-img {
          display: block;
          width: 100%;
          /* PNG transparent bo'lsa - mix-blend-mode: multiply oq fonni yo'q qiladi */
          mix-blend-mode: luminosity;
          filter: contrast(1.08) brightness(1.04);
        }

        /* Agar rasm oq fonli JPG/PNG bo'lsa - multiply rejimi uni yo'q qiladi */
        .speaker-img-multiply {
          display: block;
          width: 100%;
          mix-blend-mode: multiply;
          filter: contrast(1.1) brightness(0.95);
        }

        .speaker-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 300px;
          margin-top: 20px;
          /* overflow yo'q - rasm to'liq ko'rinsin */
        }
      `}</style>

      <main className="font-unbounded bg-black min-h-screen">

        {/* ====== HERO + BENEFITS SECTION ====== */}
        <section
          className="relative flex flex-col items-center overflow-hidden px-4 pb-12"
          style={{
            background:
              "radial-gradient(ellipse at 55% 36%, #4a0b0b 0%, #2a0505 32%, #0d0d0d 70%)",
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

          {/* ====== SPEAKER IMAGE - CLEAN, NO SHADOW/BACKGROUND ====== */}
          <div className="speaker-wrapper">
            {/*
              Rasmdagi oq/kulrang shadow va background ni yo'q qilish uchun:
              - Agar rasm .png transparent bo'lsa: shunchaki ko'rsatamiz
              - Agar oq fond bor bo'lsa: mix-blend-mode: multiply uni yo'q qiladi
              - CSS filter bilan kontrast va yorqinlikni moslashtiramiz
            */}
            <img
              src="./d.png"
              alt="Iman Akhmedovna"
              style={{
                display: "block",
                width: "100%",
                objectFit: "contain",
                /* 
                  mix-blend-mode: multiply - oq fonni background rangiga singdiradi
                  Bu qora/to'q background ustida ishlaydi: oq = ko'rinmaydi, rasm qoladi
                */
                mixBlendMode: "multiply",
                filter: "contrast(1.15) brightness(1.1) saturate(1.1)",
              }}
            />
            {/* Left fade */}
            <div className="absolute top-0 left-0 bottom-0 w-[30%] bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />
            {/* Right fade */}
            <div className="absolute top-0 right-0 bottom-0 w-[30%] bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />
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
                  i === 0
                    ? "animate-fadeup-1"
                    : i === 1
                    ? "animate-fadeup-2"
                    : "animate-fadeup-3"
                }`}
              >
                {/* Red rugby ball icon */}
                <div className="flex-shrink-0 mt-1">
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                    <ellipse
                      cx="13"
                      cy="10"
                      rx="11.5"
                      ry="7.5"
                      stroke="#ea2b2b"
                      strokeWidth="2.5"
                      fill="none"
                      transform="rotate(-18 13 10)"
                    />
                  </svg>
                </div>
                <p className="font-unbounded text-white/90 text-[13px] font-light leading-relaxed">
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

        {/* ====== POPUP MODAL ====== */}
        {isPopupOpen && (
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsPopupOpen(false);
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
                  <line
                    x1="2" y1="2" x2="18" y2="18"
                    stroke="#555" strokeWidth="2" strokeLinecap="round"
                  />
                  <line
                    x1="18" y1="2" x2="2" y2="18"
                    stroke="#555" strokeWidth="2" strokeLinecap="round"
                  />
                </svg>
              </button>

              <h3 className="font-unbounded text-[18px] font-bold text-center text-black mb-6 leading-snug">
                Ro&apos;yxatdan o&apos;tish uchun ma&apos;lumotlaringizni
                kiriting!
              </h3>

              {submitted ? (
                <div className="font-unbounded bg-[#63e400] text-white rounded-lg p-5 text-center text-sm font-semibold">
                  Yuklanmoqda... ✓
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-4">
                    <label className="font-unbounded block text-[13px] font-medium text-gray-700 mb-2">
                      Ismingiz
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ismingizni kiriting"
                      className="input-focus font-unbounded w-full px-4 py-3 border border-gray-300 rounded-md text-sm text-black bg-gray-50"
                    />
                  </div>

                  {/* Phone */}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="90-123-4567"
                        required
                        className="input-focus font-unbounded flex-1 px-3 py-3 text-sm text-black bg-gray-50 border-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="font-unbounded w-full bg-[#1dca34] text-white font-bold text-sm tracking-widest rounded-md py-4 cursor-pointer"
                    style={{
                      boxShadow: "0 4px 20px rgba(29,202,52,0.35)",
                    }}
                  >
                    DAVOM ETISH
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* hidden timer */}
        <span className="hidden">{timerDisplay}</span>
      </main>
    </>
  );
}