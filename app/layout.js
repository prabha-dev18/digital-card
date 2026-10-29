import { Poppins, Kaushan_Script } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Brush-script font for "Building a Brighter Future"
const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://aarambhgrow.group"),
  title: {
    default: "AarambhGrow — Professional Identity Studio | Business Card, WhatsApp DP & Email Signature",
    template: "%s | AarambhGrow Studio",
  },
  description:
    "All-in-one brand identity studio for AarambhGrow Group and partner companies. Design, preview, and download 3D digital business cards, branded WhatsApp DP frames, and professional HTML email signatures. 100% self-serve and private in your browser.",
  keywords: [
    "AarambhGrow",
    "Aarambh Grow",
    "Digital Business Card",
    "3D Digital Business Card",
    "WhatsApp DP Generator",
    "WhatsApp Profile Picture Maker",
    "Email Signature Generator",
    "HTML Email Signature",
    "Professional Identity Studio",
    "Brand Identity Suite",
    "vCard Generator",
    "AarambhGrow Advisory",
    "AarambhGrow Services",
    "AarambhGrow Infinity",
    "Nexera Consultancy",
    "EuroAsia",
  ],
  authors: [{ name: "AarambhGrow Group", url: "https://aarambhgrow.group" }],
  creator: "AarambhGrow Group",
  publisher: "AarambhGrow Group",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "AarambhGrow — Professional Identity Studio | Business Card, WhatsApp DP & Email Signature",
    description:
      "Create interactive 3D digital business cards, custom WhatsApp DP profile pictures, and ready-to-use HTML email signatures for AarambhGrow Group & sister companies. Instant, free, and zero-backend.",
    url: "https://aarambhgrow.group",
    siteName: "AarambhGrow Brand Studio",
    images: [
      {
        url: "/aarambh.png",
        width: 800,
        height: 600,
        alt: "AarambhGrow Group Logo & Brand Studio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AarambhGrow — Professional Identity Studio",
    description:
      "Design 3D digital business cards, branded WhatsApp DPs, and HTML email signatures for AarambhGrow Group companies in seconds.",
    images: ["/aarambh.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00275E",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${kaushan.variable}`}>
      <body className="min-h-screen font-sans antialiased overflow-x-clip selection:bg-orange-100">
        {children}
      </body>
    </html>
  );
}
