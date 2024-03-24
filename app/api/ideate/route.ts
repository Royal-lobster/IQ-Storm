import { ChatOpenAI } from "@langchain/openai";
import { NextResponse, type NextRequest } from "next/server";
import { ideateInputSchema } from "./schema";
import {
	generateIdeaFromTwoIdeasPromptTemplate,
	generateInitialIdeasPromptTemplate,
} from "@/lib/prompts";
import {
	NumberedListOutputParser,
	StringOutputParser,
} from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

/**
 * Handles the POST request for generating ideas. It takes in all
 * necessary input parameters and generates ideas based on them.
 */
export const POST = async (req: NextRequest) => {
	const {
		requirements: { domains, additionalInformation, purpose, technologies },
	} = ideateInputSchema.parse(await req.json());

	const model = new ChatOpenAI();

	// Generate initial set of ideas
	const initialIdeas = await RunnableSequence.from([
		generateInitialIdeasPromptTemplate,
		model,
		new NumberedListOutputParser(),
	]).invoke({
		initialIdeasCount: 2,
		domains: domains,
		technologies: technologies,
		additionalInformation,
		purpose,
	});

	console.log("Got initial ideas", initialIdeas);

	// A recursive function that generates intermediate ideas until only one idea is left.
	const run = async (
		previousNodes: string[],
		allIntermediateIdeas: string[][],
	): Promise<string[]> => {
		const intermediateIdeas = await RunnableSequence.from([
			generateIdeaFromTwoIdeasPromptTemplate,
			model,
			new StringOutputParser(),
		]).batch(
			createIdeaGroupings(previousNodes).map(([idea1, idea2]) => ({
				purpose,
				domains: domains,
				additionalInformation,
				idea1,
				idea2,
				technologies,
			})),
		);
		console.log("Got intermediate ideas", intermediateIdeas);
		allIntermediateIdeas.push(intermediateIdeas);
		return intermediateIdeas.length === 1
			? intermediateIdeas
			: await run(intermediateIdeas, allIntermediateIdeas);
	};

	console.log("Running the recursive function");

	// Generate the final idea from the initial set of ideas
	const allIntermediateIdeas: string[][] = [];
	const finalIdea = (await run(initialIdeas, allIntermediateIdeas))[0];

	console.log("Got final idea", finalIdea);

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
