import { z } from "zod";

export const requirementsSchema = z.object({
	purpose: z.string(),
	description: z.string(),
	domains: z.string().array(),
	technologies: z.string().array(),
	initialIdeasCount: z.number().min(1).max(50),
});

export const ideaSchema = z.object({
	title: z.string(),
	description: z.string(),
	feedback: z.enum(["positive", "negative"]),
	feedbackReason: z.enum(["innovative", "feasible", "impactful", "relent"]),
});

export const generateInputSchema = z.object({
	requirements: requirementsSchema,
	ideaCount: z.number().min(1).max(10).default(2),
	ideas: ideaSchema.array(),
});
