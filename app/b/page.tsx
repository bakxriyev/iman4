"use client";

import { useEffect, useRef, useState } from "react";

export default function Maqsad2025Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* ── scroll reveal ── */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) =>
      observerRef.current?.observe(el)
    );
    return () => observerRef.current?.disconnect();
  }, []);

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  /* ── mouse parallax blobs ── */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.querySelectorAll<HTMLElement>(".blob").forEach((blob, i) => {
        const f = i % 2 === 0 ? 18 : -14;
        blob.style.transform = `translate(${x * f}px,${y * f}px)`;
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ── phone auto-format ── */
  const handlePhone = (val: string) => {
    let v = val.replace(/\D/g, "").slice(0, 9);
    let out = "";
    if (v.length > 0) out = v.slice(0, 2);
    if (v.length > 2) out += "-" + v.slice(2, 5);
    if (v.length > 5) out += "-" + v.slice(5, 9);
    setPhone(out);
  };

  /* ── submit ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError("Iltimos, to'liq ismingizni kiriting.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      setError("Iltimos, telefon raqamingizni to'liq kiriting.");
      return;
    }
    setFormState("loading");
    setTimeout(() => setFormState("success"), 1400);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setFormState("idle");
      setName("");
      setPhone("");
      setError("");
    }, 350);
  };

  return (
    <>
      {/* Minimal custom keyframes and reveal transitions (Tailwind does not cover all) */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes pulse3d {
          0%, 100% { box-shadow: 0 8px 0 #610a0a, 0 0 55px rgba(234,43,43,.4); }
          50% { box-shadow: 0 8px 0 #610a0a, 0 0 110px rgba(234,43,43,.8); }
        }
        @keyframes glowBlink {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.82); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-18px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-left { opacity: 0; transform: translateX(-36px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal-right { opacity: 0; transform: translateX(36px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.is-visible, .reveal-left.is-visible, .reveal-right.is-visible { opacity: 1; transform: none; }
        .anim-badge { animation: slideDown 0.6s 0.1s ease both; }
        .anim-sub { animation: fadeUp 0.7s 0.25s ease both; }
        .anim-title { animation: fadeUp 0.75s 0.4s ease both; }
        .anim-q { animation: fadeUp 0.75s 0.55s ease both; }
        .anim-img { animation: fadeIn 1s 0.2s ease both; }
        .anim-free { animation: fadeUp 0.6s 0.65s ease both; }
        .anim-cta { animation: fadeUp 0.6s 0.8s ease both; }
        .float-img { animation: floatY 5s ease-in-out infinite; }
        .pulse-cta { animation: pulse3d 2.5s ease-in-out infinite; }
        .blink-blob { animation: glowBlink 3.5s ease-in-out infinite; }
        @media (max-width: 640px) {
          .hero-title-size { font-size: 2.4rem !important; }
          .cta-free-size { font-size: 3rem !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════
          SECTION 1 ─ HERO
      ═══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 72% 48%, rgba(40,2,2,.98) 0%, #050505 68%)"
        }}
      >
        {/* ambient blobs */}
        <div
          className="blob blink-blob absolute w-[580px] h-[540px] right-[-130px] top-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(234,43,43,.38) 0%,transparent 70%)" }}
        />
        <div
          className="blob blink-blob absolute w-[380px] h-[380px] left-[-110px] bottom-[80px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(234,43,43,.18) 0%,transparent 70%)", animationDelay: "1.6s" }}
        />
        <div
          className="blob blink-blob absolute w-[240px] h-[240px] right-[28%] top-[10%] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,190,190,.1) 0%,transparent 70%)", animationDelay: ".9s" }}
        />

        <div className="relative z-[2] w-full max-w-[1200px] px-5">
          {/* date badge */}
          <div className="flex -mt-9 justify-center pt-11 anim-badge">
            <div className="inline-flex items-center justify-center border-[1.5px] border-red-600 rounded-full bg-red-600/10 backdrop-blur-md px-[26px] py-[9px]">
              <span className="font-unbounded text-[13px] tracking-[.05em] text-white">
                8-9-10 May &nbsp;|&nbsp; Soat 20:00 da
              </span>
            </div>
          </div>

          {/* subtitle */}
          <p className="anim-sub text-center mt-4 text-[13px] font-medium text-white/60 tracking-[.04em]">
            Iman Akhmedovna bilan 3 kunlik&nbsp;
            <span className="text-red-600 font-bold">BEPUL</span>
            &nbsp;marafon
          </p>

          

          {/* two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
            {/* LEFT */}
            <div>
              <p className="text-[22px] text-center -mt-6 font-bold leading-[1.65] text-white mb-7">
                Duo ijobati orqali, qarz va kreditlardan halos bo’lishmi 3 ta yo’li
              </p>
              <div className="animate-img flex justify-center -mt-5 items-end relative">
                <div className="absolute bottom-0 left-1/2  -translate-x-1/2 w-[300px] h-[240px] bg-red-600/60 blur-[44px]  z-0" />
                <img
                  src="./22.png"
                  alt="Dovranbek Turdiev"
                  className="relative z-[1] max-w-full max-h-[320px] object-contain "
                />
              </div>
              <div className="anim-cta">
                <button
                  className="btn3d relative inline-flex items-center justify-center w-full bg-gradient-to-b from-red-700 via-red-800 to-red-900 text-white font-montserrat font-bold tracking-[.09em] rounded-xl shadow-[0_8px_0_#610a0a,0_0_60px_rgba(234,43,43,0.35)] hover:shadow-[0_8px_0_#610a0a,0_0_100px_rgba(234,43,43,0.65)] active:translate-y-1.5 active:shadow-[0_2px_0_#610a0a,0_0_30px_rgba(234,43,43,0.2)] transition-all duration-75 py-5 px-8 text-[16px] before:absolute before:inset-x-0 before:top-0 before:h-[48%] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-t-xl"
                  onClick={() => setModalOpen(true)}
                >
                  RO&apos;YXATDAN O&apos;TISH
                </button>
                <div className="flex items-center justify-center gap-3 mt-3">
                    <img
  src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
  alt="arrow"
  className="w-12 transition-transform duration-200 hover:translate-x-1 invert"
/>
                    <span className="text-4xl font-extrabold text-white">BEPUL</span>
                </div>
              </div>
            </div>
            
<br />
            {/* RIGHT (image already placed above in left column for layout consistency) */}
            <div className="hidden md:block" />
          </div>
        </div>
          <div className=" rounded-3xl p-5 w-full max-w-[513px] mx-auto mb-8 order-7">
                  <p className="text-[20px] font-bold mb-2 text-white text-center">Marafonda siz:</p>
                  {[
                    'Qanday qilib psihologik tomondan o’zingizni RAT holatiga keltirib duolaringiz ijobat bo’lish usulini',
                    'Qanday qilib 3 ta yo’l orqali qarzdorlikdan chiqib, moliyaviy erkinlikka chiqish yo’llarini',
                    'Ong osti psixologik bloklarni yengib, 2026 yil moliyaviy erkinlikka chiqishni usullarini',
                    'Qanday qilib yetishmovchilik dasturini to’g’ri prorobotka qilib, doimiy yetishmovchiliklardan halos bo’lish yo’llarini o’rganasiz'
                  ].map((text, idx) => (
                    <div key={idx} className="flex gap-3 mb-4 last:mb-0">
                      <img
                        src="https://optim.tildacdn.one/tild3534-6335-4562-b366-386462303035/-/resize/70x/-/format/webp/Ellipse_163.png.webp"
                        alt="icon"
                        className="w-6 h-5 mt-0.5"
                      />
                      <p
                        className="text-[13px] font-light text-white leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    </div>
                  ))}
                </div>

      </section>
      

   

      {/* ═══════════════════════════════════════
          SECTION 4 ─ CTA BANNER
      ═══════════════════════════════════════ */}
    
      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="bg-gradient-to-b from-[#0c0c0c] to-[#050505] border-t border-red-600/20 py-[52px] px-5">
        <div className="max-w-[580px] mx-auto text-center">
          
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
           
            <p className="text-[11px] text-white/20 leading-[1.65]">
              This site or product is not part of or endorsed by Facebook, Google, or any social media platform in any way.
              FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc.
            </p>
          </div>
          <p className="mt-6 text-[11px] text-white/20">
            Barcha huquqlar himoyalangan, 2026.
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════
          MODAL
      ═══════════════════════════════════════ */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-5 animate-[fadeIn_0.28s_ease]"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="relative w-full max-w-[440px] bg-gradient-to-br from-[#1c1c1c] to-[#111] border border-red-600/30 rounded-3xl p-[40px_34px] shadow-[0_0_80px_rgba(234,43,43,0.22),0_40px_80px_rgba(0,0,0,0.6)] animate-[scaleIn_0.38s_cubic-bezier(0.34,1.56,0.64,1)]">
            {/* inner glow */}
            <div className="absolute -top-[50px] -right-[50px] w-[220px] h-[220px] bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            {/* close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 border-none cursor-pointer text-white text-lg flex items-center justify-center transition-colors hover:bg-red-600/30 z-10"
            >
              ✕
            </button>

            {formState === "success" ? (
              <div className="flex flex-col items-center gap-[18px] py-5 animate-[scaleIn_0.4s_ease]">
                <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-red-600/30 to-red-600/10 border-2 border-red-600 flex items-center justify-center text-[34px]">
                  🎉
                </div>
                <h3 className="font-unbounded text-[1.1rem] font-bold text-white text-center">
                  Tabriklaymiz!
                </h3>
                <p className="text-sm text-white/60 text-center leading-[1.65]">
                  Siz muvaffaqiyatli ro&apos;yxatdan o&apos;tdingiz.<br />Tez orada siz bilan bog&apos;lanamiz!
                </p>
                <button
                  className="btn3d relative inline-flex items-center justify-center bg-gradient-to-b from-red-500 via-red-600 to-red-800 text-white font-montserrat font-bold tracking-[.09em] rounded-xl shadow-[0_8px_0_#610a0a,0_0_60px_rgba(234,43,43,0.35)] active:translate-y-1.5 active:shadow-[0_2px_0_#610a0a,0_0_30px_rgba(234,43,43,0.2)] transition-all duration-75 py-[14px] px-10 text-[14px] mt-2 before:absolute before:inset-x-0 before:top-0 before:h-[48%] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-t-xl"
                  onClick={closeModal}
                >
                  YOPISH
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-unbounded text-[1.1rem] font-bold text-white text-center mb-1.5 leading-[1.4]">
                  Ro&apos;yxatdan o&apos;tish
                </h2>
                <p className="text-[13px] text-white/40 text-center mb-7">
                  Ma&apos;lumotlaringizni kiriting!
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[13px] text-white/60 font-medium mb-2">
                      Ismingiz
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-[14px] px-[18px] text-white placeholder:text-white/30 outline-none focus:border-red-600 focus:shadow-[0_0_0_3px_rgba(234,43,43,0.15)] transition-all"
                      placeholder="Ism Familiya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-white/60 font-medium mb-2">
                      Telefon raqamingiz
                    </label>
                    <div className="flex items-center bg-white/10 border border-white/20 rounded-xl overflow-hidden focus-within:border-red-600 focus-within:shadow-[0_0_0_3px_rgba(234,43,43,0.15)] transition-all">
                      <span className="py-[14px] px-[14px] bg-red-600/20 text-white/60 text-[13px] border-r border-white/10 whitespace-nowrap font-montserrat font-semibold shrink-0">
                        🇺🇿 +998
                      </span>
                      <input
                        type="tel"
                        className="flex-1 bg-transparent border-none py-[14px] px-4 text-white outline-none placeholder:text-white/30 min-w-0"
                        placeholder="90-123-4567"
                        value={phone}
                        onChange={(e) => handlePhone(e.target.value)}
                        maxLength={11}
                        required
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="bg-red-600/20 border border-red-600/50 rounded-xl py-[10px] px-[14px] text-[13px] text-red-300">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn3d relative inline-flex items-center justify-center bg-gradient-to-b from-red-500 via-red-600 to-red-800 text-white font-montserrat font-bold tracking-[.09em] rounded-xl shadow-[0_8px_0_#610a0a,0_0_60px_rgba(234,43,43,0.35)] active:translate-y-1.5 active:shadow-[0_2px_0_#610a0a,0_0_30px_rgba(234,43,43,0.2)] transition-all duration-75 py-[18px] px-8 text-[16px] mt-1 disabled:opacity-65 disabled:cursor-not-allowed before:absolute before:inset-x-0 before:top-0 before:h-[48%] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:rounded-t-xl"
                    disabled={formState === "loading"}
                  >
                    {formState === "loading" ? "Yuborilmoqda..." : "DAVOM ETISH"}
                  </button>
                  <p className="text-[11px] text-white/20 text-center leading-[1.55]">
                    Ma&apos;lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}