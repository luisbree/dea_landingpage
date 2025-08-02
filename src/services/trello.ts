
'use server';

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;
const BASE_URL = 'https://api.trello.com/1';

async function trelloFetch(url: string) {
  if (!TRELLO_API_KEY || !TRELLO_API_TOKEN) {
    throw new Error('Trello API Key and Token must be set in .env');
  }
  const fetch = (await import('node-fetch')).default;
  const fullUrl = `${BASE_URL}${url}${url.includes('?') ? '&' : '?'}key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;
  
  const response = await fetch(fullUrl);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Credenciales de Trello inválidas. Revisa tu API Key y Token.');
    }
    const errorText = await response.text();
    console.error(`Trello API error: ${response.status} ${errorText}`);
    throw new Error(`Error de la API de Trello: ${response.status}`);
  }

  return response.json();
}

export async function verifyTrelloConnection(): Promise<string> {
  try {
    const memberData = (await trelloFetch('/members/me')) as { fullName: string };
    return memberData.fullName;
  } catch (error) {
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('Error de red al intentar conectar con Trello.');
  }
}

export interface TrelloBoard {
  id: string;
  name: string;
}

export interface TrelloCard {
  id: string;
  name: string;
  url: string;
}

export async function getTrelloBoards(): Promise<TrelloBoard[]> {
  try {
    const boards = (await trelloFetch('/members/me/boards?fields=name,id')) as TrelloBoard[];
    return boards;
  } catch (error) {
     if (error instanceof Error) {
        console.error('Failed to get Trello boards:', error.message);
        throw new Error(`No se pudieron obtener los tableros de Trello: ${error.message}`);
    }
    throw new Error('Ocurrió un error desconocido al obtener los tableros de Trello.');
  }
}

async function getCardsFromBoard(boardId: string): Promise<TrelloCard[]> {
    return (await trelloFetch(`/boards/${boardId}/cards?fields=name,url`)) as TrelloCard[];
}

export async function getAllCardsFromAllBoards(): Promise<TrelloCard[]> {
    try {
        const boards = await getTrelloBoards();
        const allCardsPromises = boards.map(board => getCardsFromBoard(board.id));
        const cardsPerBoard = await Promise.all(allCardsPromises);
        
        const allCards = cardsPerBoard.flat();

        allCards.sort((a, b) => a.name.localeCompare(b.name));
        
        return allCards;

    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to get all Trello cards:', error.message);
            throw new Error(`No se pudieron obtener las tarjetas de Trello: ${error.message}`);
        }
        throw new Error('Ocurrió un error desconocido al obtener las tarjetas de Trello.');
    }
}
