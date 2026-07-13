import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "~/qr · pcstyle",
  description: "custom qr codes for pcstyle.dev.",
  openGraph: {
    title: "~/qr · pcstyle",
    description: "custom qr codes for pcstyle.dev.",
    url: "https://qr.pcstyle.dev",
    siteName: "qr.pcstyle.dev",
    images: [
      {
        url: "https://og.pcstyle.dev/api/og?title=QR%20GENERATOR&subtitle=Cybernetic%20QR%20Engine&icon=box&theme=magenta",
        width: 1200,
        height: 630,
        alt: "QR Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "~/qr · pcstyle",
    description: "custom qr codes for pcstyle.dev.",
    images: ["https://og.pcstyle.dev/api/og?title=QR%20GENERATOR&subtitle=Cybernetic%20QR%20Engine&icon=box&theme=magenta"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
