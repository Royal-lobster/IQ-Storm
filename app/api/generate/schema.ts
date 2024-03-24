import { z } from "zod";

export const ideateInputSchema = z.object({
	purpose: z.string().transform((val) => decodeURIComponent(val)),
	domains: z.string().transform((val) => decodeURIComponent(val)),
	technologies: z.string().transform((val) => decodeURIComponent(val)),
	additionalInformation: z.string().transform((val) => decodeURIComponent(val)),
});

export type IdeateInput = z.infer<typeof ideateInputSchema>;
