
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

// This is an example board ID. Replace with your actual Trello board ID.
// You can get this from the URL of your Trello board.
const TRELLO_BOARD_ID = '60c7e2f5b9f9c7001f9d4b1a'; // TODO: Replace with your board ID

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
      const filteredResults = await filterStudies({
        keywords: query,
        boardId: TRELLO_BOARD_ID,
      });
      onSearchComplete(query, filteredResults);
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error en la búsqueda',
        description: 'Ocurrió un error al filtrar los estudios en Trello. Por favor, intente de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full items-center">
      <Input
        type="search"
        placeholder="Filtrar estudios en Trello..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-card"
        aria-label="Buscar estudios en Trello"
      />
      {isLoading && <Loader2 className="absolute right-3 h-4 w-4 animate-spin" />}
    </form>
  );
}
