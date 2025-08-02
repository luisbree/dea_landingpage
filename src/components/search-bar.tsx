
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { filterStudies } from "@/ai/flows/filter-search";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const MOCK_STUDIES = [
  "Estudio de impacto ambiental de la represa X",
  "Análisis de la calidad del agua en el Río de la Plata",
  "Relevamiento de fauna íctica en la cuenca del Salado",
  "Modelo de dispersión de contaminantes para el arroyo Y",
  "Plan de gestión ambiental para la obra del canal Z",
  "Evaluación de riesgo hídrico en la pampa deprimida",
  "Estudio de sedimentos en el Delta del Paraná",
  "Monitoreo de cianobacterias en embalses de la provincia",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const filteredResults = await filterStudies({
        keywords: query,
        studies: MOCK_STUDIES,
      });
      setResults(filteredResults);
      setDialogOpen(true);
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        variant: "destructive",
        title: "Error en la búsqueda",
        description:
          "Ocurrió un error al filtrar los estudios. Por favor, intente de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="relative flex w-full items-center">
        <Input
          type="search"
          placeholder="Filtrar estudios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-card"
          aria-label="Buscar estudios"
        />
        {isLoading && <Loader2 className="absolute right-3 h-4 w-4 animate-spin" />}
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Resultados de la Búsqueda</DialogTitle>
            <DialogDescription>
              Estudios filtrados por las palabras clave: &quot;{query}&quot;
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((study, index) => (
                  <li key={index} className="rounded-md border p-3 text-sm">
                    {study}
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
    </>
  );
}
