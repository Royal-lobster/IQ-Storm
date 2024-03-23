import { PromptTemplate } from "@langchain/core/prompts";
import endent from "endent";

// Initial prompt for generating ideas ========================================
const generateInitialIdeasPrompt = endent`
  Generate {ideaCount} ideas for {purpose} in {domains}. with the following requirements

  {requirements}

  I want to use {technologies} for it.

  Generate list of ideas where each idea should be just a single sentence and start with a new line and
	list number.

	You must just start generating ideas without any introductions.
`;
export const generateInitialIdeasPromptTemplate = new PromptTemplate({
	template: generateInitialIdeasPrompt,
	inputVariables: [
		"ideaCount",
		"domains",
		"technologies",
		"requirements",
		"purpose",
	],
});

// Prompt for generating ideas based on feedback ===============================
export const generateIdeaBasedOnFeedbackPrompt = endent`
	So far, I liked these Ideas:
	{likedIdeas}

	And I didn't like these Ideas:
	{dislikedIdeas}

	Please generate an idea based on the feedback.
`;
export const generateIdeaFromTwoIdeasPromptTemplate = new PromptTemplate({
	template: generateIdeaBasedOnFeedbackPrompt,
	inputVariables: ["likedIdeas", "dislikedIdeas"],
});

// Prompt for formatting ideas with feedback ===================================
export const likedIdeaPrompt = endent`- {ideaTitle} because it is {feedbackReason}`;
export const linkedIdeaPromptTemplate = new PromptTemplate({
	template: likedIdeaPrompt,
	inputVariables: ["ideaTitle", "feedbackReason"],
});

export const dislikedIdeaPrompt = endent`- {ideaTitle} because it is not {feedbackReason}`;
export const dislikedIdeaPromptTemplate = new PromptTemplate({
	template: dislikedIdeaPrompt,
	inputVariables: ["ideaTitle", "feedbackReason"],
});
