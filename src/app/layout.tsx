import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "DEA",
  description: "Departamento de Estudios Ambientales y Sociales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@400;700&family=Encode+Sans+Condensed:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="fixed inset-0 -z-10">
          <Image
            src="/fondo_dea.jpg"
            alt="Fondo de escritorio"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </div>
        <div className="fixed inset-0 bg-background/40 -z-10" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
