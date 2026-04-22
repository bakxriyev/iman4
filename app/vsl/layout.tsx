import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css"; // yoki o'zingizning global CSS faylingiz

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bepul Videodarslik | Iman Akhmedovna",
  description:
    "Qanday qilib 3 ta texnika orqali energiyasizlikdan xalos bo'lish mumkin? Iman Akhmedovnadan bepul videodarslik.",
  openGraph: {
    title: "Bepul Videodarslik | Iman Akhmedovna",
    description:
      "Qanday qilib 3 ta texnika orqali energiyasizlikdan xalos bo'lish mumkin?",
    images: ["./vsl.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#e8e5e0]">
        {children}
      </body>
    </html>
  );
}