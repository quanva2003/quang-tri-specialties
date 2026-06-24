import type { Metadata, Viewport } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import { SAND } from "@/lib/theme";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["vietnamese", "latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quảng Trị Đặc Sản — Hương vị quê nhà",
  description:
    "Một góc nhỏ lưu giữ những món ăn, đặc sản đã làm nên tuổi thơ và nỗi nhớ của bao người con đất Quảng Trị.",
  openGraph: {
    title: "Quảng Trị Đặc Sản — Hương vị quê nhà",
    description:
      "Một góc nhỏ lưu giữ những món ăn, đặc sản đã làm nên tuổi thơ và nỗi nhớ của bao người con đất Quảng Trị.",
    images: ["/hero/quang-tri-hero.jpg"],
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  themeColor: SAND,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfairDisplay.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
