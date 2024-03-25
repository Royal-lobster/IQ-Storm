import { ChatOpenAI } from "@langchain/openai";
import { NextResponse, type NextRequest } from "next/server";
import { ideateInputSchema, requirementsSchema} from "./schema";
import { generateInitialIdeasPromptTemplate, generateFollowUpIdeasPromptTemplate } from "@/lib/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

interface requirements {
    purpose: string;
    domains: string;
    technologies: string;
    additionalInformation: string;
}

/**
 * Handle both initial and follow-up POST requests for idea generation.
 * It takes in all necessary input parameters and generates ideas based on them.
 */

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const result = ideateInputSchema.safeParse(body);
  let initialIdeas, followUpIdeas;

  if (result.success) {
    const { previousIdeas, requirements } = result.data;
    const prompt = generateFollowUpIdeasPromptTemplate

    followUpIdeas = await generateIdeas(prompt, requirements, previousIdeas);
  } else {
    const  requirements  = requirementsSchema.parse(body);

    const prompt = generateInitialIdeasPromptTemplate

    initialIdeas = await generateIdeas(prompt, requirements);
  }

  console.log("Generated ideas", initialIdeas || followUpIdeas);

  return NextResponse.json({
    ideas: initialIdeas || followUpIdeas,
  });
};

/**
 * Generates ideas based on the provided prompt.
 * This function encapsulates the logic to call the OpenAI API.
 */
async function generateIdeas(prompt:any, requirements: requirements, previousIdeas?: { ideas: { title: string[]; description: string[]; }; chosenIndex: number; feedback: string; }) {
  const parser = new JsonOutputFunctionsParser();

  const schema = z.object({
    title: z.array(z.string()).describe("Title of the idea"),
    Description: z.array(z.string()).describe("descriptions describing how the technologies can be used for each idea in order and don't mention the title again here"),
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

  let invokeParams: {
    initialIdeasCount: number;
    purpose: string;
    domains: string;
    technologies: string;
    additionalInformation: string;
    previousIdea?: string;
    feedback?: string;
  } = {
    initialIdeasCount: 2,
    purpose: requirements.purpose,
    domains: requirements.domains,
    technologies: requirements.technologies,
    additionalInformation: requirements.additionalInformation,
  };

  if (previousIdeas) {
    const { ideas, chosenIndex, feedback } = previousIdeas;
    const selectedTitle = ideas.title[chosenIndex];
	const selectedDescription = ideas.description[chosenIndex];
    const previousIdeaStr = `title: ${selectedTitle}\ndescription: ${selectedDescription}`;

	invokeParams.previousIdea = previousIdeaStr;
    invokeParams.feedback = feedback;
  }


  const model = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
  })
  .bind(modelParams)
  .pipe(parser);

  const chain = prompt.pipe(model);

  const ideas = await chain.invoke(invokeParams);

  return ideas;

}
