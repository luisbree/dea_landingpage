
'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { verifyTrelloConnection } from '@/services/trello';

export default function TrelloConnectionToast() {
  const { toast } = useToast();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const userName = await verifyTrelloConnection();
        toast({
          title: 'Autenticación con Trello exitosa',
          description: `Conectado como: ${userName}`,
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error de autenticación con Trello',
          description: error instanceof Error ? error.message : 'Ocurrió un error desconocido.',
        });
      }
    };

    checkConnection();
  }, [toast]);

  return null;
}
