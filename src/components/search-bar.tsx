
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { filterStudies, type FilterStudiesOutput } from '@/ai/flows/filter-search';
import { Loader2 } from 'lucide-react';
import debounce from 'lodash.debounce';

// Define the shape of a single search result
export type SearchResult = {
  name: string;
  coordinates: [number, number];
};

// This is an example board ID. Replace with your actual Trello board ID.
// You can get this from the URL of your Trello board.
const TRELLO_BOARD_ID = '60c7e2f5b9f9c7001f9d4b1a'; // TODO: Replace with your board ID

interface SearchBarProps {
  onSearchComplete: (results: SearchResult[]) => void;
  onQueryChange: (query: string) => void;
}

export default function SearchBar({ onSearchComplete, onQueryChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const performSearch = useCallback(
    async (currentQuery: string) => {
      if (!currentQuery.trim()) {
        onSearchComplete([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await filterStudies({
          keywords: currentQuery, // The flow will fetch all cards, keywords are for AI context
          boardId: TRELLO_BOARD_ID,
        });

        // Client-side filtering
        const filteredResults = results.filter(study => 
          study.name.toLowerCase().includes(currentQuery.toLowerCase())
        );

        onSearchComplete(filteredResults);
      } catch (error) {
        console.error('Search failed:', error);
        toast({
          variant: 'destructive',
          title: 'Error en la búsqueda',
          description: 'Ocurrió un error al buscar en Trello. Por favor, intente de nuevo.',
        });
        onSearchComplete([]);
      } finally {
        setIsLoading(false);
      }
    },
    [onSearchComplete, toast]
  );
  
  const debouncedSearch = useCallback(debounce(performSearch, 300), [performSearch]);

  useEffect(() => {
    onQueryChange(query);
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, onQueryChange, debouncedSearch]);

  return (
    <div className="relative flex w-full items-center">
      <Input
        type="search"
        placeholder="Buscar estudios en Trello..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-card"
        aria-label="Buscar estudios en Trello"
      />
      {isLoading && <Loader2 className="absolute right-3 h-4 w-4 animate-spin" />}
    </div>
  );
}
