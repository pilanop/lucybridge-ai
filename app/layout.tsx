import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

// Shiromeda font family - supports Latin and Geez scripts
const shiromeda = localFont({
  src: [
    {
      path: "../font/woff2/shiromeda-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/woff2/shiromeda-semi-bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font/woff2/shiromeda-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shiromeda",
  display: "swap",
});

const shiromedaSerif = localFont({
  src: [
    {
      path: "../font/woff2/shiromeda-serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/woff2/shiromeda-serif-semi-bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font/woff2/shiromeda-serif-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shiromeda-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucy AI - Your Study Companion",
  description: "AI-powered study notes for high school students",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // Enables safe-area-inset env() vars on iOS
  interactiveWidget: "resizes-content", // Android Chrome keyboard handling
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${shiromeda.variable} ${shiromedaSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
