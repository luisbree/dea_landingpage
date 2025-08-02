import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Mail, Link as LinkIcon } from "lucide-react";
import SearchBar from "@/components/search-bar";

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
      <body className="font-body antialiased bg-transparent">
        <div className="fixed inset-0 -z-20">
          <Image
            src="/fondo_dea.jpg"
            alt="Fondo de escritorio"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </div>
        <div className="fixed inset-0 -z-10 bg-background/60" />

        <div className="flex flex-col min-h-screen text-foreground">
           <header className="p-4 sm:p-6 border-b bg-background/80">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-headline font-bold text-primary text-center md:text-left">
                Departamento de Estudios Ambientales y Sociales
              </h1>
              <div className="w-full md:w-auto md:max-w-xs">
                <SearchBar />
              </div>
            </div>
          </header>

          {children}
          
          <footer className="p-4 border-t text-center bg-background/80 mt-auto">
            <div className="flex justify-center items-center gap-6 text-sm">
              <a
                href="mailto:contacto@dea.gov.ar"
                className="flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>contacto@dea.gov.ar</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Maqueta</span>
              </a>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}