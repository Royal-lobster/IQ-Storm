import { z } from "zod";

export const ideaSchema = z.object({
	title: z.string().describe("Title of the project idea"),
	description: z.string().describe("A brief description of the idea"),
});

export const requirementsSchema = z.object({
	purpose: z.string().transform((val) => decodeURIComponent(val)),
	domains: z.string().transform((val) => decodeURIComponent(val)),
	technologies: z.string().transform((val) => decodeURIComponent(val)),
	additionalInformation: z
		.string()
		.transform((val) => decodeURIComponent(val))
		.default("NONE"),
});

export const IdeaSetsSchema = z.object({
	ideas: z.array(ideaSchema),
	likedIdeaIndex: z.number().optional(),
	feedback: z.string().optional(),
});

export const ideateInputSchema = z.object({
	ideaSets: IdeaSetsSchema.array(),
	requirements: requirementsSchema,
});

export const ideateOutputSchema = z.object({
	ideas: z.array(ideaSchema),
});

export type Idea = z.infer<typeof ideaSchema>;
export type IdeaSets = z.infer<typeof IdeaSetsSchema>;
export type Requirements = z.infer<typeof requirementsSchema>;
export type IdeateInput = z.infer<typeof ideateInputSchema>;
export type IdeateOutput = z.infer<typeof ideateOutputSchema>;
