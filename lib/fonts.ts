import { Anton, Caveat, Manrope } from "next/font/google";

export const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-anton" });
export const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" });
export const caveat = Caveat({ weight: ["400", "500"], subsets: ["latin"], display: "swap", variable: "--font-caveat" });
