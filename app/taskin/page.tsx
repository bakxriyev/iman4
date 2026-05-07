"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vxpvgeyktgyasegvycfp.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const COURSE = {
  label: "Taskin kursi",
  value: "taskin",
  price: 150000,
};

const PHONE_CODES = [
  { code: "+998", flag: "🇺🇿" },
  { code: "+7", flag: "🇷🇺" },
  { code: "+1", flag: "🇺🇸" },
];

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+998");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = "Iltimos, ism familiyangizni kiriting (kamida 3 harf)";
    }
    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, "").length < 9) {
      errs.phoneNumber = "To'liq telefon raqamni kiriting";
    }
    if (!agreed) {
      errs.agreed = "Oferta shartlariga rozilik berish majburiy";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const phone = phoneCode + phoneNumber.trim();

    try {
      const { data, error } = await supabase
        .from("taskin")
        .insert([
          {
            full_name: fullName.trim(),
            phone_number: phone,
            is_uploaded: false,
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      const recordId = data.id;

      router.push(
        `/taskin/pay?id=${recordId}&full_name=${encodeURIComponent(
          fullName.trim()
        )}&phone_number=${encodeURIComponent(phone)}&tariff_label=${encodeURIComponent(
          COURSE.label
        )}&tariff_value=${COURSE.value}&tariff_price=${COURSE.price}`
      );
    } catch (err: any) {
      setErrors({ submit: `Xatolik: ${err.message}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-8 px-4 sm:px-6">
      {/* Sarlavhalar */}
      <header className="w-full text-center mb-6">
        <p className="text-2xl font-extrabold leading-tight">
          <span className="text-[#E63429]">TASKIN KURSIDA ISHTIROK</span>
          <span className="text-white"> ETISH </span>
          <span className="text-[#E63429]">UCHUN</span>
        </p>
        <p className="text-2xl font-extrabold text-white mt-1">MAXSUS TAKLIF</p>
      </header>

      {/* Asosiy karta */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 pb-7">
        {/* Qadam paneli (step bar) – to‘g‘rilangan */}
        <StepBar step={1} />

        {/* Brend banner */}
        <div className="bg-[#1a3535] text-white font-extrabold text-xl tracking-widest text-center rounded-xl py-3.5 mb-6">
          TASKIN
        </div>

        {/* Kurs tavsifi */}
        <div className="text-center mb-6">
          <h2 className="text-gray-900 font-extrabold text-lg mb-1">
            Taskin kursi
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Har qanday muammoga taskin ila oson va yengil yechim topishni o‘rganasiz
          </p>
          <p className="text-2xl font-extrabold text-[#1a3535]">
            {COURSE.price.toLocaleString("uz-UZ")} so‘m
          </p>
        </div>

        {/* Forma */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Ism familiya */}
          <div className="mb-4">
            <label className="block text-gray-900 font-bold mb-2">Ism familiyangiz:</label>
            <input
              type="text"
              placeholder="Ism Familiya"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              className={`w-full px-4 py-3.5 rounded-xl border-2 text-gray-900 placeholder-gray-400 bg-white outline-none transition ${
                errors.fullName
                  ? "border-[#E63429]"
                  : "border-gray-300 focus:border-[#E63429]"
              }`}
            />
            {errors.fullName && (
              <p className="text-[#E63429] text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Telefon */}
          <div className="mb-4">
            <label className="block text-gray-900 font-bold mb-2">Telefon raqamingiz:</label>
            <div className="flex gap-2.5 items-center">
              <select
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="py-3.5 px-3 rounded-xl border-2 border-gray-300 text-gray-900 font-semibold bg-white outline-none focus:border-[#E63429] min-w-[100px]"
              >
                {PHONE_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="00 000-00-00"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete="tel"
                className={`flex-1 px-4 py-3.5 rounded-xl border-2 text-gray-900 placeholder-gray-400 bg-white outline-none transition ${
                  errors.phoneNumber
                    ? "border-[#E63429]"
                    : "border-gray-300 focus:border-[#E63429]"
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-[#E63429] text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Oferta roziligi */}
          <div className="flex items-start gap-2.5 mb-5">
            <input
              type="checkbox"
              id="oferta"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 mt-0.5 accent-[#E63429] cursor-pointer flex-shrink-0"
            />
            <label htmlFor="oferta" className="text-sm text-gray-800 cursor-pointer">
              <span className="text-[#E63429] font-semibold">Ommaviy Oferta shartnomasi</span>{" "}
              shartlariga roziman
            </label>
          </div>
          {errors.agreed && (
            <p className="text-[#E63429] text-sm -mt-3 mb-3">{errors.agreed}</p>
          )}

          {errors.submit && (
            <div className="bg-red-50 text-[#E63429] text-sm p-3 rounded-lg mb-4 border border-red-200">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-[#E63429] hover:bg-red-700 text-white font-extrabold text-lg rounded-xl transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "YUKLANMOQDA..." : "DAVOM ETISH"}
          </button>
        </form>
      </div>

      {/* Telefon */}
      <div className="mt-6 bg-white/10 backdrop-blur rounded-full py-2.5 px-7 border border-white/20">
        <a href="tel:+998951601117" className="text-white font-semibold">
          +998 95 160 11 17
        </a>
      </div>
    </div>
  );
}

/* ========== StepBar (to‘g‘rilangan) ========== */
function StepBar({ step }: { step: number }) {
  const steps = [
    { id: 1, label: "Ma'lumot\nkiritish" },
    { id: 2, label: "To'lov\nqilish" },
    { id: 3, label: "Yakunlash" },
  ];

  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((s, index) => (
        <div key={s.id} className="flex items-center flex-1">
          {/* chap chiziq (birinchi elementdan tashqari) */}
          {index > 0 && (
            <div
              className="flex-1 h-[3px] rounded"
              style={{
                background: step > s.id ? "#E63429" : "#ddd",
                minWidth: "8px",
              }}
            />
          )}

          {/* aylana va label */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div
              className="w-[30px] h-[30px] rounded-full flex items-center justify-center border-[2.5px]"
              style={{
                background:
                  step > s.id
                    ? "#E63429"
                    : "#fff",
                borderColor:
                  step >= s.id ? "#E63429" : "#ddd",
              }}
            >
              {step > s.id ? (
                <span className="text-white text-sm font-bold">✓</span>
              ) : (
                <span
                  className="block w-2.5 h-2.5 rounded-full"
                  style={{
                    background: step === s.id ? "#E63429" : "#ddd",
                  }}
                />
              )}
            </div>
            <span className="text-[11px] text-gray-600 text-center max-w-[70px] whitespace-pre-line leading-tight">
              {s.label}
            </span>
          </div>

          {/* o‘ng chiziq (oxirgi elementdan tashqari) */}
          {index < steps.length - 1 && (
            <div
              className="flex-1 h-[3px] rounded"
              style={{
                background: step > s.id ? "#E63429" : "#ddd",
                minWidth: "8px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}