import { z } from "zod";

export const generateInputSchema = z.object({
	purpose: z.string(),
	requirements: z.string(),
	domains: z.string().array(),
	technologies: z.string().array(),
	initialIdeasCount: z.number().min(1).max(50),
});
