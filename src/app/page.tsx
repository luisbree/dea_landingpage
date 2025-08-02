
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  LayoutGrid,
  Clock,
  Waypoints,
  Mail,
  Link,
} from "lucide-react";
import SearchBar from "@/components/search-bar";
import MapBackground from "@/components/map-background";

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <MapBackground />
      <div className="absolute inset-0 -z-10 bg-background/40" />
      <div className="pointer-events-none relative z-10 flex h-full flex-col font-body text-foreground">
        <header className="pointer-events-auto bg-primary shadow-md h-14">
          <div className="container mx-auto flex h-full items-center justify-between px-4">
            <h1 className="font-headline text-2xl font-bold tracking-tight text-primary-foreground">
              Departamento de Estudios Ambientales y Sociales
            </h1>
            <div className="w-1/3 max-w-sm">
              <SearchBar />
            </div>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-2 grid-rows-2 gap-8 p-16">
          <Button
            variant="outline"
            className="pointer-events-auto h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <FolderKanban className="h-8 w-8 text-primary" />
            Gestión de proyectos
          </Button>
          <Button
            variant="outline"
            className="pointer-events-auto h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <LayoutGrid className="h-8 w-8 text-primary" />
            Tableros
          </Button>
          <Button
            variant="outline"
            className="pointer-events-auto h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <Clock className="h-8 w-8 text-primary" />
            Línea de tiempo
          </Button>
          <Button
            variant="outline"
            className="pointer-events-auto h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <Waypoints className="h-8 w-8 text-primary" />
            CartoDEA
          </Button>
        </main>

        <footer className="pointer-events-auto bg-neutral-700/60 py-2 dark:bg-neutral-800/60">
          <div className="container mx-auto flex items-center justify-center gap-8 text-sm text-primary-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>ambientales.dph@gmail.com</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
