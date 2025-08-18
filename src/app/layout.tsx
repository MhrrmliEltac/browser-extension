import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const NotoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Extension List",
  description: "Show Extension List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${NotoSans.variable} antialiased min-h-screen bg-[#EBF4FD]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
