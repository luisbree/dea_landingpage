
// src/ai/flows/filter-search.ts
'use server';
/**
 * @fileOverview A flow for filtering Trello cards based on keywords.
 *
 * - filterStudies - A function that filters studies based on keywords.
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
  keywords: z.string().describe('Keywords to filter the studies by.'),
  boardId: z.string().describe('The Trello board ID to search for studies.'),
});
export type FilterStudiesInput = z.infer<typeof FilterStudiesInputSchema>;

const FilterStudiesOutputSchema = z.array(StudySchema).describe('Filtered list of environmental studies with their coordinates.');
export type FilterStudiesOutput = z.infer<typeof FilterStudiesOutputSchema>;

// Helper to extract coordinates from card description
const extractCoordinates = (description: string): [number, number] | null => {
    const match = description.match(/coords:\s*\[\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]/);
    if (match && match[1] && match[2]) {
        return [parseFloat(match[1]), parseFloat(match[2])];
    }
    return null;
}

export async function filterStudies(input: FilterStudiesInput): Promise<FilterStudiesOutput> {
  const flowResult = await filterStudiesFlow(input);
  // Transform coordinates for OpenLayers
  return flowResult.map(study => ({
    ...study,
    coordinates: fromLonLat(study.coordinates) as [number, number],
  }));
}

const filterStudiesPrompt = ai.definePrompt({
  name: 'filterStudiesPrompt',
  input: {
    schema: z.object({
      keywords: z.string(),
      studies: z.array(z.object({ name: z.string(), description: z.string() }))
    })
  },
  output: { schema: FilterStudiesOutputSchema },
  prompt: `You are an AI assistant that filters a list of environmental studies from Trello based on keywords provided by the user.

  The user will provide keywords to filter by. Your goal is to return a new list containing only the studies that are relevant to the keywords.
  For each relevant study, extract the coordinates from the description. The coordinates are in the format "coords: [lon, lat]".

  Return the full study object, including name and the extracted coordinates, for each relevant study. If a study is relevant but has no coordinates, you can omit it.

  Here are the keywords: {{{keywords}}}
  Here are the studies:
  {{#each studies}}
  - Name: {{{this.name}}}, Description: {{{this.description}}}
  {{/each}}
  `,
});


const filterStudiesFlow = ai.defineFlow(
  {
    name: 'filterStudiesFlow',
    inputSchema: FilterStudiesInputSchema,
    outputSchema: FilterStudiesOutputSchema,
  },
  async (input) => {
    const trelloCards = await searchTrelloCards(input.boardId, input.keywords);

    const studiesToFilter = trelloCards.map(card => ({
        name: card.name,
        description: card.desc,
    }));

    if (studiesToFilter.length === 0) {
        return [];
    }

    const { output } = await filterStudiesPrompt({
        keywords: input.keywords,
        studies: studiesToFilter,
    });

    return output!;
  }
);
