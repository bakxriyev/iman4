'use client'

import Link from 'next/link'

export default function ThankYouPage() {
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || 'https://t.me/example'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-amber-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3">
            Tabriklaymiz! 🎉
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz. <br />
            Marafondan yangilanishlar va bonuslarni qo‘ldan boy bermang.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            ⚡️ Barcha yangiliklar va jonli dars havolasi Telegram kanalda:
          </p>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.6-1.38-.97-2.23-1.56-.99-.68-.35-1.06.22-1.68.15-.15 2.71-2.48 2.76-2.69.01-.03.02-.14-.06-.2-.08-.06-.2-.04-.28-.02-.12.02-1.98 1.26-5.59 3.7-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.84-.27-1.51-.41-1.45-.87.03-.24.36-.48.99-.73 3.86-1.68 6.44-2.79 7.74-3.32 3.68-1.5 4.45-1.76 4.95-1.77.11 0 .35.03.51.17.13.12.17.28.18.44-.01.12-.03.31-.06.55z" />
            </svg>
            Telegram kanalga o‘tish
          </a>
        </div>

        <Link
          href="/"
          className="inline-block text-sm text-red-600 hover:text-red-800 underline transition"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}