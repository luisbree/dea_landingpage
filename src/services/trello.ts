
'use server';

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;
const BASE_URL = 'https://api.trello.com/1';

if (!TRELLO_API_KEY || !TRELLO_API_TOKEN) {
  throw new Error('Trello API Key and Token must be set in .env');
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
}

// This function now fetches ALL cards from a board, filtering happens client-side.
export async function searchTrelloCards(boardId: string): Promise<TrelloCard[]> {
  const fetch = (await import('node-fetch')).default;
  try {
    // We explicitly ask for the 'name' and 'desc' fields.
    const url = `${BASE_URL}/boards/${boardId}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}&fields=name,desc`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      // This is a generic error for the search itself, the more specific one is on board name fetch.
      throw new Error(`Trello API error: ${response.status} ${errorText}`);
    }

    const cards = (await response.json()) as TrelloCard[];
    return cards;
  } catch (error) {
    console.error('Failed to fetch from Trello:', error);
    // Return empty array on error to avoid breaking the flow
    return [];
  }
}

export async function getTrelloBoardName(boardId: string): Promise<string> {
    const fetch = (await import('node-fetch')).default;
    const url = `${BASE_URL}/boards/${boardId}?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}&fields=name`;
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Credenciales de Trello inválidas. Revisa tu API Key y Token en el archivo .env.');
        }
        if (response.status === 404) {
            throw new Error('Tablero no encontrado. Revisa el ID del tablero o tus permisos de acceso.');
        }
        const errorText = await response.text();
        console.error(`Trello API error while fetching board name: ${response.status} ${errorText}`);
        throw new Error('No se pudo conectar al tablero de Trello.');
    }

    const boardData = (await response.json()) as { name: string };
    return boardData.name;
}
