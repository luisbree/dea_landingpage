
// src/ai/flows/filter-search.ts
'use server';
/**
 * @fileOverview A flow for fetching Trello cards and extracting study data.
 *
 * - filterStudies - A function that gets studies and extracts their coordinates.
 * - FilterStudiesInput - The input type for the filterStudies function.
 * - FilterStudiesOutput - The return type for the filterStudies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fromLonLat } from 'ol/proj';
import { searchTrelloCards } from '@/services/trello';

const StudySchema = z.object({
  name: z.string().describe('The name of the environmental study.'),
  coordinates: z.tuple([z.number(), z.number()]).describe('The longitude and latitude [lon, lat] for the study location.'),
});

const FilterStudiesInputSchema = z.object({
  keywords: z.string().describe('Keywords to provide context to the AI. The primary filtering will be done client-side.'),
  boardId: z.string().describe('The Trello board ID to search for studies.'),
});
export type FilterStudiesInput = z.infer<typeof FilterStudiesInputSchema>;

const FilterStudiesOutputSchema = z.array(StudySchema).describe('List of all environmental studies found with their coordinates.');
export type FilterStudiesOutput = z.infer<typeof FilterStudiesOutputSchema>;

// Helper to extract coordinates from card description
const extractCoordinates = (description: string): [number, number] | null => {
    const match = description.match(/coords:\s*\[\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]/);
    if (match && match[1] && match[2]) {
        // IMPORTANT: Trello gives [lon, lat], fromLonLat expects [lon, lat]
        return [parseFloat(match[1]), parseFloat(match[2])];
    }
    return null;
}

export async function filterStudies(input: FilterStudiesInput): Promise<FilterStudiesOutput> {
  const trelloCards = await searchTrelloCards(input.boardId, input.keywords);
  
  const studiesWithCoords = trelloCards.map(card => {
    const coords = extractCoordinates(card.desc);
    if (coords) {
      return {
        name: card.name,
        // Transform coordinates for OpenLayers
        coordinates: fromLonLat(coords) as [number, number],
      };
    }
    return null;
  }).filter((study): study is { name: string; coordinates: [number, number] } => study !== null);

  return studiesWithCoords;
}

// The AI flow is no longer needed for direct filtering, but we can keep it for future, more complex extractions.
// For now, the logic is handled directly in the exported `filterStudies` function.

const filterStudiesFlow = ai.defineFlow(
  {
    name: 'filterStudiesFlow',
    inputSchema: FilterStudiesInputSchema,
    outputSchema: FilterStudiesOutputSchema,
  },
  async (input) => {
    // This flow now acts as a wrapper. The main logic is in the exported function for direct use.
    return filterStudies(input);
  }
);
