import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, Unbounded } from "next/font/google";
import { Enhancements } from "@/components/motion/Enhancements";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo";
import { SITE } from "@/lib/site-config";
import "./globals.css";

// Başlık fontu: yalnızca italic 800 (tüm başlıklar bu ağırlıkta; 700 dosyası LCP yolunu ağırlaştırıyordu).
const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  weight: ["800"],
  style: ["italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Fütüristik vitrin fontu: yalnızca hero başlığı ve iletişim bandı başlığı (Türkçe karakterler için latin-ext).
const unbounded = Unbounded({
  variable: "--font-future",
  weight: ["700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE.name}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: SITE.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${barlow.variable} ${inter.variable} ${unbounded.variable}`}>
      <body className="grain">
        <a href="#icerik" className="skip-link">
          İçeriğe geç
        </a>
        {children}
        <Enhancements />
      </body>
    </html>
  );
}
