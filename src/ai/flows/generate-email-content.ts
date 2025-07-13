// src/ai/flows/generate-email-content.ts
'use server';

/**
 * @fileOverview AI-powered email content generation for marketing campaigns.
 *
 * - generateEmailContent - Generates subject lines and content for email marketing based on fashion trends and customer preferences.
 * - GenerateEmailContentInput - The input type for the generateEmailContent function.
 * - GenerateEmailContentOutput - The return type for the generateEmailContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmailContentInputSchema = z.object({
  fashionTrends: z
    .string()
    .describe('Current fashion trends to incorporate into the email.'),
  customerPreferences: z
    .string()
    .describe('Customer preferences and interests to tailor the email content.'),
  productName: z.string().describe('The name of the product being promoted.'),
  brandVoice: z
    .string()
    .describe(
      'The desired brand voice and tone for the email (e.g., elegant, sophisticated, modern)'
    ),
});
export type GenerateEmailContentInput = z.infer<typeof GenerateEmailContentInputSchema>;

const GenerateEmailContentOutputSchema = z.object({
  subjectLine: z.string().describe('Generated subject line for the email.'),
  emailBody: z.string().describe('Generated email body content.'),
});
export type GenerateEmailContentOutput = z.infer<typeof GenerateEmailContentOutputSchema>;

export async function generateEmailContent(
  input: GenerateEmailContentInput
): Promise<GenerateEmailContentOutput> {
  return generateEmailContentFlow(input);
}

const generateEmailContentPrompt = ai.definePrompt({
  name: 'generateEmailContentPrompt',
  input: {schema: GenerateEmailContentInputSchema},
  output: {schema: GenerateEmailContentOutputSchema},
  prompt: `You are a marketing expert specializing in crafting engaging email content for fashion brands.

  Based on current fashion trends, customer preferences, and the specified brand voice, generate a compelling subject line and email body to promote the product.

  Fashion Trends: {{{fashionTrends}}}
  Customer Preferences: {{{customerPreferences}}}
  Product Name: {{{productName}}}
  Brand Voice: {{{brandVoice}}}

  Subject Line:
  Email Body:`, // Ensure output matches the schema
});

const generateEmailContentFlow = ai.defineFlow(
  {
    name: 'generateEmailContentFlow',
    inputSchema: GenerateEmailContentInputSchema,
    outputSchema: GenerateEmailContentOutputSchema,
  },
  async input => {
    const {output} = await generateEmailContentPrompt(input);
    return output!;
  }
);
