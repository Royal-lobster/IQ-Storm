import { z } from "zod";

const ideaSchema = z.object({
	title: z.array(z.string()),
	description: z.array(z.string()),
});

export const requirementsSchema = z.object({
	purpose: z.string().transform((val) => decodeURIComponent(val)),
	domains: z.string().transform((val) => decodeURIComponent(val)),
	technologies: z.string().transform((val) => decodeURIComponent(val)),
	additionalInformation: z.string().transform((val) => decodeURIComponent(val)),
});

export const ideateInputSchema = z.object({
	previousIdeas: z.object({
			ideas: ideaSchema,
			chosenIndex: z.number(),
			feedback: z.string(),
		}),
	requirements: requirementsSchema,
});
  
export const ideateOutputSchema = z.object({
	ideas: z.array(ideaSchema),
});

export type Idea = z.infer<typeof ideaSchema>;
export type Requirements = z.infer<typeof requirementsSchema>;
export type IdeateInput = z.infer<typeof ideateInputSchema>;
export type IdeateOutput = z.infer<typeof ideateOutputSchema>;