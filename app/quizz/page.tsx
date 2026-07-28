"use client";

import Link from "next/link";

export default function QuizPage() {
  return (
    <main
      className="min-h-screen font-sans overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #1e0f1a 0%, #2d1228 40%, #1a0d20 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap');

        /* ===== 3D BUTTON ===== */
        .btn-3d {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: 0.05em;
          text-decoration: none;
          padding: 20px 38px;
          border-radius: 20px;
          background: linear-gradient(180deg, #f06bb0 0%, #d63384 40%, #a8255f 100%);
          box-shadow:
            0 8px 0 #7a1240,
            0 12px 24px rgba(214,51,132,0.55),
            inset 0 1px 0 rgba(255,255,255,0.3);
          transition: all 0.12s ease;
          transform: translateY(0px);
          user-select: none;
        }
        .btn-3d:hover {
          background: linear-gradient(180deg, #f87bbf 0%, #e03d8f 40%, #b82d6a 100%);
          box-shadow:
            0 6px 0 #7a1240,
            0 10px 20px rgba(214,51,132,0.6),
            inset 0 1px 0 rgba(255,255,255,0.35);
          transform: translateY(2px);
        }
        .btn-3d:active {
          box-shadow:
            0 2px 0 #7a1240,
            0 4px 10px rgba(214,51,132,0.4),
            inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(6px);
        }

        /* Mobile button */
        .btn-3d-sm {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          padding: 16px 28px;
          border-radius: 16px;
          background: linear-gradient(180deg, #f06bb0 0%, #d63384 40%, #a8255f 100%);
          box-shadow:
            0 6px 0 #7a1240,
            0 10px 20px rgba(214,51,132,0.5),
            inset 0 1px 0 rgba(255,255,255,0.3);
          transition: all 0.12s ease;
          transform: translateY(0px);
          user-select: none;
        }
        .btn-3d-sm:active {
          box-shadow:
            0 2px 0 #7a1240,
            0 4px 10px rgba(214,51,132,0.4),
            inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(4px);
        }

        /* Hero image gradient fade */
        .hero-img-wrap {
          position: relative;
        }
        .hero-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 55%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(35, 12, 32, 0.55) 60%,
            rgba(30, 10, 26, 0.95) 100%
          );
          border-radius: 0 0 16px 16px;
          pointer-events: none;
          z-index: 2;
        }
        .hero-img-wrap img.main-photo {
          display: block;
          position: relative;
          z-index: 1;
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background glow blobs */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224,84,154,0.25) 0%, transparent 70%)",
            transform: "translate(-35%, -35%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(194,64,126,0.2) 0%, transparent 70%)",
            transform: "translate(25%, 25%)",
          }}
        />

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:flex relative z-10 w-full max-w-7xl mx-auto px-10 lg:px-16 py-20 items-center justify-between gap-8">

          {/* LEFT: Text content */}
          <div className="flex-1 max-w-[520px]">

            {/* Badge */}
            <p
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ color: "#f472b6" }}
            >
              IMAN AKHMEDOVNDADAN MAXSUS TEST
            </p>

            {/* SVG Heading */}
            <div className="text-[16px] text-white  font-bold  mb-4 max-w-xs">
            <p
              style={{
                width: "full",
                height: "full",
              }}
            >2 daqiqa ichida er - xotin munosabatlari bilan bog’liq muammolaringizga tayyot yechim oling</p>
          </div>

            {/* Description */}
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "#e8b4d0" }}
            >
              10 ta savoldan iborat maxsus test orqali{" "}
              <br />
             er - xotin munosabatlari bilan bog’liq muammolaringizga tayyot yechim oling
              <br />
            
            </p>

            {/* CTA Button — 3D */}
            <Link
              href="https://supermiya.typeform.com/to/mvkicYIF"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d"
            >
              <span>TESTNI BOSHLASH</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Author card */}
            <div
              className="mt-12 inline-flex items-center gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(50,20,40,0.95) 0%, rgba(90,30,65,0.9) 100%)",
                border: "2px solid #8b3a6e",
                borderRadius: "15px",
                padding: "16px 20px",
              }}
            >
              <img
                src="./oxr.png"
                alt="Davronbek Turdiev"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #e0549a",
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                 Iman Akhmedovna
                </p>
                <p style={{ color: "#e8b4d0", fontSize: "13px", lineHeight: "1.4" }}>
                  Oliy ma`lumotli psixolog
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Hero image with gradient */}
          <div className="flex-shrink-0 relative hero-img-wrap" style={{ width: "480px" }}>
            {/* Decorative icons */}
            <img
              src="https://static.tildacdn.one/tild3637-3936-4665-b030-383536666630/Image_3_1.png"
              alt=""
              style={{ position: "absolute", width: "70px", bottom: "200px", left: "-30px", zIndex: 3 }}
            />
            <img
              src="https://static.tildacdn.one/tild3036-6339-4366-b966-386565653264/Image_4_1.png"
              alt=""
              style={{ position: "absolute", width: "80px", top: "30px", right: "-20px", zIndex: 3 }}
            />
            {/* Main hero image */}
            <img
              src="/opa.png"
              alt="Hero"
              className="main-photo"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 0 40px rgba(224,84,154,0.3))",
              }}
            />
          </div>
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="flex md:hidden relative z-10 flex-col w-full px-5 pt-10 pb-8 items-center text-center">

          {/* Badge */}
          <p
            className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: "#f472b6" }}
          >
            IMAN AKHMEDOVNADAN MAXSUS TEST
          </p>

          {/* SVG Heading */}
          <div className="text-[16px] text-white font-bold  mb-4 max-w-xs">
            <p
              style={{
                width: "full",
                height: "full",
              }}
            >2 daqiqa ichida er - xotin munosabatlari bilan bog’liq muammolaringizga tayyor yechim oling</p>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6 max-w-xs"
            style={{ color: "#e8b4d0" }}
          >
            10 ta savoldan iborat maxsus test orqali   er - xotin munosabatlari bilan bog’liq muammolaringizga tayyot yechim oling
          </p>

          {/* CTA Button — 3D mobile */}
          <Link
            href="https://form.typeform.com/to/E7yJKaue"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-sm mb-8"
          >
            <span>TESTNI BOSHLASH</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Author card */}
          <div
            className="inline-flex items-center gap-3 mb-8"
            style={{
              background: "linear-gradient(135deg, rgba(50,20,40,0.95) 0%, rgba(90,30,65,0.9) 100%)",
              border: "2px solid #8b3a6e",
              borderRadius: "14px",
              padding: "12px 16px",
            }}
          >
            <img
              src="./oxr.png"
              alt="Iman Akhmedovna"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #e0549a",
                flexShrink: 0,
              }}
            />
            <div style={{ textAlign: "left" }}>
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px", marginBottom: "3px" }}>
                Iman Akhmedovna
              </p>
              <p style={{ color: "#e8b4d0", fontSize: "11px", lineHeight: "1.4" }}>
                Oliy ma&apos;lumotli psixolog
              </p>
            </div>
          </div>

          {/* Mobile hero image with gradient */}
          <div className="hero-img-wrap relative w-full flex justify-center" style={{ maxWidth: "340px" }}>
            <img
              src="https://static.tildacdn.one/tild3637-3936-4665-b030-383536666630/Image_3_1.png"
              alt=""
              style={{
                position: "absolute",
                width: "50px",
                height: "auto",
                bottom: "120px",
                left: "0px",
                zIndex: 3,
              }}
            />
            <img
              src="https://static.tildacdn.one/tild3036-6339-4366-b966-386565653264/Image_4_1.png"
              alt=""
              style={{
                position: "absolute",
                width: "55px",
                height: "auto",
                top: "20px",
                right: "0px",
                zIndex: 3,
              }}
            />
            <img
              src="https://static.tildacdn.one/tild6332-3630-4134-a331-383961373334/Group_3.png"
              alt=""
              style={{
                position: "absolute",
                width: "180px",
                top: "-40px",
                left: "-30px",
                opacity: 0.5,
                zIndex: 0,
              }}
            />
            <img
              src="/opa.png"
              alt="Hero"
              className="main-photo"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 0 30px rgba(224,84,154,0.35))",
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="py-10 px-6 text-center"
        style={{ background: "#0f0610" }}
      >
        <p className="font-semibold text-base mb-1" style={{ color: "#f0c6dc" }}>
          Iman Akhmedovna
        </p>
        <p
          className="text-xs max-w-lg mx-auto leading-relaxed mb-3"
          style={{ color: "#9a6b7e" }}
        >
          &quot;IMAN ACADEMY&quot; MCHJ
        </p>
        <p
          className="text-xs max-w-lg mx-auto leading-relaxed mb-3"
          style={{ color: "#6e4560" }}
        >
          This site or product is not part of or endorsed by Facebook, Google, or any social media platform in any way.
          FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc.
        </p>
        <p className="text-xs" style={{ color: "#6e4560" }}>
          Barcha huquqlar himoyalangan, 2026.
        </p>
      </footer>
    </main>
  );
}