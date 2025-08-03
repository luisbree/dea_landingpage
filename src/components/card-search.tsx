
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { getAllCardsFromAllBoards, TrelloCard } from '@/services/trello';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

interface CardSearchProps {
  onCardSelect: (card: TrelloCard | null) => void;
}

export default function CardSearch({ onCardSelect }: CardSearchProps) {
  const [allCards, setAllCards] = useState<TrelloCard[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAllCards() {
      try {
        const fetchedCards = await getAllCardsFromAllBoards();
        setAllCards(fetchedCards);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error al cargar las tarjetas',
          description: error instanceof Error ? error.message : 'Ocurrió un error desconocido.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllCards();
  }, [toast]);

  const filteredCards = useMemo(() => {
    if (!query) return [];
    
    const exactMatch = allCards.find(card => card.name.toLowerCase() === query.toLowerCase());
    if (exactMatch) return [];

    return allCards.filter(card => 
      card.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allCards]);

  const handleSelect = (card: TrelloCard) => {
    onCardSelect(card);
    setQuery('');
    setIsOpen(false);
  };
  
  const handleInputChange = (inputValue: string) => {
      setQuery(inputValue);
      
      const exactMatch = allCards.find(c => c.name.toLowerCase() === inputValue.toLowerCase());
      if (exactMatch) {
        onCardSelect(exactMatch);
      } else {
        onCardSelect(null);
      }

      if (inputValue.length > 0 && !isOpen && !exactMatch) {
        setIsOpen(true);
      } else if (inputValue.length === 0 && isOpen) {
        setIsOpen(false);
      }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Textarea
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={isLoading ? 'Cargando tarjetas...' : 'Buscar una tarjeta...'}
          className="w-full bg-primary-foreground text-foreground"
          disabled={isLoading}
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" onOpenAutoFocus={(e) => e.preventDefault()}>
          <Command>
            <CommandList>
              {filteredCards.length === 0 && query.length > 0 && (
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              )}
              <CommandGroup>
                {filteredCards.map((card) => (
                  <CommandItem
                    key={card.id}
                    value={card.name}
                    onSelect={() => handleSelect(card)}
                    className="cursor-pointer"
                  >
                    {card.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
      </PopoverContent>
    </Popover>
  );
}
