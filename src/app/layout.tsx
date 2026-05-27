import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Lora, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "Gaia Labs",
  description:
    "Gaia Labs identifies and accelerates early-stage technology ventures at the intersection of deep tech, fintech, and sustainable innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${lora.variable} ${ibmPlexMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t}else{document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}}catch(e){}})();`,
          }}
        />
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
