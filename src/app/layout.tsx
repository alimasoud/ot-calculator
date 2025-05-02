import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bahrain Over Time Calculator",
  description: "Calculate your overtime pay based on Bahrain Labour Law",
  openGraph: {
    title: "Bahrain Over Time Calculator",
    description: "Calculate your overtime pay based on Bahrain Labour Law",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bahrain Over Time Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bahrain Over Time Calculator",
    description: "Calculate your overtime pay based on Bahrain Labour Law",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
