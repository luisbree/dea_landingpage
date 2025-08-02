import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";
import {
  FolderKanban,
  LayoutGrid,
  Clock,
  Waypoints,
  Mail,
  Link,
} from "lucide-react";

export default function Home() {
  return (
    <div
      style={{ backgroundImage: "url('/fondo_dea.jpeg')" }}
      data-ai-hint="background landscape"
      className="relative h-screen w-screen bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-background/40" />
      <div className="relative z-10 flex h-full flex-col font-body text-foreground">
        <header className="bg-background/80 shadow-md">
          <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <h1 className="font-headline text-2xl font-bold tracking-tight text-primary-foreground">
              Departamento de Estudios Ambientales y Sociales
            </h1>
            <div className="w-1/3 max-w-sm">
              <SearchBar />
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <div className="grid grid-cols-2 gap-8">
            <Button
              variant="outline"
              className="h-32 w-64 flex-col gap-2 rounded-lg border-4 border-primary/50 bg-card/70 p-4 text-xl font-semibold shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-card/90"
            >
              <FolderKanban className="h-8 w-8 text-primary" />
              Gestión de proyectos
            </Button>
            <Button
              variant="outline"
              className="h-32 w-64 flex-col gap-2 rounded-lg border-4 border-primary/50 bg-card/70 p-4 text-xl font-semibold shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-card/90"
            >
              <LayoutGrid className="h-8 w-8 text-primary" />
              Tableros
            </Button>
            <Button
              variant="outline"
              className="h-32 w-64 flex-col gap-2 rounded-lg border-4 border-primary/50 bg-card/70 p-4 text-xl font-semibold shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-card/90"
            >
              <Clock className="h-8 w-8 text-primary" />
              Línea de tiempo
            </Button>
            <Button
              variant="outline"
              className="h-32 w-64 flex-col gap-2 rounded-lg border-4 border-primary/50 bg-card/70 p-4 text-xl font-semibold shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-card/90"
            >
              <Waypoints className="h-8 w-8 text-primary" />
              CartoDEA
            </Button>
          </div>
        </main>

        <footer className="bg-background/80 py-4">
          <div className="container mx-auto flex items-center justify-center gap-8 text-sm text-primary-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>dea.sociales@gamil.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <a
                href="http://www.sociales.uba.ar/institucional/secretarias/investigacion/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                www.sociales.uba.ar/institucional/secretarias/investigacion/
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
