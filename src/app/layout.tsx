import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UI/UX Designer | Portfolio",
  description: "Professional portfolio of a UI/UX Designer showcasing innovative designs, user research, and interactive prototypes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground selection:bg-primary/30 font-sans">
        {children}
      </body>
    </html>
  );
}


