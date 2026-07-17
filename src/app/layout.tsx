import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Betty's Graduation Celebration · 毕业快乐",
  description:
    "邀请您参加 Betty 的毕业典礼! Join us to celebrate Betelhem Abera, Master's in Finance & International Trade, Wuhan Textile University — July 18, 2026, Addis Ababa.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Loaded as a stylesheet (not next/font) because the dev machine's node
            process cannot reach fonts.gstatic.com at build time. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Great+Vibes&family=Noto+Serif+SC:wght@500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
