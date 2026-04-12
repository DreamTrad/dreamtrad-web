// app/layout.js
import { Montserrat, Orbitron } from "next/font/google";
import "@/app/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "500", "600", "700", "800", "900"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${montserrat.variable} ${orbitron.variable}`}>
      <body className="text-text flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}