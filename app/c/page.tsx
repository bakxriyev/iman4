"use client";

import { useEffect, useState } from "react";

// ─── Countdown ───────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = (ms: number) => ({
    d: Math.max(0, Math.floor(ms / 86400000)),
    h: Math.max(0, Math.floor((ms % 86400000) / 3600000)),
    m: Math.max(0, Math.floor((ms % 3600000) / 60000)),
    s: Math.max(0, Math.floor((ms % 60000) / 1000)),
  });
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    setT(calc(target.getTime() - Date.now()));
    const id = setInterval(() => setT(calc(target.getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return t;
}

// ─── Popup ───────────────────────────────────────────────────────────────────
function Popup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 400,
          background: "linear-gradient(155deg,#0d1f3c 0%,#090e1a 100%)",
          border: "1px solid rgba(220,38,38,0.3)", borderRadius: 20,
          padding: "36px 28px", position: "relative",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 50px rgba(220,38,38,0.08)",
          fontFamily: "Inter,sans-serif",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 26, cursor: "pointer", lineHeight: 1 }}
        >×</button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem", marginBottom: 8 }}>Muvaffaqiyatli!</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>Tez orada siz bilan bog&apos;lanamiz.</p>
          </div>
        ) : (
          <>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", textAlign: "center", marginBottom: 6 }}>
              Ro&apos;yxatdan o&apos;tish uchun<br />ma&apos;lumotlaringizni kiriting!
            </h3>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.8rem", textAlign: "center", marginBottom: 24 }}>
              Bepul marafonga qatnashish uchun
            </p>
            {(["Ismingiz", "+998 __ ___ __ __"] as const).map((ph, i) => (
              <input
                key={i}
                type={i === 0 ? "text" : "tel"}
                placeholder={ph}
                value={i === 0 ? name : phone}
                onChange={(e) => i === 0 ? setName(e.target.value) : setPhone(e.target.value)}
                style={{
                  display: "block", width: "100%", marginBottom: 12,
                  padding: "13px 15px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 10, color: "#fff", fontSize: "0.93rem",
                  outline: "none", fontFamily: "Inter,sans-serif",
                }}
              />
            ))}
            <button
              onClick={() => { if (name && phone) setSent(true); }}
              style={{
                width: "100%", marginTop: 10, padding: "15px",
                background: "linear-gradient(180deg,#ef4444,#dc2626 50%,#b91c1c)",
                border: "none", borderRadius: 10,
                color: "#fff", fontWeight: 800, fontSize: "0.92rem",
                letterSpacing: "2px", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "Inter,sans-serif",
                boxShadow: "0 6px 0 #7f1d1d, 0 12px 28px rgba(220,38,38,0.4)",
                transition: "all 0.14s ease",
              }}
            >
              DAVOM ETISH
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Page() {
  const [popup, setPopup] = useState(false);
  const [vis, setVis] = useState(false);
  const { d, h, m, s } = useCountdown(new Date("2024-12-24T20:00:00"));

  useEffect(() => { const t = setTimeout(() => setVis(true), 50); return () => clearTimeout(t); }, []);

  // Actual images from the original site CDN
  const PERSON = "./opa.png";
  const OVAL   = "https://static.tildacdn.one/tild3332-3265-4563-b065-643064633266/Ellipse_4_6_1.png";

  const bullets = [
    "Qanday qilib dangasalikdan halos bo’lib, maqsad va missiyani to’g’ri qo’yish usulini",
    "Qanday qilib hech qanday bosimlarsiz, shunchaki Yaratgan dangasalik qilish orqali istalgan orzu - maqsadga oson erishish usullarini",
    "2026 yilda daromadni oshirish va istalgan ko’nikmani 10 barobar tezroq o’rganish usullarini",
    'Qanday qilib dangasalikni yengib, hushu ila ibodat qilish usullarini psixologik tomondan tahlillarini ko’rib chiqamiz.'
  ];

  return (
    <>
      {/* ─── Styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&subset=latin,cyrillic&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{
          background:#0b1526;
          font-family:'Inter',sans-serif;
          overflow-x:hidden;
          -webkit-font-smoothing:antialiased;
        }

        /* fade-up */
        .fu{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
        .fu.v{opacity:1;transform:none}
        .d1{transition-delay:.05s} .d2{transition-delay:.13s} .d3{transition-delay:.21s}
        .d4{transition-delay:.29s} .d5{transition-delay:.37s} .d6{transition-delay:.45s}
        .d7{transition-delay:.53s} .d8{transition-delay:.61s}

        /* badge */
        .badge{
          display:inline-block;
          border:2px solid #dc2626;border-radius:999px;
          padding:10px 26px;background:transparent;
          animation:bGlow 2.5s ease-in-out infinite;
        }
        @keyframes bGlow{
          0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0)}
          50%{box-shadow:0 0 14px 3px rgba(220,38,38,.3),0 0 35px 6px rgba(220,38,38,.08)}
        }

        /* person float */
        @keyframes floatY{
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-9px)}
        }
        .float-person{animation:floatY 5s ease-in-out infinite}

        /* bepul shimmer */
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .bepul{
          background:linear-gradient(90deg,#fff 20%,#fca5a5 50%,#fff 80%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 3s linear infinite;
          font-weight:900;font-size:2rem;letter-spacing:2px;line-height:1;
        }

        /* cta */
        .cta{
          display:block;width:100%;
          padding:19px 0;border:none;border-radius:12px;
          background:linear-gradient(180deg,#ef4444 0%,#dc2626 45%,#b91c1c 100%);
          color:#fff;font-family:'Inter',sans-serif;
          font-weight:800;font-size:1rem;letter-spacing:2.5px;text-transform:uppercase;
          cursor:pointer;position:relative;overflow:hidden;
          box-shadow:0 7px 0 #7f1d1d,0 12px 32px rgba(220,38,38,.45),inset 0 1px 0 rgba(255,255,255,.18);
          transform:perspective(600px) rotateX(0) translateY(0);
          transition:all .14s cubic-bezier(.34,1.56,.64,1);
        }
        .cta::after{
          content:'';position:absolute;top:0;left:-110%;width:55%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
          transform:skewX(-20deg);transition:left .5s ease;
        }
        .cta:hover{transform:perspective(600px) rotateX(5deg) translateY(-4px);box-shadow:0 11px 0 #7f1d1d,0 20px 45px rgba(220,38,38,.55),inset 0 1px 0 rgba(255,255,255,.22)}
        .cta:hover::after{left:150%}
        .cta:active{transform:perspective(600px) rotateX(-2deg) translateY(5px);box-shadow:0 2px 0 #7f1d1d,0 4px 12px rgba(220,38,38,.3)}

        /* bullet hover */
        .brow{display:flex;align-items:flex-start;gap:13px;transition:transform .22s ease;cursor:default}
        .brow:hover{transform:translateX(5px)}

        /* hero */
        .hero{
          min-height:100svh;position:relative;overflow:hidden;
          background:radial-gradient(ellipse 80% 55% at 50% -8%,rgba(30,58,138,.22) 0%,transparent 65%),
                      radial-gradient(ellipse 45% 35% at 85% 65%,rgba(220,38,38,.05) 0%,transparent 60%),
                      #0b1526;
        }
        .hero::before{
          content:'';position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),
                           linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px);
          background-size:44px 44px;pointer-events:none;
        }

        /* footer */
        .foot{background:#050505;position:relative}
        .foot::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,#dc2626 50%,transparent);
        }
        .ph{color:#fff;text-decoration:none;display:inline-block;transition:all .25s ease}
        .ph:hover{text-shadow:0 0 20px rgba(220,38,38,.6),0 0 40px rgba(220,38,38,.3);transform:scale(1.02)}

        /* cd box */
        .cd-box{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;backdrop-filter:blur(8px)}
        .cd-num{
          background:linear-gradient(155deg,#1e3a5f,#0d1f3c);
          border:1px solid rgba(220,38,38,.18);border-radius:10px;
          width:62px;height:62px;display:flex;align-items:center;justify-content:center;
          font-size:1.5rem;font-weight:900;color:#fff;
          box-shadow:0 4px 0 rgba(0,0,0,.5),0 0 10px rgba(220,38,38,.07);
          font-variant-numeric:tabular-nums;letter-spacing:-1px;
        }
      `}</style>

      <Popup open={popup} onClose={() => setPopup(false)} />

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero">
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "36px 22px 52px" }}>

          {/* 1. Badge */}
          <div className={`fu d1${vis?" v":""}`} style={{ textAlign: "center", marginBottom: 20, }}>
            <span className="badge">
              <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.87rem" }}>
                8-9-10 May | Soat 20:00 da
              </span>
            </span>
          </div>

          {/* 2. Subtitle */}
          <div className={`fu d2${vis?" v":""}`} style={{ textAlign: "center", marginBottom: 18 }}>
            <p style={{ color: "rgba(255,255,255,.62)", fontSize: "0.9rem", fontWeight: 400 }}>
              Iman Akhmedovna bilan 3 kunlik bepul marafon
            </p>
          </div>

          {/* 4. Question */}
          <div className={`fu d4${vis?" v":""}`} style={{ textAlign: "center", marginBottom: 26 }}>
            <h2 style={{
              color: "#fff", fontWeight: 800,
              fontSize: "clamp(1.05rem,4.7vw,1.2rem)",
              lineHeight: 1.55,
            }}>
              Qanday qilib dangasalikdan 3 ta yo’l orqali halos bo’lib , muvaffaqiyatli ayol bo’lish sirlari
            </h2>
          </div>

          {/* 5. Bullets + Person */}
          <div className={`fu d5${vis?" v":""}`} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 26 }}>

            {/* Bullets */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
              {bullets.map((txt, i) => (
                <div key={i} className="brow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={OVAL} alt="" width={18} height={10}
                    style={{ width: 18, height: 10, objectFit: "contain", flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: "rgba(255,255,255,.85)", fontSize: "11px", fontWeight: 400, lineHeight: 1.55 }}>
                    {txt}
                  </p>
                </div>
              ))}
            </div>

            {/* Person photo */}
            <div style={{ flexShrink: 0, width: 200 }} className="">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PERSON}
                alt="Dovranbek Turdiev"
                style={{
                  width: "100%", height: "auto", display: "block",
                  filter: "drop-shadow(0 18px 38px rgba(0,0,0,.55)) drop-shadow(0 0 12px rgba(220,38,38,.1))",
                }}
              />
            </div>
          </div>

          
          {/* 7. CTA */}
          <div className={`fu d7${vis?" v":""}`} style={{ marginBottom: 28 }}>
            <button className="cta" onClick={() => setPopup(true)}>
              RO&apos;YXATDAN O&apos;TISH
            </button>
            <br />
            <div className="flex items-center justify-center gap-3">
                    <img
  src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
  alt="arrow"
  className="w-12 transition-transform duration-200 hover:translate-x-1 invert"
/>
                    <span className="text-4xl font-extrabold text-white">BEPUL</span>
                </div>
          </div>

         
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="foot">
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "48px 24px 40px", textAlign: "center" }}>

          <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#dc2626,#ef4444)", borderRadius: 999, margin: "0 auto 30px", boxShadow: "0 0 12px rgba(220,38,38,.5)" }} />
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)", margin: "0 0 22px" }} />
          <p style={{ color: "rgba(255,255,255,.22)", fontSize: "0.73rem", lineHeight: 1.7, marginBottom: 28 }}>
            This site or product is not part of or endorsed by Facebook, Google, or any
            social media platform in any way. FACEBOOK is a trademark of META PLATFORMS,
            Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc.
          </p>
          <p style={{ color: "rgba(255,255,255,.13)", fontSize: "0.68rem" }}>
            Barcha huquqlar himoyalangan, 2026.
          </p>
        </div>
      </footer>
    </>
  );
}