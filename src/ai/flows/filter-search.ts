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

const FilterStudiesInputSchema = z.object({
  keywords: z.string().describe('Keywords to filter the studies by.'),
  studies: z.array(z.string()).describe('A list of environmental studies.'),
});
export type FilterStudiesInput = z.infer<typeof FilterStudiesInputSchema>;

const FilterStudiesOutputSchema = z.array(z.string()).describe('Filtered list of environmental studies.');
export type FilterStudiesOutput = z.infer<typeof FilterStudiesOutputSchema>;

export async function filterStudies(input: FilterStudiesInput): Promise<FilterStudiesOutput> {
  return filterStudiesFlow(input);
}

const filterStudiesPrompt = ai.definePrompt({
  name: 'filterStudiesPrompt',
  input: {schema: FilterStudiesInputSchema},
  output: {schema: FilterStudiesOutputSchema},
  prompt: `You are an AI assistant that filters a list of environmental studies based on keywords provided by the user.

  The user will provide a list of studies and keywords to filter by. Your goal is to return a new list containing only the studies that are relevant to the keywords.

  Here are the keywords: {{{keywords}}}
  Here are the studies: {{#each studies}}{{{this}}}\n{{/each}}`,
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
