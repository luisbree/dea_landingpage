
// src/ai/flows/filter-search.ts
'use server';
/**
 * @fileOverview A flow for filtering environmental studies based on keywords.
 *
 * - filterStudies - A function that filters studies based on keywords.
 * - FilterStudiesInput - The input type for the filterStudies function.
 * - FilterStudiesOutput - The return type for the filterStudies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fromLonLat } from 'ol/proj';

const StudySchema = z.object({
  name: z.string().describe('The name of the environmental study.'),
  coordinates: z.tuple([z.number(), z.number()]).describe('The longitude and latitude [lon, lat] for the study location.'),
});

const FilterStudiesInputSchema = z.object({
  keywords: z.string().describe('Keywords to filter the studies by.'),
  studies: z.array(StudySchema).describe('A list of environmental studies with their coordinates.'),
});
export type FilterStudiesInput = z.infer<typeof FilterStudiesInputSchema>;

const FilterStudiesOutputSchema = z.array(StudySchema).describe('Filtered list of environmental studies with their coordinates.');
export type FilterStudiesOutput = z.infer<typeof FilterStudiesOutputSchema>;

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
  input: {schema: FilterStudiesInputSchema},
  output: {schema: FilterStudiesOutputSchema},
  prompt: `You are an AI assistant that filters a list of environmental studies based on keywords provided by the user.

  The user will provide a list of studies (with their names and coordinates) and keywords to filter by. Your goal is to return a new list containing only the studies that are relevant to the keywords.

  Return the full study object, including name and coordinates, for each relevant study.

  Here are the keywords: {{{keywords}}}
  Here are the studies:
  {{#each studies}}
  - Name: {{{this.name}}}, Coordinates: [{{this.coordinates.[0]}}, {{this.coordinates.[1]}}]
  {{/each}}
  `,
});

const filterStudiesFlow = ai.defineFlow(
  {
    name: 'filterStudiesFlow',
    inputSchema: FilterStudiesInputSchema,
    outputSchema: FilterStudiesOutputSchema,
  },
  async input => {
    const {output} = await filterStudiesPrompt(input);
    return output!;
  }
);
