import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";
import { Mail, Link as LinkIcon } from "lucide-react";
import Image from 'next/image';

const mainButtons = [
  { label: "Gestión de proyectos" },
  { label: "Tableros" },
  { label: "Línea de tiempo" },
  { label: "CartoDEA" },
];

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen text-foreground">
       <Image
          src="/fondo_dea.jpg"
          alt="Fondo del Departamento de Estudios Ambientales y Sociales"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          priority
        />
      <header className="sticky top-0 z-10 p-4 sm:p-6 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-headline font-bold text-primary text-center md:text-left">
            Departamento de Estudios Ambientales y Sociales
          </h1>
          <div className="w-full md:w-auto md:max-w-xs">
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-8 flex items-center justify-center z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
          {mainButtons.map((button) => (
            <Button
              key={button.label}
              className="h-40 md:h-48 text-2xl font-bold rounded-lg shadow-xl transition-all bg-neutral-400/80 hover:bg-neutral-400 text-foreground focus:ring-accent"
              aria-label={button.label}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </main>

      <footer className="p-4 border-t text-center z-10 bg-background/80 backdrop-blur-sm">
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
  );
}
