import { PromptTemplate } from "@langchain/core/prompts";
import endent from "endent";

const generateInitialIdeasPrompt = endent`
  Generate {initialIdeasCount} ideas for {purpose} in {domains}. with the following requirements

  {additionalInformation}

  I want to use {technologies} for it.

  Generate list of ideas where each idea should be just a single sentence and start with a new line and
	list number.

	You must just start generating ideas without any introductions.
`;

export const generateInitialIdeasPromptTemplate = new PromptTemplate({
	template: generateInitialIdeasPrompt,
	inputVariables: [
		"initialIdeasCount",
		"domains",
		"technologies",
		"additionalInformation",
		"purpose",
	],
});
