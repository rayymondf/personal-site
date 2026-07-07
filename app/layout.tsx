import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { inter, jetbrainsMono } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "raymond fang",
  description:
    "ee @ waterloo building software, ml, and robotics systems. i teach robots to pick things up.",
  openGraph: {
    title: "raymond fang",
    description:
      "ee @ waterloo building software, ml, and robotics systems. i teach robots to pick things up.",
    type: "website",
  },
};

const themeInit = `(function(){try{var d=localStorage.theme==="dark";document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
