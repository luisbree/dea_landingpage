
'use server';

import fetch from 'node-fetch';

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

export async function searchTrelloCards(boardId: string, query: string): Promise<TrelloCard[]> {
  try {
    // Trello's search is broad. We'll get all cards and let the AI filter.
    const url = `${BASE_URL}/boards/${boardId}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
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
