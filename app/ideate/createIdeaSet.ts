"use server";

import { z } from "zod";
import { action } from "@/lib/safe-action";
import { ideateInputSchema } from "./schema";

export const createIdeaSet = action(
	ideateInputSchema,
	async ({ ideaSets, requirements }) => {
		//TODO: Implement createIdeaSet

		return {
			ideas: [], //TODO: This should be actual ideas
		};
	},
);
