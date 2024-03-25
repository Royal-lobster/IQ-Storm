"use server";

import { action } from "@/lib/safe-action";
import { ideateInputSchema, requirementsSchema } from "./schema";
import { generateInitialIdeasPromptTemplate, generateFollowUpIdeasPromptTemplate } from "@/lib/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

interface IdeaSet {
	ideas: {
	  title: string[];
	  description: string[];
	};
	chosenIndex: number;
	feedback: string;
}

interface requirements {
    purpose: string;
    domains: string;
    technologies: string;
    additionalInformation: string;
}

const generateIdeas = async (prompt: any, requirements: requirements, ideaSets?: { ideas: { title: string[]; description: string[]; }; chosenIndex: number; feedback: string; }) => {
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
  
    if (ideaSets) {
      const { ideas, chosenIndex, feedback } = ideaSets;
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
  };

  	/* Here the input will be ideaSets of type ideateInputSchema 
 	   and requirements of type requirementsSchema from schema.ts
  	   The return type of function createIdeaSet is -
       	z.object({
       		title: z.array(z.string()),
    		Description: z.array(z.string()),
    	});
	*/

export const createIdeaSet = action(
    ideateInputSchema,
    async ({ ideaSets, requirements }: {
		ideaSets?: IdeaSet;
		requirements: requirements;
	  }) => {
        let prompt, generatedIdeas;
        
        if (ideaSets) {
            prompt = generateFollowUpIdeasPromptTemplate;
            generatedIdeas = await generateIdeas(prompt, requirements, ideaSets);
        } else {
            prompt = generateInitialIdeasPromptTemplate;
            requirements = requirementsSchema.parse(requirements);
            generatedIdeas = await generateIdeas(prompt, requirements);
        }
        return {
            ideas: generatedIdeas,
        };
    },
);
