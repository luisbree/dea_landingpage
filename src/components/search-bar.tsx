
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { filterStudies, type FilterStudiesOutput } from '@/ai/flows/filter-search';
import { Loader2 } from 'lucide-react';

// Define the shape of a single search result
export type SearchResult = {
  name: string;
  coordinates: [number, number];
};

// Mock data now includes coordinates
const MOCK_STUDIES = [
  { name: "Estudio de impacto ambiental de la represa X", coordinates: [-68.8225, -32.8908] }, // Mendoza
  { name: "Análisis de la calidad del agua en el Río de la Plata", coordinates: [-57.9545, -34.9205] }, // La Plata
  { name: "Relevamiento de fauna íctica en la cuenca del Salado", coordinates: [-58.0000, -35.6667] }, // Chascomús
  { name: "Modelo de dispersión de contaminantes para el arroyo Y", coordinates: [-58.3816, -34.6037] }, // CABA
  { name: "Plan de gestión ambiental para la obra del canal Z", coordinates: [-64.1888, -31.4201] }, // Córdoba
  { name: "Evaluación de riesgo hídrico en la pampa deprimida", coordinates: [-60.5000, -36.5000] }, // Pampa Deprimida
  { name: "Estudio de sedimentos en el Delta del Paraná", coordinates: [-58.5833, -34.1667] }, // Tigre
  { name: "Monitoreo de cianobacterias en embalses de la provincia", coordinates: [-64.4500, -32.1667] }, // Embalse Río Tercero
];

interface SearchBarProps {
  onSearchComplete: (query: string, results: SearchResult[]) => void;
}

export default function SearchBar({ onSearchComplete }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // The flow now returns objects with name and coordinates
      const filteredResults = await filterStudies({
        keywords: query,
        studies: MOCK_STUDIES, // Pass the whole object
      });
      // The parent component will handle the results
      onSearchComplete(query, filteredResults);
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error en la búsqueda',
        description: 'Ocurrió un error al filtrar los estudios. Por favor, intente de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}
