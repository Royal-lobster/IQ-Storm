"use server";

import { action } from "@/lib/safe-action";
import { ideaSchema, ideateInputSchema } from "./schema";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { generateInitialIdeasPromptTemplate, ideaSetFeedbackPromptTemplate } from "@/lib/prompts";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export const createIdeaSet = action(
	ideateInputSchema,
	async ({ ideaSets, requirements }) => {
		const model = new ChatOpenAI();

		const initialMessage = await generateInitialIdeasPromptTemplate.format({
			...requirements,
			initialIdeasCount: 2,
		});

		const outputParser = StructuredOutputParser.fromZodSchema(
			ideaSchema.array(),
		);

		// Gather messages from previous iterations
		const messages = [new HumanMessage(initialMessage)];
		for (const ideaSet of ideaSets) {
      const ideaSuggestion = JSON.stringify(ideaSet.ideas)
      const ideaFeedback = await ideaSetFeedbackPromptTemplate.format({
        feedback: ideaSet.feedback,
        initialIdeasCount: 2,
        likedIdeaIndex: ideaSet.likedIdeaIndex
      })
			messages.push(new AIMessage(ideaSuggestion), new HumanMessage(ideaFeedback));
		}
		const prompt = ChatPromptTemplate.fromMessages(messages);

		// Run the chain
		const ideas = await RunnableSequence.from([
			prompt,
			model,
			outputParser,
		]).invoke({});

		return { ideas };
	},
);
