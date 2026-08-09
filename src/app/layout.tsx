import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    { path: "../fonts/ClashDisplayRegular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ClashDisplayMedium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ClashDisplaySemibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const gilroy = localFont({
  src: [
    { path: "../fonts/Gilroy-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Gilroy-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Gilroy-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "CreativeOS | Faster D2C Reel and Post Production",
  description:
    "CreativeOS helps D2C agencies produce reels and static posts faster by combining brand context, market signals, previous generations, and reusable production learning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${gilroy.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
