import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Best Hire Transport - Equipment Rental & General Contracting",
  description: "Premium construction equipment rental and transport services in Abu Dhabi, UAE. Forklifts, excavators, dozers, wheel loaders and more. 24 Hours Service.",
  keywords: "equipment rental, machinery hire, forklifts, excavators, dozers, wheel loaders, transport, Abu Dhabi, UAE, construction equipment",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Best Hire Transport - Equipment Rental & General Contracting",
    description: "Premium construction equipment rental and transport services in Abu Dhabi, UAE. 24 Hours Service.",
    type: "website",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="pt-16 md:pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
