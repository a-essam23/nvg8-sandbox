import localFont from "next/font/local";

export const aeonik = localFont({
  src: [
    {
      path: "./Aeonik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Aeonik-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Aeonik-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
});

export const oldschoolGrotesk = localFont({
  src: [
    {
      path: "./OldschoolGrotesk-ExtraBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./OldschoolGrotesk-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-oldschool-grotesk",
});
