'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ARROW_SRC = "https://static.tildacdn.one/tild3134-6537-4562-a236-353632313365/Arrow_7.svg";
const SUPABASE_URL = "https://vxpvgeyktgyasegvycfp.supabase.co";
const SUPABASE_KEY = "sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w";

const benefits = [
  "Energiyasizlikdan qanday qilib xalos bo'lishni",
  `Insonning "ego"si nimalarga qodir?`,
  "Energiyasizlikdan xalos bo'lish uchun O'zim doimiy foydalanib keladigan 3 ta texnikani bilib olasiz.",
];

// ─── Modal ───────────────────────────────────────────────────────────────────
function Modal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!fullName.trim() || !phone.trim()) {
      setError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/vsl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone_number: phone.trim(),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Server xatosi yuz berdi.");
      }

      router.push("/thankyou");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Xatolik yuz berdi. Qayta urinib ko'ring.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 9998,
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      />

      {/* Modal box */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(92vw, 420px)",
          background: "#fff",
          borderRadius: 24,
          padding: "32px 28px 28px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#888",
            lineHeight: 1,
          }}
          aria-label="Yopish"
        >
          ×
        </button>

        {/* Title */}
        <h2
          style={{
            margin: "0 0 6px",
            fontSize: 20,
            fontWeight: 800,
            color: "#111",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Bepul videoni ko'rish uchun
        </h2>
        <p
          style={{
            margin: "0 0 24px",
            fontSize: 13,
            color: "#888",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Ma'lumotlaringizni kiriting
        </p>

        {/* Full name */}
        <label style={{ display: "block", marginBottom: 6 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#333",
              display: "block",
              marginBottom: 6,
            }}
          >
            Ism va familiya
          </span>
          <input
            type="text"
            placeholder="Masalan: Aziz Karimov"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: 12,
              border: "1.5px solid #e0e0e0",
              fontSize: 15,
              fontFamily: "'Montserrat', sans-serif",
              outline: "none",
              boxSizing: "border-box",
              color: "#111",
              background: "#fafafa",
              transition: "border-color .2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#ff2d2d")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
          />
        </label>

        {/* Phone */}
        <label style={{ display: "block", marginBottom: 16, marginTop: 14 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#333",
              display: "block",
              marginBottom: 6,
            }}
          >
            Telefon raqam
          </span>
          <input
            type="tel"
            placeholder="+998 90 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: 12,
              border: "1.5px solid #e0e0e0",
              fontSize: 15,
              fontFamily: "'Montserrat', sans-serif",
              outline: "none",
              boxSizing: "border-box",
              color: "#111",
              background: "#fafafa",
              transition: "border-color .2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#ff2d2d")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
          />
        </label>

        {/* Error message */}
        {error && (
          <p
            style={{
              fontSize: 13,
              color: "#c80000",
              textAlign: "center",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            height: 58,
            borderRadius: 9999,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            background: loading
              ? "#ccc"
              : "linear-gradient(180deg,#ff6b6b 0%,#ff2d2d 40%,#e00000 100%)",
            color: "#fff",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: 0.5,
            boxShadow: loading
              ? "none"
              : "0 6px 20px rgba(200,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
            transition: "opacity .2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {loading ? "Jo'natilmoqda..." : <>VIDEONI KO&apos;RISH <span style={{ fontSize: 18 }}>→</span></>}
        </button>

        <p
          style={{
            fontSize: 11,
            color: "#bbb",
            textAlign: "center",
            marginTop: 14,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Ma'lumotlaringiz xavfsiz saqlanadi
        </p>
      </div>
    </>
  );
}

// ─── Badge & CTA ──────────────────────────────────────────────────────────────
function BepulBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const arrowW = size === "sm" ? "w-8" : size === "lg" ? "w-10" : "w-9";
  const textSz =
    size === "sm" ? "text-xl" : size === "lg" ? "text-[28px]" : "text-2xl";
  return (
    <div className="flex items-center justify-center gap-2.5 mt-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ARROW_SRC}
        alt="arrow"
        className={`${arrowW} h-auto [filter:brightness(0)] arrow-bounce`}
      />
      <span
        className={`${textSz} font-extrabold tracking-wide text-[#111] leading-none montserrat`}
      >
        BEPUL
      </span>
    </div>
  );
}

function CTAButton({
  onClick,
  fontSize = 15,
}: {
  onClick: () => void;
  fontSize?: number;
}) {
  return (
    <button onClick={onClick} className="btn-3d w-full h-full">
      <span style={{ fontSize }}>VIDEODARSNI KO&apos;RISH</span>
      <span className="wiggle" style={{ fontSize: fontSize + 1 }}>
        →
      </span>
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function VSLPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400&display=swap');
        .montserrat { font-family: 'Montserrat', sans-serif; }

        .btn-3d {
          position: relative;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          border-radius: 9999px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700; color: #fff; letter-spacing: 0.5px;
          cursor: pointer; border: none; outline: none;
          background: linear-gradient(180deg,#ff6b6b 0%,#ff2d2d 40%,#e00000 100%);
          box-shadow:
            0 2px 0 #c40000,0 4px 0 #a80000,0 6px 0 #8c0000,
            0 8px 0 #700000,0 10px 20px rgba(200,0,0,.45),
            inset 0 1px 0 rgba(255,255,255,.35),inset 0 -2px 4px rgba(0,0,0,.2);
          transition: transform .1s ease, box-shadow .1s ease;
          animation: glowPulse 2.5s ease-in-out infinite;
        }
        .btn-3d::before {
          content:''; position:absolute; inset:0; border-radius:9999px;
          background:linear-gradient(180deg,rgba(255,255,255,.28) 0%,transparent 55%);
          pointer-events:none;
        }
        .btn-3d:hover {
          transform:translateY(3px); animation:none;
          box-shadow:0 1px 0 #c40000,0 2px 0 #a80000,0 3px 0 #8c0000,
            0 6px 14px rgba(200,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.35),inset 0 -2px 4px rgba(0,0,0,.2);
        }
        .btn-3d:active {
          transform:translateY(8px); animation:none;
          box-shadow:0 1px 0 #8c0000,0 3px 8px rgba(200,0,0,.25),
            inset 0 1px 0 rgba(255,255,255,.2),inset 0 -1px 2px rgba(0,0,0,.15);
        }
        @keyframes glowPulse {
          0%,100%{box-shadow:0 2px 0 #c40000,0 4px 0 #a80000,0 6px 0 #8c0000,
            0 8px 0 #700000,0 10px 20px rgba(200,0,0,.45),
            inset 0 1px 0 rgba(255,255,255,.35),inset 0 -2px 4px rgba(0,0,0,.2);}
          50%{box-shadow:0 2px 0 #c40000,0 4px 0 #a80000,0 6px 0 #8c0000,
            0 8px 0 #700000,0 14px 32px rgba(200,0,0,.6),
            inset 0 1px 0 rgba(255,255,255,.35),inset 0 -2px 4px rgba(0,0,0,.2),
            0 0 28px rgba(255,60,60,.45);}
        }

        .arrow-bounce { animation: arrowB 1.4s ease-in-out infinite; display:inline-block; }
        @keyframes arrowB { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }

        .wiggle { animation: wig 1.2s ease-in-out infinite; display:inline-block; }
        @keyframes wig { 0%,100%{transform:translateX(0);} 50%{transform:translateX(5px);} }

        @keyframes fadeUp {
          from{opacity:0;transform:translateY(16px);}
          to{opacity:1;transform:translateY(0);}
        }
        .b-item { animation: fadeUp .5s ease both; }
        .b-item:nth-child(1){animation-delay:.05s;}
        .b-item:nth-child(2){animation-delay:.15s;}
        .b-item:nth-child(3){animation-delay:.25s;}

        @keyframes urgBlink { 0%,100%{opacity:1;} 50%{opacity:.55;} }
        .urg-blink { animation: urgBlink 1.6s ease-in-out infinite; }

        /* Modal fade in */
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>

      {/* Modal */}
      {modalOpen && <Modal onClose={closeModal} />}

      <main className="relative min-h-screen bg-[#e8e5e0] montserrat">
        <div className="relative max-w-[1200px] mx-auto">

          {/* ═══════ MOBILE (< md) ═══════ */}
          <div className="block md:hidden relative" style={{ minHeight: 600 }}>
            <p
              className="absolute top-[30px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase text-center text-black tracking-widest"
              style={{ fontFamily: "'Inter',sans-serif" }}
            >
              Iman Akhmedovnadan bepul videodarslik
            </p>

            <p
              className="absolute top-[62px] left-1/2 -translate-x-1/2 text-center text-black font-extrabold leading-snug text-[20px]"
              style={{ width: 330 }}
            >
              Qanday qilib 3 ta texnika orqali energiyasizlikdan xalos bo&apos;lish
              mumkin?
            </p>

            <div
              className="absolute left-1/2 -mt-12 -translate-x-1/2 rounded-2xl overflow-hidden border-2 border-[#8b6cff]"
              style={{ top: 200, width: 320 }}
            >
              <Image
                src="/vsl.jpg"
                alt="thumbnail"
                width={320}
                height={180}
                className="w-full block"
                priority
              />
            </div>

            {/* Tugma 1 — mobile */}
            <div
              className="absolute left-1/2 -mt-15 -translate-x-1/2"
              style={{ top: 410, width: 300, height: 62 }}
            >
              <CTAButton onClick={openModal} fontSize={14} />
            </div>

            {/* BEPUL 1 — mobile */}
            <div
              className="absolute left-1/2 -mt-15 -translate-x-1/2"
              style={{ top: 488 }}
            >
              <BepulBadge size="md" />
            </div>
          </div>

          {/* ═══════ DESKTOP (≥ md) ═══════ */}
          <div className="hidden md:flex flex-col items-center justify-center min-h-screen gap-7 py-16 px-8">
            <p
              className="text-[13px] uppercase tracking-widest text-[#111]"
              style={{ fontFamily: "'Inter',sans-serif" }}
            >
              Iman Akhmedovnadan bepul videodarslik
            </p>

            <h1 className="font-extrabold text-[36px] leading-snug text-center text-[#111] max-w-[680px]">
              Qanday qilib 3 ta texnika orqali energiyasizlikdan xalos bo&apos;lish
              mumkin?
            </h1>

            <div className="rounded-[30px] -mt-2 overflow-hidden w-[min(640px,90vw)]">
              <Image
                src="/vsl.jpg"
                alt="thumbnail"
                width={640}
                height={360}
                className="w-full block"
                priority
              />
            </div>

            {/* Tugma 2 — desktop */}
            <div className="w-[360px] h-[70px]">
              <CTAButton onClick={openModal} fontSize={16} />
            </div>

            {/* BEPUL 2 — desktop */}
            <BepulBadge size="lg" />
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            URGENT + BENEFITS
        ═══════════════════════════════════════════ */}
        <section className="px-4 pt-4 pb-14 flex flex-col items-center">
          <div className="w-full max-w-[600px]">
            {/* Urgent matn */}
            <div className="flex -mt-25 items-center justify-center gap-2 mb-5">
              <p className="text-center font-extrabold text-[15px] md:text-[20px] text-[#c80000] tracking-tight leading-snug">
                Shoshiling. Tez Orada O&apos;chiriladi!
              </p>
            </div>

            {/* Benefits karta */}
            <div className="bg-white rounded-[28px] p-6 md:p-9 shadow-[0_8px_48px_rgba(0,0,0,0.10)]">
              <div className="flex items-center text-center flex-wrap gap-3 mb-6">
                <span className="font-extrabold text-center align-center text-[18px] text-[#111]">
                  Bepul Video Darsda Siz:
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {benefits.map((item, i) => (
                  <div
                    key={i}
                    className="b-item flex items-start gap-3.5 bg-[#f7f5f2] rounded-[18px] px-4 py-4 border border-[#ede9e2]"
                  >
                    <div className="min-w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#e00000] to-[#ff6b6b] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(200,0,0,0.25)] mt-0.5">
                      <span className="text-white font-extrabold text-[14px]">
                        {i + 1}
                      </span>
                    </div>
                    <p className="font-semibold text-[15px] leading-[1.55] text-[#1a1a1a] m-0">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#ede9e2] my-6" />

              {/* Tugma 3 — benefits ichida */}
              <div className="w-full h-[62px]">
                <CTAButton onClick={openModal} fontSize={14} />
              </div>

              <div className="mt-8">
                <BepulBadge size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="px-5 py-8 text-center text-[12px] leading-relaxed text-[#888]"
          style={{ fontFamily: "'Inter',sans-serif" }}
        >
          <p>OOO &quot;IMAN ACADEMY&quot;</p>
          <p className="mt-3">
            This site or product is not part of or endorsed by Facebook, Google,
            or any social media platform in any way.
          </p>
          <p className="mt-3">
            FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE
            are trademarks of ALPHABET, Inc.
          </p>
        </footer>
      </main>
    </>
  );
}