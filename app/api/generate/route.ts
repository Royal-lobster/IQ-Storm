import { ChatOpenAI } from "@langchain/openai";
import { NextResponse, type NextRequest } from "next/server";
import { generateInputSchema } from "./schema";
import {
	generateIdeaFromTwoIdeasPromptTemplate,
	generateInitialIdeasPromptTemplate,
} from "@/lib/prompts";
import {
	CommaSeparatedListOutputParser,
	StringOutputParser,
} from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

/**
 * Handles the POST request for generating ideas. It takes in all
 * necessary input parameters and generates ideas based on them.
 */
export const POST = async (req: NextRequest) => {
	const { requirements, domains, initialIdeasCount, purpose, technologies } =
		generateInputSchema.parse(await req.json());
	const model = new ChatOpenAI();

	const initialIdeas = await RunnableSequence.from([
		generateInitialIdeasPromptTemplate,
		model,
		new CommaSeparatedListOutputParser(),
	]).invoke({
		initialIdeasCount,
		domains,
		technologies,
		requirements,
		purpose,
	});

	const allIntermediateIdeas: string[][] = [];

	const run = async (previousNodes: string[]): Promise<string[]> => {
		const intermediateIdeas = await RunnableSequence.from([
			generateIdeaFromTwoIdeasPromptTemplate,
			model,
			new StringOutputParser(),
		]).batch(
			createIdeaGroupings(previousNodes).map(([idea1, idea2]) => ({
				purpose,
				domains,
				requirements,
				idea1,
				idea2,
				technologies,
			})),
		);

		allIntermediateIdeas.push(intermediateIdeas);

		if (intermediateIdeas.length === 1) {
			return intermediateIdeas;
		}
		return await run(intermediateIdeas);
	};

	const finalIdea = (await run(initialIdeas))[0];

	return NextResponse.json({
		initialIdeas,
		allIntermediateIdeas,
		finalIdea,
	});
};

/**
 * Creates pairs of ideas from an array of strings.
 *
 * @param ideas - An array of strings representing ideas.
 * @returns An array of pairs, where each pair consists of two consecutive ideas from the input array.
 */
const createIdeaGroupings = (ideas: string[]) => {
	const ideaGroupings: [string, string][] = [];

	for (let i = 0; i < ideas.length; i++) {
		if (i === 0) continue;
		const pair: [string, string] = [ideas[i - 1], ideas[i]];
		ideaGroupings.push(pair);
	}

	return ideaGroupings;
};
