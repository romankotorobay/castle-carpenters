import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Castle Carpenters",
  description: "Carpentry, Remodeling, and Renovations.",
  keywords: [
    "Carpentry",
    "Remodeling",
    "Renovation",
    "Home Renovation",
    "Home Repairs",
    "Handyman",
    "Service",
    "Servicing",
    "Massachusetts",
    "Hampden County"
  ],
  authors: [{ name: "Roman Kotorobay" }],
  creator: "Roman Kotorobay",
  metadataBase: new URL("https://www.castlecarpenters.us"),
  openGraph: {
    title: "Castle Carpenters",
    description: "Carpentry, Remodeling, and Renovations.",
    url: "https://www.castlecarpenters.us",
    siteName: "Castle Carpenters Inc",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Castle Carpenters - Carpentry, Remodeling, and Renovations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Castle Carpenters - Carpentry, Remodeling, and Renovations",
    description: "Castle Carpenters - Carpentry, Remodeling, and Renovations",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className="font-sans antialiased bg-brand-bg text-brand-dark min-h-screen flex flex-col"
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
