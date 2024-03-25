import { ChatOpenAI } from "@langchain/openai";
import { NextResponse, type NextRequest } from "next/server";
import { requirementsSchema } from "./schema";
import {generateInitialIdeasPromptTemplate,} from "@/lib/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Handles the POST request for generating ideas. It takes in all
 * necessary input parameters and generates ideas based on them.
 */
export const POST = async (req: NextRequest) => {
	const { domains, additionalInformation, purpose, technologies } = requirementsSchema.parse(await req.json());

	const parser = new JsonOutputFunctionsParser();

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

	const initialIdeas = await chain.invoke({ initialIdeasCount: 2, purpose: purpose, domains: domains, technologies: technologies, additionalInformation: additionalInformation });

	console.log("Got initial ideas", initialIdeas);

	return NextResponse.json({
		initialIdeas,
	});
};
