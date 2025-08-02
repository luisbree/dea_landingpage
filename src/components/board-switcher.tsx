
'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllCardsFromAllBoards, TrelloCard } from '@/services/trello';
import { useToast } from '@/hooks/use-toast';

export default function BoardSwitcher() {
  const [cards, setCards] = useState<TrelloCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAllCards() {
      try {
        const fetchedCards = await getAllCardsFromAllBoards();
        setCards(fetchedCards);
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

  const handleCardSelect = (cardUrl: string) => {
    if (cardUrl) {
      window.open(cardUrl, '_blank');
    }
  };

  return (
    <Select onValueChange={handleCardSelect} disabled={isLoading || cards.length === 0}>
      <SelectTrigger className="w-full bg-primary-foreground text-foreground">
        <SelectValue placeholder={isLoading ? 'Cargando tarjetas...' : 'Selecciona una tarjeta'} />
      </SelectTrigger>
      <SelectContent>
        {cards.map((card) => (
          <SelectItem key={card.id} value={card.url}>
            {card.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
