
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTrelloBoards, TrelloBoard } from '@/services/trello';
import { useToast } from '@/hooks/use-toast';

export default function BoardSwitcher() {
  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBoards() {
      try {
        const fetchedBoards = await getTrelloBoards();
        setBoards(fetchedBoards);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error al cargar tableros',
          description: error instanceof Error ? error.message : 'Ocurrió un error desconocido.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchBoards();
  }, [toast]);

  const handleBoardSelect = (boardId: string) => {
    if (boardId) {
      router.push(`/board/${boardId}`);
    }
  };

  return (
    <Select onValueChange={handleBoardSelect} disabled={isLoading || boards.length === 0}>
      <SelectTrigger className="w-full bg-primary-foreground text-foreground">
        <SelectValue placeholder={isLoading ? 'Cargando tableros...' : 'Selecciona un tablero'} />
      </SelectTrigger>
      <SelectContent>
        {boards.map((board) => (
          <SelectItem key={board.id} value={board.id}>
            {board.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
