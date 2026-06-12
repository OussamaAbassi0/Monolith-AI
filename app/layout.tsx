import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://monolith-ai.com";

const title = "Monolith AI , Infrastructure IA sur mesure";
const description =
  "Monolith AI , L'agence IA n°1 qui déploie des infrastructures sur mesure pour automatiser votre business. Zéro lead perdu. Zéro réservation manquée. 24h/24. 7j/7.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Monolith AI",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/opengraph-image.png",
        width: 500,
        height: 500,
        alt: "Monolith AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
