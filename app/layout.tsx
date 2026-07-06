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

const themeInit = `(function(){try{var t=localStorage.theme;var d=t?t==="dark":!window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){document.documentElement.classList.add("dark")}})();`;

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
