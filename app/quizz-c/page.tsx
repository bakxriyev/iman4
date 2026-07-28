"use client";

import Link from "next/link";

// =====================================================
// O'zgartirish uchun:  RESULT_TEXT  va  VIDEO_URL
// =====================================================
const RESULT_TEXT = {
  badge: "SIZNING NATIJANGIZ",
  paragraphs: [
   "Sizda ishongan insonlaringiz tomonidan berilgan qalb yaralari hali tuzalmagan bo‘lishi mumkin.  Shuning uchun insonlarga nisbatan himoya devorini qo‘yib olgansiz.  Siz qadrlanishni xohlaysiz. Qardingizga yetadigan, hammasini unitishingizga sabab bo’ladigan “ideal inson”ni kutyapsiz. Siz hislaringizni ichda ushlab yuribsiz.    Aslida chuqur sevishni , insonni qadrlashni biladigan insonsiz.  Ammo Sizning hislaringiz siz xoxlagandek qadr - qiymatini topmagan.   Siz munosabatni saqlab qolishga urinib yashayapsiz to’g’rimi ? Sizning javobingiz aslida qalbingiz eng ko‘p nimaga muhtojligini ko‘rsatadi…"
  ],
  // 📌 Video oldi xabari (siz so‘ragan matn)
  preVideoMessage: [
    "🤍 Natijangiz qanday chiqmasin, bu sizning qalbingiz hozir nimaga ehtiyoj sezayotganini ko‘rsatadi.",
    "✨ Ba’zan ayolning munosabatlari uning ichki holati bilan chambarchas bog‘liq bo‘ladi.",
    "🌙 Duo esa qalb holatini va taqdirni o‘zgartirishni boshlaydigan eng kuchli qadamlardan biri bo‘lishi mumkin.",
    "🎥 Habibi siz uchun “Duo nega ijobat bo‘lmaydi?” mavzusida yangi BEPUL video darslik tayyorladim.  Ushbu  darslikni ko‘rib, ichki bloklar, ruhiy holat va duo orasidagi bog‘liqlikni chuqurroq tushunib olishingiz va hayotingizni yaxshi tomonga o’zgartirishingiz mumkin.",
  ],
  highlight: "Siz to'g'ri yo'ldasiz — endi faqat to'g'ri yo'nalish kerak!",
  videoCta: "VIDEONI KO'RISH",
  videoUrl: "https://youtu.be/cYIjxI8_R0M?si=kqLsqNYh57sH8rya", // <-- o'zgartiring
  backLabel: "← Bosh sahifaga",
};
// =====================================================

export default function ResultPage() {
  return (
    <main
      className="min-h-screen font-sans overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #1e0f1a 0%, #2d1228 40%, #1a0d20 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        /* ===== 3D VIDEO BUTTON ===== */
        .btn-video {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-decoration: none;
          padding: 18px 38px;
          border-radius: 22px;
          background: linear-gradient(180deg, #f06bb0 0%, #d63384 45%, #a8255f 100%);
          box-shadow:
            0 8px 0 #7a1240,
            0 14px 30px rgba(214,51,132,0.55),
            inset 0 1px 0 rgba(255,255,255,0.32);
          transition: all 0.12s ease;
          transform: translateY(0px);
          user-select: none;
        }
        .btn-video:hover {
          background: linear-gradient(180deg, #f87bbf 0%, #e03d8f 45%, #b82d6a 100%);
          box-shadow:
            0 6px 0 #7a1240,
            0 10px 24px rgba(214,51,132,0.6),
            inset 0 1px 0 rgba(255,255,255,0.36);
          transform: translateY(2px);
        }
        .btn-video:active {
          box-shadow:
            0 2px 0 #7a1240,
            0 4px 12px rgba(214,51,132,0.4),
            inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(6px);
        }

        /* Play icon pulse */
        .play-ring {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          animation: pulse-ring 2s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }

        /* Result card */
        .result-card {
          background: linear-gradient(135deg, rgba(50,18,40,0.92) 0%, rgba(75,28,58,0.88) 100%);
          border: 1.5px solid rgba(224,84,154,0.35);
          border-radius: 28px;
          backdrop-filter: blur(10px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* Score bar */
        .score-bar-bg {
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
          height: 8px;
        }
        .score-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #d63384, #f472b6);
          box-shadow: 0 0 10px rgba(244,114,182,0.6);
          animation: grow 1.4s cubic-bezier(.4,0,.2,1) forwards;
          width: 0%;
        }
        @keyframes grow {
          to { width: 62%; }
        }

        /* Paragraph text fade-in */
        .fade-in {
          opacity: 0;
          transform: translateY(18px);
          animation: fadeUp 0.7s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Highlight box */
        .highlight-box {
          border-left: 4px solid #e0549a;
          background: rgba(224,84,154,0.1);
          border-radius: 0 14px 14px 0;
          padding: 16px 20px;
        }

        /* Back link */
        .back-link {
          color: #c084a4;
          font-size: 0.8rem;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .back-link:hover { color: #f472b6; }

        /* Pre-video message styling (kichraytirilgan shrift) */
        .pre-video-msg {
          color: #e8c4d6;
          font-size: 0.85rem;
          line-height: 1.65;
        }

        /* Chiroyli nurli ajratuvchi chiziq */
        .glow-separator {
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent 0%,
            #e0549a 20%,
            #f472b6 50%,
            #e0549a 80%,
            transparent 100%
          );
          box-shadow: 0 0 12px #f472b6, 0 0 6px rgba(224,84,154,0.8);
          margin: 24px 0;
          border-radius: 2px;
          opacity: 0.9;
        }
      `}</style>

      {/* ===== BG BLOBS ===== */}
      <div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(224,84,154,0.2) 0%, transparent 70%)",
          transform: "translate(-40%, -40%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 pointer-events-none"
        style={{
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,64,126,0.18) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-2xl">
          {/* Main result card */}
          <div className="result-card p-6 md:p-10 fade-in -mt-8" style={{ animationDelay: "0.1s" }}>

            {/* Badge */}
            <p
              className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "#f472b6" }}
            >
              {RESULT_TEXT.badge}
            </p>

            {/* Score bar */}
            <div className="score-bar-bg mb-5">
              <div className="score-bar-fill" />
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "22px" }} />

            {/* Paragraphs (kichraytirilgan matn) */}
            <div className="flex flex-col gap-3 mb-4">
              {RESULT_TEXT.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="fade-in"
                  style={{
                    color: "#d4a0bc",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    animationDelay: `${0.4 + i * 0.12}s`,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* ===== NURLI AJRATUVCHI CHIZIQ ===== */}
            <div className="glow-separator fade-in" style={{ animationDelay: "0.64s" }} />

            {/* ===== Video oldi xabari (kichraytirilgan matn) ===== */}
            <div className="flex flex-col gap-3 mb-5">
              {RESULT_TEXT.preVideoMessage.map((msg, i) => (
                <p
                  key={i}
                  className="pre-video-msg fade-in"
                  style={{
                    animationDelay: `${0.7 + i * 0.1}s`,
                  }}
                >
                  {msg}
                </p>
              ))}
            </div>

            {/* Video CTA button */}
            <div className="flex justify-center fade-in" style={{ animationDelay: "1.1s" }}>
              <a
                href={RESULT_TEXT.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-video"
              >
                <span className="play-ring">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </span>
                <span>{RESULT_TEXT.videoCta}</span>
              </a>
            </div>
          </div>

          {/* Author strip below card */}
          <div
            className="mt-5 flex items-center gap-3 justify-center fade-in"
            style={{ animationDelay: "1.3s" }}
          >
            <img
              src="./oxr.png"
              alt="Davronbek Turdiev"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #e0549a",
              }}
            />
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "12px" }}>Iman Akhmedovna</p>
              <p style={{ color: "#c084a4", fontSize: "10px" }}>Oliy ma`lumotli psixolog</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 px-6 text-center" style={{ background: "#0f0610" }}>
        <p className="font-semibold text-sm mb-1" style={{ color: "#f0c6dc" }}>Iman Akhmedovna</p>
        <p className="text-xs mb-2" style={{ color: "#9a6b7e" }}>&quot;IMAN ACADEMY&quot; MCHJ</p>
        <p className="text-xs max-w-lg mx-auto mb-2" style={{ color: "#6e4560" }}>
          This site or product is not part of or endorsed by Facebook, Google, or any social media platform in any way.
        </p>
        <p className="text-xs" style={{ color: "#6e4560" }}>Barcha huquqlar himoyalangan, 2026.</p>
      </footer>
    </main>
  );
}