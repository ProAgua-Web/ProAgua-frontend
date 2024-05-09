"use client";

import { Inter } from "next/font/google";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <html lang="pt-br">
      <body className={inter.className + " bg-background"}>
        <Header expand={toggleCollapsed} collapsed={collapsed} />

        <Navbar collapse={() => {}} collapsed={collapsed} />

        <main className={`relative mr-auto flex w-[clamp(320px,90vw-2rem,1200px)] flex-col items-center gap-4 p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)] ${!collapsed ? 'ml-96' : 'ml-auto'}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
