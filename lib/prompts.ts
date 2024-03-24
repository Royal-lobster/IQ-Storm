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

const generateIdeaFromTwoIdeasPrompt = endent`
  There is a {purpose} in {domains}. with the following requirements

  {additionalInformation}

  Based on these requirements, there are 2 contestant that proposed these 2 ideas:
  - {idea1}
  - {idea2}

  I want to use {technologies} for it.

  Generate a very novel idea inspiring from these two ideas yet not copying from them.
	The idea should be just a single sentence. You must just start generating idea without any introductions.
`;

export const generateIdeaFromTwoIdeasPromptTemplate = new PromptTemplate({
	template: generateIdeaFromTwoIdeasPrompt,
	inputVariables: [
		"purpose",
		"domains",
		"additionalInformation",
		"idea1",
		"idea2",
		"technologies",
	],
});
