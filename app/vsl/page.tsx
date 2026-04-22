'use client'

import Image from "next/image";

export default function VSLPage() {
  const openTelegram = () =>
    window.open(
      "https://t.me/iman_ahmedovnaa_bot?start=start",
      "_blank",
      "noopener,noreferrer"
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400&display=swap');

        /* ───── 3D Button ───── */
        .btn-3d {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.5px;
          cursor: pointer;
          border: none;
          outline: none;
          background: linear-gradient(180deg, #ff6b6b 0%, #ff2d2d 40%, #e00000 100%);
          box-shadow:
            0 2px 0 #c40000,
            0 4px 0 #a80000,
            0 6px 0 #8c0000,
            0 8px 0 #700000,
            0 10px 20px rgba(200,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.35),
            inset 0 -2px 4px rgba(0,0,0,0.2);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          animation: glowPulse 2.5s ease-in-out infinite;
        }
        .btn-3d::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 55%);
          pointer-events: none;
        }
        .btn-3d:hover {
          transform: translateY(3px);
          animation: none;
          box-shadow:
            0 1px 0 #c40000,
            0 2px 0 #a80000,
            0 3px 0 #8c0000,
            0 6px 14px rgba(200,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.35),
            inset 0 -2px 4px rgba(0,0,0,0.2);
        }
        .btn-3d:active {
          transform: translateY(8px);
          animation: none;
          box-shadow:
            0 1px 0 #8c0000,
            0 3px 8px rgba(200,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 2px rgba(0,0,0,0.15);
        }
        @keyframes glowPulse {
          0%, 100% {
            box-shadow:
              0 2px 0 #c40000,
              0 4px 0 #a80000,
              0 6px 0 #8c0000,
              0 8px 0 #700000,
              0 10px 20px rgba(200,0,0,0.45),
              inset 0 1px 0 rgba(255,255,255,0.35),
              inset 0 -2px 4px rgba(0,0,0,0.2);
          }
          50% {
            box-shadow:
              0 2px 0 #c40000,
              0 4px 0 #a80000,
              0 6px 0 #8c0000,
              0 8px 0 #700000,
              0 14px 32px rgba(200,0,0,0.6),
              inset 0 1px 0 rgba(255,255,255,0.35),
              inset 0 -2px 4px rgba(0,0,0,0.2),
              0 0 28px rgba(255,60,60,0.45);
          }
        }

        /* ───── Arrow bounce ───── */
        .arrow-bounce {
          animation: bounceArrow 1.4s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes bounceArrow {
          0%, 100% { transform: rotate(-40deg) translateY(0); }
          50%       { transform: rotate(-40deg) translateY(-6px); }
        }

        /* ───── Wiggle arrow inside button ───── */
        .wiggle {
          animation: wiggle 1.2s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(5px); }
        }

        /* ───── Desktop layout ───── */
        .desktop-wrapper {
          display: none;
        }
        @media (min-width: 768px) {
          .mobile-wrapper  { display: none; }
          .desktop-wrapper { display: flex; }
        }
      `}</style>

      <main className="relative min-h-screen bg-[#e8e5e0]">
        <div className="relative max-w-[1200px] mx-auto">

          {/* ══════════════════════════════
              MOBILE LAYOUT  (< 768px)
          ══════════════════════════════ */}
          <div
            className="mobile-wrapper block md:hidden relative"
            style={{ minHeight: 650 }}
          >
            {/* Label */}
            <div
              className="absolute left-1/2 -translate-x-1/2 text-black text-[11px] uppercase text-center"
              style={{
                top: 30,
                whiteSpace: "nowrap",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Iman Akhmedovnadan bepul videodarslik
            </div>

            {/* Headline */}
            <div
              className="absolute left-1/2 -translate-x-1/2 text-black text-center"
              style={{
                top: 62,
                width: 330,
                fontSize: 20,
                lineHeight: 1.25,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
              }}
            >
              Qanday qilib 3 ta texnika orqali energiyasizlik xalos bo&apos;lish
              mumkin?
            </div>

            {/* Thumbnail */}
            <div
              className="absolute left-1/2 -mt-12 -translate-x-1/2 rounded-2xl overflow-hidden border border-[#8b6cff]"
              style={{ top: 208, width: 320 }}
            >
              <Image
                src="/vsl.png"
                alt="thumbnail"
                width={320}
                height={180}
                style={{ width: "100%", display: "block" }}
                priority
              />
            </div>

            {/* CTA Button — MOBILE */}
            <div
              className="absolute left-1/2 -mt-12 -translate-x-1/2"
              style={{ top: 428, width: 300, height: 65 }}
            >
              <button
                onClick={openTelegram}
                className="btn-3d"
                style={{ fontSize: 14 }}
              >
                VIDEODARSNI KO&apos;RISH
                <span className="wiggle" style={{ fontSize: 15 }}>→</span>
              </button>
            </div>

            {/* "BEPUL" badge with arrow */}
            <div
              className="absolute flex items-center -mt-12"
              style={{
                top: 516,
                left: "60%",
                transform: "translateX(-115px)",
                gap: 25,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://static.tildacdn.one/tild3134-6537-4562-a236-353632313365/Arrow_7.svg"
                alt="arrow"
                className="arrow-bounce"
                style={{ width: 36, height: "auto", filter: "brightness(0)" }}
              />
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: 24,
                  letterSpacing: 1,
                  color: "#111",
                  lineHeight: 1,
                }}
              >
                BEPUL
              </span>
            </div>
          </div>

          {/* ══════════════════════════════
              DESKTOP LAYOUT  (≥ 768px)
          ══════════════════════════════ */}
          <div
            className="desktop-wrapper hidden md:flex flex-col items-center justify-center py-16 px-8"
            style={{ minHeight: "100vh", gap: 32 }}
          >
            {/* Label */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#111",
              }}
            >
              Iman Akhmedovnadan bepul videodarslik
            </p>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: 36,
                lineHeight: 1.25,
                textAlign: "center",
                color: "#111",
                maxWidth: 680,
              }}
            >
              Qanday qilib 3 ta texnika orqali energiyasizlik xalos bo&apos;lish
              mumkin?
            </h1>

            {/* Thumbnail */}
            <div
              className="rounded-2xl overflow-hidden border border-[#8b6cff]"
              style={{ width: "min(640px, 90vw)" }}
            >
              <Image
                src="/vsl.png"
                alt="thumbnail"
                width={640}
                height={360}
                style={{ width: "100%", display: "block" }}
                priority
              />
            </div>

            {/* CTA Row — DESKTOP */}
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://static.tildacdn.one/tild3134-6537-4562-a236-353632313365/Arrow_7.svg"
                alt="arrow"
                className="arrow-bounce"
                style={{
                  width: 44,
                  height: "auto",
                  filter: "brightness(0)",
                  transform: "rotate(180deg)",
                }}
              />

              <div style={{ width: 340, height: 70 }}>
                <button
                  onClick={openTelegram}
                  className="btn-3d"
                  style={{ fontSize: 16 }}
                >
                  VIDEODARSNI KO&apos;RISH
                  <span className="wiggle" style={{ fontSize: 18 }}>→</span>
                </button>
              </div>

              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  letterSpacing: 1,
                  color: "#111",
                }}
              >
                BEPUL
              </span>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════
            FOOTER — yuridik matn
        ══════════════════════════════ */}
        <footer
          style={{
            padding: "32px 20px",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            lineHeight: 1.7,
            color: "#888",
          }}
        >
          <p>
            OOO &quot;IMAN ACADEMY&quot;
          </p>
          <p style={{ marginTop: 12 }}>
            This site or product is not part of or endorsed by Facebook, Google,
            or any social media platform in any way.
          </p>
          <p style={{ marginTop: 12 }}>
            FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE
            are trademarks of ALPHABET, Inc.
          </p>
        </footer>
      </main>
    </>
  );
}