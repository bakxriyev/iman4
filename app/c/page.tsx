'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase client ──────────────────────────────────────────────────────────
const supabase = createClient(
  'https://vxpvgeyktgyasegvycfp.supabase.co',
  'sb_publishable_pXpHGuZFzmhJUD6FkQeapQ__7D78i4w'
)

// ──────────────────────── COUNTRIES LIST ────────────────────────
const countries = [
  { name: "O'zbekiston", code: "+998", flag: "🇺🇿", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Qozog'iston", code: "+7", flag: "🇰🇿", placeholder: "000 000 00 00", minLength: 10 },
  { name: "Rossiya", code: "+7", flag: "🇷🇺", placeholder: "000 000 00 00", minLength: 10 },
  { name: "AQSH", code: "+1", flag: "🇺🇸", placeholder: "000 000 0000", minLength: 10 },
  { name: "Kanada", code: "+1", flag: "🇨🇦", placeholder: "000 000 0000", minLength: 10 },
  { name: "Buyuk Britaniya", code: "+44", flag: "🇬🇧", placeholder: "0000 000000", minLength: 10 },
  { name: "Germaniya", code: "+49", flag: "🇩🇪", placeholder: "000 00000000", minLength: 10 },
  { name: "Fransiya", code: "+33", flag: "🇫🇷", placeholder: "0 00 00 00 00", minLength: 9 },
  { name: "Turkiya", code: "+90", flag: "🇹🇷", placeholder: "000 000 00 00", minLength: 10 },
  { name: "Ozarbayjon", code: "+994", flag: "🇦🇿", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Qirg'iziston", code: "+996", flag: "🇰🇬", placeholder: "000 000 000", minLength: 9 },
  { name: "Tojikiston", code: "+992", flag: "🇹🇯", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Turkmaniston", code: "+993", flag: "🇹🇲", placeholder: "00 000 00 00", minLength: 8 },
  { name: "Ukraina", code: "+380", flag: "🇺🇦", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Belarus", code: "+375", flag: "🇧🇾", placeholder: "00 000 00 00", minLength: 9 },
  { name: "BAA", code: "+971", flag: "🇦🇪", placeholder: "00 000 0000", minLength: 9 },
  { name: "Saudiya Arabistoni", code: "+966", flag: "🇸🇦", placeholder: "00 000 0000", minLength: 9 },
  { name: "Janubiy Koreya", code: "+82", flag: "🇰🇷", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Yaponiya", code: "+81", flag: "🇯🇵", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Xitoy", code: "+86", flag: "🇨🇳", placeholder: "000 0000 0000", minLength: 11 },
  { name: "Hindiston", code: "+91", flag: "🇮🇳", placeholder: "00000 00000", minLength: 10 },
  { name: "Pokiston", code: "+92", flag: "🇵🇰", placeholder: "000 00000 00", minLength: 10 },
  { name: "Indoneziya", code: "+62", flag: "🇮🇩", placeholder: "000 0000 0000", minLength: 10 },
  { name: "Malayziya", code: "+60", flag: "🇲🇾", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Misr", code: "+20", flag: "🇪🇬", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Nigeriya", code: "+234", flag: "🇳🇬", placeholder: "000 000 0000", minLength: 10 },
  { name: "Janubiy Afrika", code: "+27", flag: "🇿🇦", placeholder: "00 000 0000", minLength: 9 },
  { name: "Braziliya", code: "+55", flag: "🇧🇷", placeholder: "00 00000 0000", minLength: 10 },
  { name: "Meksika", code: "+52", flag: "🇲🇽", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Avstraliya", code: "+61", flag: "🇦🇺", placeholder: "0 0000 0000", minLength: 9 },
  { name: "Italiya", code: "+39", flag: "🇮🇹", placeholder: "000 000 0000", minLength: 10 },
  { name: "Ispaniya", code: "+34", flag: "🇪🇸", placeholder: "000 000 000", minLength: 9 },
  { name: "Polsha", code: "+48", flag: "🇵🇱", placeholder: "000 000 000", minLength: 9 },
  { name: "Niderlandiya", code: "+31", flag: "🇳🇱", placeholder: "0 000 0000", minLength: 9 },
  { name: "Shvetsiya", code: "+46", flag: "🇸🇪", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Norvegiya", code: "+47", flag: "🇳🇴", placeholder: "000 00 000", minLength: 8 },
  { name: "Daniya", code: "+45", flag: "🇩🇰", placeholder: "00 00 00 00", minLength: 8 },
  { name: "Finlyandiya", code: "+358", flag: "🇫🇮", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Shveytsariya", code: "+41", flag: "🇨🇭", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Avstriya", code: "+43", flag: "🇦🇹", placeholder: "000 000 0000", minLength: 10 },
  { name: "Gretsiya", code: "+30", flag: "🇬🇷", placeholder: "000 000 0000", minLength: 10 },
  { name: "Chexiya", code: "+420", flag: "🇨🇿", placeholder: "000 000 000", minLength: 9 },
  { name: "Ruminiya", code: "+40", flag: "🇷🇴", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Vengriya", code: "+36", flag: "🇭🇺", placeholder: "00 000 0000", minLength: 9 },
  { name: "Portugaliya", code: "+351", flag: "🇵🇹", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Irlandiya", code: "+353", flag: "🇮🇪", placeholder: "00 000 0000", minLength: 9 },
  { name: "Belgiya", code: "+32", flag: "🇧🇪", placeholder: "000 00 00 00", minLength: 9 },
  { name: "Serbiya", code: "+381", flag: "🇷🇸", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Xorvatiya", code: "+385", flag: "🇭🇷", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Bolgariya", code: "+359", flag: "🇧🇬", placeholder: "00 000 00 00", minLength: 9 },
  { name: "Gruziya", code: "+995", flag: "🇬🇪", placeholder: "000 00 00 00", minLength: 9 },
  { name: "Armaniston", code: "+374", flag: "🇦🇲", placeholder: "00 000 000", minLength: 8 },
  { name: "Moldova", code: "+373", flag: "🇲🇩", placeholder: "00 000 000", minLength: 8 },
  { name: "Litva", code: "+370", flag: "🇱🇹", placeholder: "000 00 000", minLength: 8 },
  { name: "Latviya", code: "+371", flag: "🇱🇻", placeholder: "00 000 000", minLength: 8 },
  { name: "Estoniya", code: "+372", flag: "🇪🇪", placeholder: "0000 0000", minLength: 8 },
  { name: "Islandiya", code: "+354", flag: "🇮🇸", placeholder: "000 0000", minLength: 7 },
  { name: "Kipr", code: "+357", flag: "🇨🇾", placeholder: "00 000 000", minLength: 8 },
  { name: "Malta", code: "+356", flag: "🇲🇹", placeholder: "0000 0000", minLength: 8 },
  { name: "Marokash", code: "+212", flag: "🇲🇦", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Tunis", code: "+216", flag: "🇹🇳", placeholder: "00 000 000", minLength: 8 },
  { name: "Iordaniya", code: "+962", flag: "🇯🇴", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Quvayt", code: "+965", flag: "🇰🇼", placeholder: "0000 0000", minLength: 8 },
  { name: "Qatar", code: "+974", flag: "🇶🇦", placeholder: "0000 0000", minLength: 8 },
  { name: "Ummon", code: "+968", flag: "🇴🇲", placeholder: "0000 0000", minLength: 8 },
  { name: "Bahrayn", code: "+973", flag: "🇧🇭", placeholder: "0000 0000", minLength: 8 },
  { name: "Iroq", code: "+964", flag: "🇮🇶", placeholder: "000 000 0000", minLength: 10 },
  { name: "Liviya", code: "+218", flag: "🇱🇾", placeholder: "00 000 0000", minLength: 9 },
  { name: "Jazoir", code: "+213", flag: "🇩🇿", placeholder: "00 00 00 00 00", minLength: 9 },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Shri-Lanka", code: "+94", flag: "🇱🇰", placeholder: "00 000 0000", minLength: 9 },
  { name: "Nepal", code: "+977", flag: "🇳🇵", placeholder: "00 000 0000", minLength: 10 },
  { name: "Myanma", code: "+95", flag: "🇲🇲", placeholder: "00 000 0000", minLength: 9 },
  { name: "Vetnam", code: "+84", flag: "🇻🇳", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Tailand", code: "+66", flag: "🇹🇭", placeholder: "00 000 0000", minLength: 9 },
  { name: "Filippin", code: "+63", flag: "🇵🇭", placeholder: "000 000 0000", minLength: 10 },
  { name: "Singapur", code: "+65", flag: "🇸🇬", placeholder: "0000 0000", minLength: 8 },
  { name: "Gonkong", code: "+852", flag: "🇭🇰", placeholder: "0000 0000", minLength: 8 },
  { name: "Tayvan", code: "+886", flag: "🇹🇼", placeholder: "00 0000 0000", minLength: 9 },
  { name: "Yangi Zelandiya", code: "+64", flag: "🇳🇿", placeholder: "00 000 0000", minLength: 9 },
  { name: "Argentina", code: "+54", flag: "🇦🇷", placeholder: "00 0000 0000", minLength: 10 },
  { name: "Chili", code: "+56", flag: "🇨🇱", placeholder: "0 0000 0000", minLength: 9 },
  { name: "Kolumbiya", code: "+57", flag: "🇨🇴", placeholder: "000 000 0000", minLength: 10 },
  { name: "Peru", code: "+51", flag: "🇵🇪", placeholder: "000 000 000", minLength: 9 },
  { name: "Ekvador", code: "+593", flag: "🇪🇨", placeholder: "00 000 0000", minLength: 9 },
]

// ─── 2‑daqiqali sikl timer ──────────────────────────────────────────────────
function useLoopTimer() {
  const [timerDisplay, setTimerDisplay] = useState('02:00')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let duration = 60 * 2
    timerRef.current = setInterval(() => {
      const minutes = Math.floor((duration % 3600) / 60)
      const seconds = duration % 60
      const mm = minutes < 10 ? '0' + minutes : String(minutes)
      const ss = seconds < 10 ? '0' + seconds : String(seconds)
      setTimerDisplay(mm + ':' + ss)
      if (--duration < 0) duration = 60 * 2
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return timerDisplay
}

// ─── Popup (forma + Supabase + country selector) ─────────────────────────────
function Popup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Country selector states
  const [countryCode, setCountryCode] = useState("+998")
  const [countryName, setCountryName] = useState("O'zbekiston")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const countryButtonRef = useRef<HTMLButtonElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)

  const selectedCountry =
    countries.find((c) => c.code === countryCode && c.name === countryName) || countries[0]

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  )

  // Click outside → close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node) &&
        countryButtonRef.current &&
        !countryButtonRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false)
        setCountrySearch("")
      }
    }
    if (showCountryDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  // Escape → close dropdown
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && showCountryDropdown) {
        setShowCountryDropdown(false)
        setCountrySearch("")
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [showCountryDropdown])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setFormError('Ismingizni kiriting!')
      return
    }
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!phoneDigits || phoneDigits.length < (selectedCountry?.minLength || 7)) {
      setFormError("Telefon raqamingizni to'g'ri kiriting!")
      return
    }

    setFormError('')
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('leads').insert([
        {
          full_name: formData.name.trim(),
          phone_number: `${countryCode}${phoneDigits}`,
          type: 'c',
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        setFormError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.')
        setIsSubmitting(false)
        return
      }

      router.push('/thank-you')
    } catch (err) {
      console.error('Submission error:', err)
      setFormError('Server bilan bog‘liq xatolik. Iltimos, keyinroq urinib ko‘ring.')
      setIsSubmitting(false)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 400,
          background: 'linear-gradient(155deg,#0d1f3c 0%,#090e1a 100%)',
          border: '1px solid rgba(220,38,38,0.3)', borderRadius: 20,
          padding: '36px 28px', position: 'relative',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 50px rgba(220,38,38,0.08)',
          fontFamily: 'Inter,sans-serif',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 18,
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.35)', fontSize: 26,
            cursor: 'pointer', lineHeight: 1,
          }}
        >
          ×
        </button>

        <h3
          style={{
            color: '#fff', fontWeight: 800, fontSize: '1.05rem',
            textAlign: 'center', marginBottom: 6,
          }}
        >
          Ro‘yxatdan o‘tish uchun<br />ma’lumotlaringizni kiriting!
        </h3>
        <p
          style={{
            color: 'rgba(255,255,255,0.38)', fontSize: '0.8rem',
            textAlign: 'center', marginBottom: 24,
          }}
        >
          Bepul marafonga qatnashish uchun
        </p>

        <form onSubmit={handleSubmit}>
          {/* Ism */}
          <input
            type="text"
            placeholder="Ismingiz"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
            style={{
              display: 'block', width: '100%', marginBottom: 12,
              padding: '13px 15px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 10, color: '#fff', fontSize: '0.93rem',
              outline: 'none', fontFamily: 'Inter,sans-serif',
            }}
          />

          {/* Telefon raqam + country selector */}
          <div
            style={{
              display: 'flex', marginBottom: 6,
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 10, overflow: 'visible',
              position: 'relative',
            }}
          >
            {/* Country trigger button */}
            <button
              ref={countryButtonRef}
              type="button"
              onClick={() => {
                setShowCountryDropdown(prev => !prev)
                setCountrySearch("")
              }}
              disabled={isSubmitting}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '13px 10px',
                background: 'rgba(255,255,255,0.05)',
                border: 'none', borderRight: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '10px 0 0 10px',
                color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem',
                fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Inter,sans-serif',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{selectedCountry?.flag}</span>
              <span>{selectedCountry?.code}</span>
              <svg
                style={{
                  width: 10, height: 10, marginLeft: 2,
                  transition: 'transform 0.2s',
                  transform: showCountryDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Phone input */}
            <input
              ref={phoneInputRef}
              type="tel"
              placeholder={selectedCountry?.placeholder || "00 000 0000"}
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d\s]/g, '')
                setFormData({ ...formData, phone: val })
              }}
              maxLength={16}
              disabled={isSubmitting}
              style={{
                flex: 1, padding: '13px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: 'none', borderRadius: '0 10px 10px 0',
                color: '#fff', fontSize: '0.93rem',
                outline: 'none', fontFamily: 'Inter,sans-serif',
                minWidth: 0,
              }}
            />

            {/* Country dropdown */}
            {showCountryDropdown && (
              <div
                ref={countryDropdownRef}
                style={{
                  position: 'absolute', left: 0, right: 0, top: 'calc(100% + 4px)',
                  background: '#111827', border: '1px solid rgba(220,38,38,0.25)',
                  borderRadius: 10, zIndex: 60, maxHeight: 260, overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                }}
              >
                {/* Search */}
                <div
                  style={{
                    padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    position: 'sticky', top: 0, background: '#111827', zIndex: 1,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <svg style={{ width: 14, height: 14, color: '#888', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Davlatni qidirish..."
                    autoFocus
                    style={{
                      flex: 1, background: 'transparent', border: 'none',
                      color: '#ddd', fontSize: '0.82rem', outline: 'none',
                      fontFamily: 'Inter,sans-serif',
                    }}
                  />
                </div>

                {/* List */}
                <div style={{ overflowY: 'auto', maxHeight: 200 }}>
                  {filteredCountries.map((c, idx) => (
                    <button
                      key={`${c.code}-${c.name}-${idx}`}
                      type="button"
                      onClick={() => {
                        setCountryCode(c.code)
                        setCountryName(c.name)
                        setShowCountryDropdown(false)
                        setCountrySearch("")
                        setTimeout(() => phoneInputRef.current?.focus(), 100)
                      }}
                      style={{
                        width: '100%', padding: '9px 12px',
                        display: 'flex', alignItems: 'center', gap: 10,
                        background: (c.code === countryCode && c.name === countryName)
                          ? 'rgba(220,38,38,0.2)' : 'transparent',
                        border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
                        color: '#ddd', fontSize: '0.84rem', cursor: 'pointer',
                        textAlign: 'left', fontFamily: 'Inter,sans-serif',
                        fontWeight: (c.code === countryCode && c.name === countryName) ? 700 : 400,
                      }}
                    >
                      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{c.flag}</span>
                      <span style={{ flex: 1 }}>{c.name}</span>
                      <span style={{ color: '#999', fontSize: '0.75rem', flexShrink: 0 }}>{c.code}</span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px', fontSize: '0.82rem' }}>
                      😔 Davlat topilmadi
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone hint */}
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.7rem', marginBottom: 12, marginTop: 4 }}>
            Namuna: {selectedCountry?.code} {selectedCountry?.placeholder}
          </p>

          {formError && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', marginBottom: 12 }}>
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%', marginTop: 10, padding: '15px',
              background: 'linear-gradient(180deg,#ef4444,#dc2626 50%,#b91c1c)',
              border: 'none', borderRadius: 10,
              color: '#fff', fontWeight: 800, fontSize: '0.92rem',
              letterSpacing: '2px', textTransform: 'uppercase',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter,sans-serif',
              boxShadow: '0 6px 0 #7f1d1d, 0 12px 28px rgba(220,38,38,0.4)',
              transition: 'all 0.14s ease',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'YUBORILMOQDA...' : 'DAVOM ETISH'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Asosiy sahifa ───────────────────────────────────────────────────────────
export default function Page() {
  const [popup, setPopup] = useState(false)
  const [vis, setVis] = useState(false)
  const timerDisplay = useLoopTimer()

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 50)
    return () => clearTimeout(t)
  }, [])

  const PERSON = './opa.png'
  const OVAL = 'https://static.tildacdn.one/tild3332-3265-4563-b065-643064633266/Ellipse_4_6_1.png'

  const bullets = [
    'Qanday qilib dangasalikdan halos bo’lib, maqsad va missiyani to’g’ri qo’yish usulini',
    'Qanday qilib hech qanday bosimlarsiz, shunchaki Yaratgan dangasalik qilish orqali istalgan orzu - maqsadga oson erishish usullarini',
    '2026 yilda daromadni oshirish va istalgan ko’nikmani 10 barobar tezroq o’rganish usullarini',
    'Qanday qilib dangasalikni yengib, hushu ila ibodat qilish usullarini psixologik tomondan tahlillarini ko’rib chiqamiz.',
  ]

  return (
    <>
      {/* ─── Global stillar ─── */}
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{
          background:#0b1526;
          font-family:'Inter',sans-serif;
          overflow-x:hidden;
          -webkit-font-smoothing:antialiased;
        }

        .fu{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
        .fu.v{opacity:1;transform:none}
        .d1{transition-delay:.05s} .d2{transition-delay:.13s} .d3{transition-delay:.21s}
        .d4{transition-delay:.29s} .d5{transition-delay:.37s} .d6{transition-delay:.45s}
        .d7{transition-delay:.53s} .d8{transition-delay:.61s}

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

        @keyframes floatY{
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-9px)}
        }
        .float-person{animation:floatY 5s ease-in-out infinite}

        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .bepul{
          background:linear-gradient(90deg,#fff 20%,#fca5a5 50%,#fff 80%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 3s linear infinite;
          font-weight:900;font-size:2rem;letter-spacing:2px;line-height:1;
          font-family:'Inter',sans-serif;
        }

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

        .brow{display:flex;align-items:flex-start;gap:13px;transition:transform .22s ease;cursor:default}
        .brow:hover{transform:translateX(5px)}

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

        .foot{background:#050505;position:relative}
        .foot::before{
          content:'';position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,#dc2626 50%,transparent);
        }

        .cd-box{
          display:flex;align-items:center;justify-content:center;gap:10px;
          padding:18px 20px;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.07);
          border-radius:14px;
          backdrop-filter:blur(8px);
        }
        .cd-num{
          background:linear-gradient(155deg,#1e3a5f,#0d1f3c);
          border:1px solid rgba(220,38,38,.18);
          border-radius:10px;
          width:62px;height:62px;
          display:flex;align-items:center;justify-content:center;
          font-size:1.5rem;font-weight:900;color:#fff;
          box-shadow:0 4px 0 rgba(0,0,0,.5),0 0 10px rgba(220,38,38,.07);
          font-variant-numeric:tabular-nums;letter-spacing:-1px;
        }
        .cd-colon{
          font-size:1.8rem;font-weight:900;color:#dc2626;
          text-shadow:0 0 8px rgba(220,38,38,.4);
          line-height:1;
        }
      `}</style>

      <Popup open={popup} onClose={() => setPopup(false)} />

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero">
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '36px 22px 52px' }}>

          {/* 1. Badge */}
          <div className={`fu d1${vis ? ' v' : ''}`} style={{ textAlign: 'center', marginBottom: 20 }}>
            <span className="badge">
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.87rem' }}>
                8-9-10 May | Soat 20:00 da
              </span>
            </span>
          </div>

          {/* 2. Subtitle */}
          <div className={`fu d2${vis ? ' v' : ''}`} style={{ textAlign: 'center', marginBottom: 18 }}>
            <p style={{ color: 'rgba(255,255,255,.62)', fontSize: '0.9rem', fontWeight: 400 }}>
              Iman Akhmedovna bilan 3 kunlik bepul marafon
            </p>
          </div>

          {/* 3. Question */}
          <div className={`fu d4${vis ? ' v' : ''}`} style={{ textAlign: 'center', marginBottom: 26 }}>
            <h2
              style={{
                color: '#fff', fontWeight: 800,
                fontSize: 'clamp(1.05rem,4.7vw,1.2rem)',
                lineHeight: 1.55,
              }}
            >
              Qanday qilib dangasalikdan 3 ta yo’l orqali halos bo’lib , muvaffaqiyatli ayol bo’lish sirlari
            </h2>
          </div>

          {/* 4. Bullets + Person */}
          <div
            className={`fu d5${vis ? ' v' : ''}`}
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'stretch',
              marginBottom: 22,
              overflow: 'visible',
            }}
          >
            {/* Matnlar qismi */}
            <div
              style={{
                flex: 1.6,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minWidth: 0,
              }}
            >
              {bullets.map((txt, i) => (
                <div key={i} className="brow" style={{ display: 'flex', gap: 8 }}>
                  <img
                    src={OVAL}
                    alt=""
                    width={18}
                    height={10}
                    style={{
                      width: 18,
                      height: 10,
                      objectFit: 'contain',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <p
                    style={{
                      color: 'rgba(255,255,255,.85)',
                      fontSize: '11px',
                      fontWeight: 800,
                      lineHeight: 1.6,
                      flex: 1,
                      wordBreak: 'keep-all',
                    }}
                  >
                    {txt}
                  </p>
                </div>
              ))}
            </div>

            {/* Rasm konteyneri */}
            <div
              style={{
                flex: 1,
                maxWidth: 500,
                flexShrink: 0,
                overflow: 'visible',
                position: 'relative',
              }}
            >
              <img
                src={PERSON}
                alt="Dovranbek Turdiev"
                style={{
                  width: '400px',
                  height: '300px',
                  display: 'block',
                  transform: 'translateX(30px)',
                  filter:
                    'drop-shadow(0 18px 38px rgba(0,0,0,.55)) drop-shadow(0 0 12px rgba(220,38,38,.1))',
                }}
              />
            </div>
          </div>

          {/* Timer */}
          <div
            className={`fu d6${vis ? ' v' : ''}`}
            style={{ marginBottom: 22 }}
          >
            <div className="cd-box" style={{ justifyContent: 'space-around', maxWidth: 320, margin: '0 auto' }}>
              {timerDisplay.split('').map((char, idx) => (
                <React.Fragment key={idx}>
                  {char === ':' ? (
                    <span className="cd-colon">:</span>
                  ) : (
                    <div className="cd-num">{char}</div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p style={{ color: 'rgba(255,255,255,.38)', fontSize: '0.75rem', textAlign: 'center', marginTop: 8 }}>
              Ro`yxatdan o`tish tugashiga
            </p>
          </div>

          {/* 5. CTA */}
          <div className={`fu d7${vis ? ' v' : ''}`} style={{ marginBottom: 28 }}>
            <button className="cta" onClick={() => setPopup(true)}>
              RO‘YXATDAN O‘TISH
            </button>
            <div className="flex items-center justify-center gap-3" style={{ marginTop: 18 }}>
              <img
                src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
                alt="arrow"
                style={{ width: 48, filter: 'invert(1)', transition: 'transform .2s' }}
                className="hover:translate-x-1"
              />
              <span className="bepul">BEPUL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="foot">
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '48px 24px 40px', textAlign: 'center' }}>
          <div
            style={{
              width: 48, height: 3,
              background: 'linear-gradient(90deg,#dc2626,#ef4444)',
              borderRadius: 999, margin: '0 auto 30px',
              boxShadow: '0 0 12px rgba(220,38,38,.5)',
            }}
          />
          <div
            style={{
              height: 1,
              background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)',
              margin: '0 0 22px',
            }}
          />
          <p style={{ color: 'rgba(255,255,255,.22)', fontSize: '0.73rem', lineHeight: 1.7, marginBottom: 28 }}>
            This site or product is not part of or endorsed by Facebook, Google, or any social media platform in any way.
            FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc.
          </p>
          <p style={{ color: 'rgba(255,255,255,.13)', fontSize: '0.68rem' }}>
            Barcha huquqlar himoyalangan, 2026.
          </p>
        </div>
      </footer>
   </>
  )
}