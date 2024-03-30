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

const ideaSetFeedbackPrompt = endent`
	I like this idea - {likedIdeaIndex}.\nGenerate {initialIdeasCount} more ideas based on this idea which I like.\nalso my feedback on it is:
	{feedback}
`;

export const ideaSetFeedbackPromptTemplate = new PromptTemplate({
	template: ideaSetFeedbackPrompt,
	inputVariables: ["likedIdeaIndex", "initialIdeasCount", "feedback"],
});

const ideaImplementation = endent`
	Give me steps to briefly describing how to implement below idea for the purpose of {purpose} -\n{selectedIdeaIndex}\n
	Here are the techologies that i need to use during implementation - {technologies}.\n
	I want the steps to be in order and dont involve any kind of code snippets, i just want explanation in plain english.
`

export const ideaImplementPromptTemplate = new PromptTemplate({
	template: ideaImplementation,
	inputVariables: ["purpose", "selectedIdeaIndex", "technologies"],
})