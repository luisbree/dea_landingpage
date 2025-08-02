
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { filterStudies, type FilterStudiesOutput } from '@/ai/flows/filter-search';
import { getTrelloBoardName } from '@/services/trello';
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
  const [allStudies, setAllStudies] = useState<FilterStudiesOutput>([]);
  const { toast } = useToast();

  // 1. Fetch all studies from Trello once on component mount
  useEffect(() => {
    const fetchAllStudies = async () => {
      setIsLoading(true);
      try {
        // Verify connection and show toast
        const boardName = await getTrelloBoardName(TRELLO_BOARD_ID);
        toast({
          title: 'Conexión exitosa con Trello',
          description: `Conectado al tablero: ${boardName}`,
        });

        // Fetch all studies and store them in state
        const results = await filterStudies({ boardId: TRELLO_BOARD_ID });
        setAllStudies(results);

      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error de conexión con Trello',
          description: (error as Error).message,
        });
        setAllStudies([]); // Clear studies on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllStudies();
  }, [toast]);

  // 2. Perform filtering client-side whenever the query changes
  const performClientSideSearch = useCallback((currentQuery: string) => {
    if (!currentQuery.trim()) {
      onSearchComplete([]);
      return;
    }
    const filteredResults = allStudies.filter(study =>
      study.name.toLowerCase().includes(currentQuery.toLowerCase())
    );
    onSearchComplete(filteredResults);
  }, [allStudies, onSearchComplete]);

  const debouncedSearch = useCallback(debounce(performClientSideSearch, 300), [performClientSideSearch]);

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
