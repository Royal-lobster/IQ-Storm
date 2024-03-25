import { PromptTemplate } from "@langchain/core/prompts";
import endent from "endent";

const generateInitialIdeasPrompt = endent`
Generate {initialIdeasCount} unique ideas for {purpose} purpose on the domains - {domains}.\n

I want to use these technologies in the generated idea - {technologies}. So make sure to generate the idea which can make use these technologies.\n

Also describe how to use these technologies for the idea in the description.\n

The additional requirements for the generated idea are - {additionalInformation}
`;

export const generateInitialIdeasPromptTemplate = new PromptTemplate({
	template: generateInitialIdeasPrompt,
	inputVariables: [
		"initialIdeasCount",
		"purpose",
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
