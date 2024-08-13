import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { HomeSidebar } from "@/components/nav/HomeSidebar";
import { HomeNavbar } from "@/components/nav/HomeNavbar";
import { Footer } from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "min-h-screen flex flex-col h-full bg-background",
          inter.className
        )}
      >
        <HomeNavbar />
        <div className="h-full flex">
          <HomeSidebar className="h-full" />
          <main className="flex-grow p-12">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
