
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FolderKanban,
  LayoutGrid,
  Clock,
  Waypoints,
  Mail,
} from 'lucide-react';
import SearchBar, { type SearchResult } from '@/components/search-bar';
import MapBackground from '@/components/map-background';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const INITIAL_VIEW_STATE = {
  center: [-6450000, -4150000],
  zoom: 5,
};

export default function Home() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchComplete = (query: string, results: SearchResult[]) => {
    setSearchQuery(query);
    setSearchResults(results);
    setIsDialogOpen(true);
  };

  const handleResultSelect = (result: SearchResult) => {
    setViewState({
      center: result.coordinates,
      zoom: 12, // Zoom in closer on selection
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="relative h-screen w-screen">
      <MapBackground center={viewState.center} zoom={viewState.zoom} />
      <div className="absolute inset-0 -z-10 bg-background/40" />
      <div className="relative z-10 flex h-full flex-col font-body text-foreground">
        <header className="bg-primary shadow-md h-14">
          <div className="container mx-auto flex h-full items-center justify-between px-4">
            <h1 className="font-headline text-2xl font-bold tracking-tight text-primary-foreground">
              Departamento de Estudios Ambientales y Sociales
            </h1>
            <div className="w-1/3 max-w-sm">
              <SearchBar onSearchComplete={handleSearchComplete} />
            </div>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-2 grid-rows-2 gap-8 p-16">
          <Button
            variant="outline"
            className="h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <FolderKanban className="h-8 w-8 text-primary" />
            Gestión de proyectos
          </Button>
          <Button
            variant="outline"
            className="h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <LayoutGrid className="h-8 w-8 text-primary" />
            Tableros
          </Button>
          <Button
            variant="outline"
            className="h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <Clock className="h-8 w-8 text-primary" />
            Línea de tiempo
          </Button>
          <Button
            variant="outline"
            className="h-full flex-col gap-2 rounded-lg border-transparent bg-neutral-700/60 p-4 text-xl font-semibold text-primary-foreground shadow-lg transition-all hover:bg-neutral-700/80 hover:text-primary dark:bg-neutral-800/60 dark:hover:bg-neutral-800/80"
          >
            <Waypoints className="h-8 w-8 text-primary" />
            CartoDEA
          </Button>
        </main>

        <footer className="bg-neutral-700/60 py-2 dark:bg-neutral-800/60 mt-auto">
          <div className="container mx-auto flex items-center justify-center gap-8 text-sm text-primary-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>ambientales.dph@gmail.com</span>
            </div>
          </div>
        </footer>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resultados de la Búsqueda</DialogTitle>
            <DialogDescription>
              Estudios filtrados por las palabras clave: &quot;{searchQuery}&quot;
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-80 overflow-y-auto">
            {searchResults.length > 0 ? (
              <ul className="space-y-2">
                {searchResults.map((study, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleResultSelect(study)}
                      className="w-full text-left rounded-md border p-3 text-sm hover:bg-accent transition-colors"
                    >
                      {study.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Sin resultados</AlertTitle>
                <AlertDescription>
                  No se encontraron estudios que coincidan con su búsqueda.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
