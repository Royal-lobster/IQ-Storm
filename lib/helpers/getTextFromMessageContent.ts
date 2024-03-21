import type { MessageContent } from "@langchain/core/messages";

export const getTextFromMessageContent = (content: MessageContent) => {
	if (typeof content === "string") {
		return content;
	}
	if (content[0].type === "text") {
		return content[0].text;
	}
	return null;
};
