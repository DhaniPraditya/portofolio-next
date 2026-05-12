import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("scroll-smooth", plusJakartaSans.variable, "font-sans", montserrat.variable)}
    >
      <body className="bg-background text-foreground selection:bg-primary/30 font-sans">
        {children}
      </body>
    </html>
  );
}


