"use server";

import { action } from "@/lib/safe-action";
import { ideaImplementSchema } from "./schema";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ideaImplementPromptTemplate } from "@/lib/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

// export const implementIdea = action(
//     ideaImplementSchema,
//     async()
// )