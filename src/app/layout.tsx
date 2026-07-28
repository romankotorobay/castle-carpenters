import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaNest Interiors | Luxury Interior Design & Architecture Studio",
  description: "NovaNest Interiors is an award-winning luxury interior design and architecture studio. We create bespoke, inspiring residential and commercial spaces that redefine modern living.",
  keywords: [
    "Interior Design",
    "Architecture",
    "Luxury Living",
    "Home Renovation",
    "Bespoke Furniture",
    "Scandinavian Design",
    "Space Planning",
    "Turnkey Projects",
    "Studio McGee Style",
    "Kelly Wearstler Style"
  ],
  authors: [{ name: "NovaNest Studio" }],
  creator: "NovaNest Studio",
  metadataBase: new URL("https://novanest-interiors.com"),
  openGraph: {
    title: "NovaNest Interiors | Luxury Interior Design & Architecture",
    description: "Discover bespoke interior design and architectural projects that inspire everyday living.",
    url: "https://novanest-interiors.com",
    siteName: "NovaNest Interiors",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "NovaNest Interiors - Luxury Living Room",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaNest Interiors | Luxury Interior Design & Architecture",
    description: "Discover bespoke interior design and architectural projects that inspire everyday living.",
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
      </body>
    </html>
  );
}
