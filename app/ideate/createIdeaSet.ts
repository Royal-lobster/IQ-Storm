"use server";

import { action } from "@/lib/safe-action";
import { ideaSchema, ideateInputSchema } from "./schema";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
	generateInitialIdeasPromptTemplate,
	ideaSetFeedbackPromptTemplate,
} from "@/lib/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

export const createIdeaSet = action(
	ideateInputSchema,
	async ({ ideaSets, requirements }) => {
		const model = new ChatOpenAI();
		const parser = StructuredOutputParser.fromZodSchema(ideaSchema.array());

		// Generate the initial messages
		const systemMessage = `Answer the users question as best as possible.\n${parser.getFormatInstructions()}`;
		const initialMessage = await generateInitialIdeasPromptTemplate.format({
			...requirements,
			initialIdeasCount: 2,
		});

		const messages = [
			new AIMessage(systemMessage),
			new HumanMessage(initialMessage),
		];

		// Gather messages from previous iterations
		for (const ideaSet of ideaSets) {
			const ideaSuggestion = JSON.stringify(ideaSet.ideas);
			const ideaFeedback = await ideaSetFeedbackPromptTemplate.format({
				feedback: ideaSet.feedback,
				initialIdeasCount: 2,
				likedIdeaIndex: ideaSet.likedIdeaIndex,
			});
			messages.push(
				new AIMessage(ideaSuggestion),
				new HumanMessage(ideaFeedback),
			);
		}

		// Run the chain to get the idea suggestions
		const ideas = await RunnableSequence.from([model, parser]).invoke(messages);

		return { ideas };
	},
);
