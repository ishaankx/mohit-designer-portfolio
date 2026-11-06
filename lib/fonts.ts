import localFont from "next/font/local";

/*
  Self-hosted latin subsets of Anton, Manrope and Caveat (all SIL Open Font License, from Google Fonts).
  next/font/google fetches Google's CSS at build time, and the response varies by network: on Vercel it
  returned Caveat URLs that Turbopack's font loader rejects ("next/font/google queries have exactly one
  entry"), failing the build. Local files make every build deterministic and need no network.
  Manrope and Caveat are variable fonts, so one file covers every weight the site uses.
*/
export const anton = localFont({
  src: "../app/fonts/anton-latin-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-anton",
});

export const manrope = localFont({
  src: "../app/fonts/manrope-latin-var.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
});

export const caveat = localFont({
  src: "../app/fonts/caveat-latin-var.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-caveat",
});
