
'use server';

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;
const BASE_URL = 'https://api.trello.com/1';

if (!TRELLO_API_KEY || !TRELLO_API_TOKEN) {
  throw new Error('Trello API Key and Token must be set in .env');
}

export async function verifyTrelloConnection(): Promise<string> {
  const fetch = (await import('node-fetch')).default;
  const url = `${BASE_URL}/members/me?key=${TRELLO_API_KEY}&token=${TRELLO_API_TOKEN}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Credenciales de Trello inválidas. Revisa tu API Key y Token en el archivo .env.');
        }
        const errorText = await response.text();
        console.error(`Trello API error: ${response.status} ${errorText}`);
        throw new Error('No se pudo verificar la conexión con Trello.');
    }

    const memberData = (await response.json()) as { fullName: string };
    return memberData.fullName;
  } catch (error) {
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('Error de red al intentar conectar con Trello.');
  }
}
