"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { img } from "framer-motion/client";

// === Supabase konfiguratsiyasi ===
const SUPABASE_URL = "https://vxpvgeyktgyasegvycfp.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === Telegram bot ===
const TELEGRAM_BOT_TOKEN = "8222835015:AAHo0PeldJm8DYiQJdMb2S-Jd1D3dJrVYKc";
const TELEGRAM_CHAT_ID = "-1003522557528";

const PAYMENT_CARDS = {
  uzcard: {
    number: "5614 6822 0535 9393",
    holder: "Shaxlo Alixanova",
  },
  visa: {
    number: "4195 2500 8003 1808",
    holder: "Allanazarova Mamura",
    usdAmount: "305$",
  },
};

// Real logolar CDN yoki rasmiy saytlardan
const PAYMENT_SERVICES = [
  {
    id: "payme",
    name: "Payme",
    logoUrl: "https://cdn.payme.uz/media/logos/payme_logo.svg",
    fallbackLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Payme_logo.svg/1200px-Payme_logo.svg.png",
    color: "#00AAFF",
    bgColor: "#E8F6FF",
    link: "https://payme.uz/fallback/merchant/?id=68ee3f425593d70aa478d706",
    badge: "Online to'lov",
  },
  {
    id: "click",
    name: "CLICK",
    logoUrl: "https://cdn.click.uz/click/assets/images/click-logo.svg",
    fallbackLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Click_logo.svg/1200px-Click_logo.svg.png",
    color: "#0066CC",
    bgColor: "#E8F0FF",
    link: "https://my.click.uz/services/pay?service_id=86564&merchant_id=49607",
    badge: "Online to'lov",
  },
];

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const recordId = searchParams.get("id") || "";
  const full_name = searchParams.get("full_name") || "";
  const phone_number = searchParams.get("phone_number") || "";
  const tariff_label = searchParams.get("tariff_label") || "Pro - 3 690 000";
  const tariff_value = searchParams.get("tariff_value") || "pro";
  const tariff_price = Number(searchParams.get("tariff_price")) || 3690000;

  const [timeLeft, setTimeLeft] = useState(15 * 60);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const isUrgent = timeLeft < 3 * 60;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setError] = useState("");
  const [copiedId, setCopied] = useState("");
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  function handleLogoError(id: string) {
    setLogoErrors((prev) => ({ ...prev, [id]: true }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Faqat rasm (PNG, JPG, JPEG, WEBP) yuklang.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Rasm hajmi 20MB dan oshmasligi kerak.");
      return;
    }
    setError("");
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(""), 2000);
    });
  }

  async function handleSubmit() {
    if (!photo) {
      setError("Iltimos, to'lov chekining rasmini yuklang (screenshot).");
      return;
    }
    if (!recordId || !full_name || !phone_number) {
      setError("Ma'lumotlar topilmadi. Iltimos, orqaga qayting.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append(
        "caption",
        `🆕 Yangi to'lov:\n👤 Ism: ${full_name}\n📞 Tel: ${phone_number}\n📦 Tarif: ${tariff_label}`
      );
      formData.append("photo", photo);

      const telegramRes = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
        { method: "POST", body: formData }
      );

      const telegramJson = await telegramRes.json();
      if (!telegramJson.ok) {
        throw new Error(telegramJson.description || "Telegramga yuborib bo'lmadi");
      }

      const { error: updateError } = await supabase
        .from("taskin")
        .update({ is_uploaded: true })
        .eq("id", recordId);

      if (updateError) console.error("Supabase update error:", updateError);

      setSubmitted(true);
    } catch (err: any) {
      setError(
        err.message.includes("Telegram")
          ? "Telegramga yuborishda xatolik. Qayta urinib ko'ring."
          : `Xatolik: ${err.message}`
      );
    } finally {
      setUploading(false);
    }
  }

  /* ─── Success screen ─── */
  if (submitted) {
    return (
      <>
        <Head><title>TASKIN KURSI</title></Head>
        <div style={styles.page}>
          <div style={{ ...styles.card, textAlign: "center", padding: "48px 32px" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a3535", marginBottom: 12 }}>
              Muvaffaqiyatli yuborildi!
            </h2>
            <p style={{ fontSize: 15, color: "#444", marginBottom: 6 }}>
              Ism: <strong>{full_name}</strong>
            </p>
            <p style={{ fontSize: 15, color: "#444", marginBottom: 24 }}>
              Telefon: <strong>{phone_number}</strong>
            </p>
            <p style={{ fontSize: 13, color: "#777", marginBottom: 24 }}>
              Admin yaqin orada siz bilan bog'lanadi.
            </p>
            <a href="tel:+998951601117" style={styles.btnGreen}>
              📞 +998 95 160 11 17
            </a>
          </div>
        </div>
      </>
    );
  }

  /* ─── Main page ─── */
  return (
    <>
      <Head><title>TASKIN KURSI UCHUN TO`LOV</title></Head>
      <div style={styles.page}>

        {/* ── Timer banner ── */}
        <div style={{
          ...styles.timerBanner,
          background: isUrgent
            ? "linear-gradient(135deg, #FF3B30, #FF6B35)"
            : "linear-gradient(135deg, #1a2a50, #2d4a80)",
        }}>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: 0.3 }}>
              TASKIN KURSI
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
              Tarif: {tariff_value.charAt(0).toUpperCase() + tariff_value.slice(1)}
            </p>
            <p style={{ margin: "6px 0 0", fontWeight: 900, fontSize: 26, color: "#fff" }}>
              {String(tariff_price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
            </p>
          </div>
          <div style={styles.timerBox}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 1, marginBottom: 2, display: "block" }}>
              VAQT
            </span>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: 3, fontVariantNumeric: "tabular-nums" }}>
              {minutes}:{seconds}
            </span>
          </div>
        </div>

        {/* ── Main card ── */}
        <div style={styles.card}>

          {/* Step 1 label */}
          <div style={styles.stepLabel}>
            <span style={styles.stepNum}>1</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
              Quyidagi to'lov turlaridan birini tanlang
            </span>
          </div>

          {/* ── Online payment services ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {PAYMENT_SERVICES.map((svc) => (
              <a
                key={svc.id}
                href={svc.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: svc.bgColor,
                  border: `1.5px solid ${svc.color}22`,
                  borderRadius: 16,
                  padding: "14px 16px",
                  textDecoration: "none",
                  transition: "box-shadow 0.2s, transform 0.15s",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 20px ${svc.color}33`;
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {/* Logo box */}
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
              
                   
                  }}>
                    {svc.id === "payme" && (
                      /* Payme inline SVG logo */
                      <img src='https://api.logobank.uz/media/logos_png/payme-01.png' />
                    )}
                    {svc.id === "click" && (
                      <img src="https://api.logobank.uz/media/logos_png/Click-01_hjB080W.png" alt="Click" />
                    )}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 17, color: svc.color }}>
                      {svc.name}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#777" }}>
                      {svc.badge}
                    </p>
                  </div>
                </div>
                <div style={{
                  background: svc.color,
                  color: "#fff",
                  borderRadius: 10,
                  padding: "8px 14px",
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}>
                  To'lash →
                </div>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
            <span style={{ fontSize: 12, color: "#aaa", fontWeight: 600, letterSpacing: 0.5 }}>
              yoki karta orqali
            </span>
            <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
          </div>

          {/* ── Cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>

       
            {/* Visa */}
            <div style={styles.cardBox}>
              <div style={{ ...styles.cardHeader, background: "linear-gradient(135deg, #1a237e, #283593)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 48, height: 26, borderRadius: 5,
                    background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#1a237e", fontStyle: "italic", letterSpacing: -0.5 }}>VISA</span>
                  </div>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Visa</span>
                </div>
                
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={styles.cardNumber}>{PAYMENT_CARDS.visa.number}</p>
                    <p style={styles.cardHolder}>{PAYMENT_CARDS.visa.holder}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PAYMENT_CARDS.visa.number.replace(/\s/g, ""), "visa")}
                    style={{
                      ...styles.copyBtn,
                      background: copiedId === "visa" ? "#27ae60" : "#f0f0f0",
                      color: copiedId === "visa" ? "#fff" : "#555",
                    }}
                  >
                    {copiedId === "visa" ? "✓" : "📋"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div style={styles.stepLabel}>
            <span style={styles.stepNum}>2</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
              To'lov screenshotini saqlang
            </span>
          </div>

          {/* Step 3 */}
          <div style={{ ...styles.stepLabel, marginBottom: 16 }}>
            <span style={styles.stepNum}>3</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
              Rasmni yuklang va adminga yuboring
            </span>
          </div>

          {/* Upload zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${photoPreview ? "#27ae60" : "#d0d0d0"}`,
              borderRadius: 16,
              minHeight: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              marginBottom: 12,
              background: photoPreview ? "#f0fdf4" : "#fafafa",
              transition: "border-color 0.2s, background 0.2s",
            }}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Screenshot"
                style={{ width: "100%", maxHeight: 280, objectFit: "contain" }}
              />
            ) : (
              <div style={{ textAlign: "center", padding: 24 }}>
                <span style={{ fontSize: 40, display: "block", marginBottom: 10 }}>📷</span>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#333", marginBottom: 6 }}>
                  To'lov screenshotini yuklang
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#aaa" }}>
                  PNG, JPG yoki JPEG (max 20MB)
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {photoPreview && (
            <button
              onClick={() => { setPhoto(null); setPreview(null); }}
              style={{
                background: "transparent",
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 13,
                color: "#555",
                cursor: "pointer",
                marginBottom: 14,
              }}
            >
              🔄 Rasmni o'zgartirish
            </button>
          )}

          {submitError && (
            <div style={{
              background: "#fff0f0",
              border: "1px solid #E63429",
              borderRadius: 10,
              padding: "12px 14px",
              color: "#E63429",
              fontSize: 13,
              marginBottom: 14,
            }}>
              {submitError}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={uploading}
            style={{
              width: "100%",
              padding: "18px 0",
              background: uploading
                ? "#93c5fd"
                : "linear-gradient(135deg, #2563EB, #3B82F6)",
              color: "#fff",
              fontWeight: 900,
              fontSize: 17,
              letterSpacing: 1,
              borderRadius: 14,
              border: "none",
              cursor: uploading ? "not-allowed" : "pointer",
              boxShadow: uploading ? "none" : "0 4px 20px rgba(59,130,246,0.45)",
              transition: "all 0.2s",
            }}
          >
            {uploading ? "YUBORILMOQDA..." : "✅ DAVOM ETISH"}
          </button>
        </div>

        {/* ── Help card ── */}
        <div style={{ ...styles.card, textAlign: "center" }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: "0 0 4px", color: "#1a2a50" }}>
            Yordam kerakmi?
          </p>
          <p style={{ fontSize: 13, color: "#777", margin: "0 0 16px" }}>
            Admin bilan bog'laning
          </p>
          <a
            href="https://t.me/iimaan_admin1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.btnRed,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.32l-1.67 7.88c-.12.55-.45.68-.91.42l-2.52-1.86-1.22 1.17c-.13.13-.25.25-.51.25l.18-2.57 4.65-4.2c.2-.18-.04-.28-.31-.1L7.6 14.04l-2.47-.77c-.54-.17-.55-.54.11-.8l9.64-3.72c.45-.16.84.11.69.8l.36-.01z" fill="#fff"/>
            </svg>
            ADMINGA YOZISH
          </a>
          
        </div>

      </div>
    </>
  );
}

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 48,
    gap: 16,
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  timerBanner: {
    width: "100%",
    maxWidth: 480,
    margin: "0 12px",
    borderRadius: 20,
    padding: "20px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
    boxSizing: "border-box",
  },
  timerBox: {
    background: "rgba(0,0,0,0.25)",
    borderRadius: 14,
    padding: "10px 16px",
    textAlign: "center",
    minWidth: 90,
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 480,
    margin: "0 12px",
    padding: "20px 18px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
  },
  stepLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#2563EB",
    color: "#fff",
    fontSize: 14,
    fontWeight: 800,
    display: "flex" as any,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardBox: {
    border: "1.5px solid #e8e8e8",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  cardHeader: {
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontFamily: "'Courier New', monospace",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: 2,
    margin: "0 0 4px",
    color: "#1a1a1a",
  },
  cardHolder: {
    fontSize: 13,
    color: "#888",
    margin: 0,
    fontWeight: 500,
  },
  copyBtn: {
    border: "none",
    borderRadius: "50%",
    width: 42,
    height: 42,
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
    flexShrink: 0,
  },
  btnRed: {
    display: "block",
    width: "100%",
    padding: "16px 0",
    background: "linear-gradient(135deg, #E63429, #ff5a4d)",
    color: "#fff",
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: 0.8,
    borderRadius: 14,
    textDecoration: "none",
    boxShadow: "0 4px 16px rgba(230,52,41,0.35)",
    boxSizing: "border-box",
  },
  btnGreen: {
    display: "block",
    width: "100%",
    padding: "16px 0",
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    borderRadius: 14,
    textDecoration: "none",
    boxSizing: "border-box",
    boxShadow: "0 4px 16px rgba(39,174,96,0.3)",
  },
};