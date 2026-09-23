import { Poppins, Kaushan_Script } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Brush-script font for "Building a Brighter Future"
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-kaushan", display: "swap" });

export const metadata = {
  title: "Aarambh Grow — 3D Digital Business Card",
  description:
    "Create, flip and download your own Aarambh Grow 3D digital business card. Self-serve — no signup, no backend. Everything stays in your browser.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${kaushan.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}