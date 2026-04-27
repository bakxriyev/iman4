'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

const ARROW_SRC = "https://static.tildacdn.one/tild3134-6537-4562-a236-353632313365/Arrow_7.svg";

const benefits = [
  "Energiyasizlikdan qanday qilib xalos bo'lishni",
  `Insonning "ego"si nimalarga qodir?`,
  "Energiyasizlikdan xalos bo'lish uchun O'zim doimiy foydalanib keladigan 3 ta texnikani bilib olasiz.",
];

function BepulBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const arrowW = size === "sm" ? "w-8" : size === "lg" ? "w-10" : "w-9";
  const textSz = size === "sm" ? "text-xl" : size === "lg" ? "text-[28px]" : "text-2xl";
  return (
    <div className="flex items-center justify-center gap-2.5 mt-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ARROW_SRC}
        alt="arrow"
        className={`${arrowW} h-auto [filter:brightness(0)] arrow-bounce`}
      />
      <span className={`${textSz} font-extrabold tracking-wide text-[#111] leading-none montserrat`}>
        BEPUL
      </span>
    </div>
  );
}

function CTAButton({ onClick, fontSize = 15 }: { onClick: () => void; fontSize?: number }) {
  return (
    <button onClick={onClick} className="btn-3d w-full h-full">
      <span style={{ fontSize }}>VIDEODARSNI KO&apos;RISH</span>
      <span className="wiggle" style={{ fontSize: fontSize + 1 }}>→</span>
    </button>
  );
}

export default function VSLPage() {
  const router = useRouter();

  const goToThankYou = () => router.push("/thankyou");

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
      `}</style>

      <main className="relative min-h-screen bg-[#e8e5e0] montserrat">
        <div className="relative max-w-[1200px] mx-auto">

          {/* ═══════ MOBILE (< md) ═══════ */}
          <div className="block md:hidden relative" style={{ minHeight: 600 }}>

            <p className="absolute top-[30px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase text-center text-black tracking-widest"
              style={{ fontFamily: "'Inter',sans-serif" }}>
              Iman Akhmedovnadan bepul videodarslik
            </p>

            <p className="absolute top-[62px] left-1/2 -translate-x-1/2 text-center text-black font-extrabold leading-snug text-[20px]"
              style={{ width: 330 }}>
              Qanday qilib 3 ta texnika orqali energiyasizlikdan xalos bo&apos;lish mumkin?
            </p>

            <div className="absolute left-1/2 -mt-12 -translate-x-1/2 rounded-2xl overflow-hidden border-2 border-[#8b6cff]"
              style={{ top: 200, width: 320 }}>
              <Image src="/vsl.jpg" alt="thumbnail" width={320} height={180}
                className="w-full block" priority />
            </div>

            {/* Tugma 1 — mobile */}
            <div className="absolute left-1/2 -mt-15 -translate-x-1/2" style={{ top: 410, width: 300, height: 62 }}>
              <CTAButton onClick={goToThankYou} fontSize={14} />
            </div>

            {/* BEPUL 1 — mobile */}
            <div className="absolute left-1/2 -mt-15 -translate-x-1/2" style={{ top: 488 }}>
              <BepulBadge size="md" />
            </div>
          </div>

          {/* ═══════ DESKTOP (≥ md) ═══════ */}
          <div className="hidden md:flex flex-col items-center justify-center min-h-screen gap-7 py-16 px-8">

            <p className="text-[13px] uppercase tracking-widest text-[#111]"
              style={{ fontFamily: "'Inter',sans-serif" }}>
              Iman Akhmedovnadan bepul videodarslik
            </p>

            <h1 className="font-extrabold text-[36px] leading-snug text-center text-[#111] max-w-[680px]">
              Qanday qilib 3 ta texnika orqali energiyasizlikdan xalos bo&apos;lish mumkin?
            </h1>

            <div className="rounded-[30px] -mt-2 overflow-hidden w-[min(640px,90vw)]">
              <Image src="/vsl.jpg" alt="thumbnail" width={640} height={360}
                className="w-full block" priority />
            </div>

            {/* Tugma 2 — desktop */}
            <div className="w-[360px] h-[70px]">
              <CTAButton onClick={goToThankYou} fontSize={16} />
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

              {/* Sarlavha */}
              <div className="flex items-center text-center flex-wrap gap-3 mb-6">
                <span className="font-extrabold text-center align-center text-[18px] text-[#111]">
                  Bepul Video Darsda Siz:
                </span>
              </div>

              {/* Benefits ro'yxati */}
              <div className="flex flex-col gap-3">
                {benefits.map((item, i) => (
                  <div
                    key={i}
                    className="b-item flex items-start gap-3.5 bg-[#f7f5f2] rounded-[18px] px-4 py-4 border border-[#ede9e2]"
                  >
                    <div className="min-w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#e00000] to-[#ff6b6b] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(200,0,0,0.25)] mt-0.5">
                      <span className="text-white font-extrabold text-[14px]">{i + 1}</span>
                    </div>
                    <p className="font-semibold text-[15px] leading-[1.55] text-[#1a1a1a] m-0">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-[#ede9e2] my-6" />

              {/* Tugma 3 — benefits ichida */}
              <div className="w-full h-[62px]">
                <CTAButton onClick={goToThankYou} fontSize={14} />
              </div>

              <div className="mt-8">
                <BepulBadge size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-5 py-8 text-center text-[12px] leading-relaxed text-[#888]"
          style={{ fontFamily: "'Inter',sans-serif" }}>
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