import { Fira_Code as FontMono, Inter as FontSans, Inria_Sans as InriaSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const inriaSans = InriaSans({
  subsets: ["latin"],
  variable: "--font-inria",
  weight: ["300", "400", "700"]
})