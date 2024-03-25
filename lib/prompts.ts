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

const generateFollowUpIdeasPrompt = endent`
  Generate {initialIdeasCount} unique ideas for {purpose} purpose on the domains - {domains}.\n

  I like this idea -\n{previousIdea}\n

  So you have to generate idea's going more deeper and iterate idea's around this idea.\n

  My feedback to this idea is - {feedback}, So you have to generate idea's according to my current feedback on idea.\n

  I want to use these technologies in the generated idea - {technologies}. So make sure to generate the idea which can make use these technologies.\n

  Also describe how to use these technologies for the idea in the description.\n

  The additional requirements for the generated idea are - {additionalInformation}
`;

export const generateFollowUpIdeasPromptTemplate = new PromptTemplate({
	template: generateFollowUpIdeasPrompt,
	inputVariables: [
		"initialIdeasCount",
		"purpose",
		"domains",
		"previousIdea",
		"feedback",
		"technologies",
		"additionalInformation",
	],
});
