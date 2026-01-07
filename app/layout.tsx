import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR.PCSTYLE // Cyberpunk QR Generator",
  description: "Generate stylized QR codes with neon cyberpunk aesthetic. Matrix, Glitch, Neon, and Minimal styles.",
  keywords: ["QR code", "generator", "cyberpunk", "neon", "qr code maker"],
  authors: [{ name: "pcstyle" }],
  openGraph: {
    title: "QR.PCSTYLE // Cyberpunk QR Generator",
    description: "Generate stylized QR codes with neon cyberpunk aesthetic",
    url: "https://qr.pcstyle.dev",
    siteName: "QR.PCSTYLE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} antialiased font-mono bg-black text-white`}>
        {children}
        <div className="crt-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
