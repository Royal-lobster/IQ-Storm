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
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { HumanMessage } from "@langchain/core/messages";


/**
 * Handles the POST request for generating ideas. It takes in all
 * necessary input parameters and generates ideas based on them.
 */
export const POST = async (req: NextRequest) => {
<<<<<<< HEAD:app/api/generate/route.ts
	
	const { requirements, domains, initialIdeasCount, purpose, technologies } =
		generateInputSchema.parse(await req.json());
=======
	const {
		requirements: { domains, additionalInformation, purpose, technologies },
	} = ideateInputSchema.parse(await req.json());
>>>>>>> 4130778f2c3e72415435677139edde7e4dbc7050:app/api/ideate/route.ts

	const parser = new JsonOutputFunctionsParser();

<<<<<<< HEAD:app/api/generate/route.ts

	const schema = z.object({
		title: z.array(z.string()).describe("Title of the idea"),
		Description: z.array(z.string()).describe("descriptions describing how the technologies can be used for each idea in order and dont mention the title again here"),
	  });


	const modelParams = {
		functions: [
			{
				name: "ideaGen",
				description: "Generates ideas given requirements",
				parameters: zodToJsonSchema(schema),
			},
		],
		function_call: { name: "ideaGen" },
	};


	const prompt = generateInitialIdeasPromptTemplate
	  
	const model = new ChatOpenAI({
		modelName: 'gpt-3.5-turbo',
		temperature: 0,
	})
	.bind(modelParams)
	.pipe(parser)

	const chain = prompt.pipe(model);

	const initialIdeas = await chain.invoke({ initialIdeasCount: initialIdeasCount, purpose: purpose, domains: domains, technologies: technologies, requirements: requirements });
=======
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
>>>>>>> 4130778f2c3e72415435677139edde7e4dbc7050:app/api/ideate/route.ts

	console.log("Got initial ideas", initialIdeas);

	// A recursive function that generates intermediate ideas until only one idea is left.
<<<<<<< HEAD:app/api/generate/route.ts
	// const run = async (
	// 	previousNodes: string[],
	// 	allIntermediateIdeas: string[][],
	// ): Promise<string[]> => {
	// 	const intermediateIdeas = await RunnableSequence.from([
	// 		generateIdeaFromTwoIdeasPromptTemplate,
	// 		model,
	// 		new StringOutputParser(),
	// 	]).batch(
	// 		createIdeaGroupings(previousNodes).map(([idea1, idea2]) => ({
	// 			purpose,
	// 			domains: domains.join(", "),
	// 			requirements,
	// 			idea1,
	// 			idea2,
	// 			technologies: technologies.join(", "),
	// 		})),
	// 	);
	// 	console.log("Got intermediate ideas", intermediateIdeas);
	// 	allIntermediateIdeas.push(intermediateIdeas);
	// 	return intermediateIdeas.length === 1
	// 		? intermediateIdeas
	// 		: await run(intermediateIdeas, allIntermediateIdeas);
	// };
=======
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
>>>>>>> 4130778f2c3e72415435677139edde7e4dbc7050:app/api/ideate/route.ts

	// console.log("Running the recursive function");

	// // Generate the final idea from the initial set of ideas
	// const allIntermediateIdeas: string[][] = [];
	// const finalIdea = (await run(initialIdeas, allIntermediateIdeas))[0];

	// console.log("Got final idea", finalIdea);

	return NextResponse.json({
		initialIdeas,
		// allIntermediateIdeas,
		// finalIdea,
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
