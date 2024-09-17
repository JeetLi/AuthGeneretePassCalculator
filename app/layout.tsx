"use client";

import { usePathname } from "next/navigation";
import Header from "../components/header/header";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();

  return (
    <html lang="ru">
      <body className="container">
        {router !== "/" && <Header />}
        {children}
      </body>
    </html>
  );
}
