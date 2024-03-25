import { z } from "zod";

const ideaSchema = z.object({
	title: z.string(),
	description: z.string(),
});

export const requirementsSchema = z.object({
	purpose: z.string().transform((val) => decodeURIComponent(val)),
	domains: z.string().transform((val) => decodeURIComponent(val)),
	technologies: z.string().transform((val) => decodeURIComponent(val)),
	additionalInformation: z
		.string()
		.transform((val) => decodeURIComponent(val))
		.optional(),
});

export const previousIdeaSchema = z.object({
	ideas: z.array(ideaSchema),
	chosenIndex: z.number().optional(),
	feedback: z.string().optional(),
});

export const ideateInputSchema = z.object({
	previousIdeas: previousIdeaSchema.array(),
	requirements: requirementsSchema,
});

export const ideateOutputSchema = z.object({
	ideas: z.array(ideaSchema),
});

export type Idea = z.infer<typeof ideaSchema>;
export type PreviousIdea = z.infer<typeof previousIdeaSchema>;
export type Requirements = z.infer<typeof requirementsSchema>;
export type IdeateInput = z.infer<typeof ideateInputSchema>;
export type IdeateOutput = z.infer<typeof ideateOutputSchema>;
