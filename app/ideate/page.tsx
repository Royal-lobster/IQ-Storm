"use client";

import { requirementsSchema, type IdeaSets } from "./schema";
import ActiveIdeaSet from "./ActiveIdeaSet";
import Header from "./Header";
import PreviousIdeaSet from "./PreviousIdeaSet";
import { useAction } from "next-safe-action/hooks";
import { createIdeaSet } from "./createIdeaSet";
import { useState } from "react";

export interface IdeatePageProps {
	searchParams: Record<string, string>;
}

const DUMMY_IDEAS: IdeaSets[] = [
	{
		ideas: [
			{
				title: "AI-Powered Crypto Trading Bot",
				description:
					"A trading bot that uses AI to analyze market trends and make profitable trades.",
			},
			{
				title: "Blockchain-Based Voting System",
				description:
					"A secure and transparent voting system that uses blockchain technology to prevent fraud.",
			},
		],
		likedIdeaIndex: 2,
		feedback: "I like the idea of a voting system.",
	},
	{
		ideas: [
			{
				title: "Crypto Lending Platform",
				description:
					"A platform that allows users to lend and borrow cryptocurrencies.",
			},
			{
				title: "Decentralized Social Network",
				description:
					"A social network that is not controlled by any single entity.",
			},
		],
	}
]


function IdeatePage({ searchParams }: IdeatePageProps) {
	const { purpose, domains, technologies } =
		requirementsSchema.parse(searchParams);

	const [ideaSets, setIdeaSets] = useState<IdeaSets[]>(DUMMY_IDEAS);

	const { execute, status } = useAction(createIdeaSet, {
		onSuccess: (data) => {
			const ideaSet = JSON.parse(JSON.stringify(data))
			setIdeaSets((old) => [...old, ideaSet]);
		}
	})

	const handleCreateIdeaSet = (likedIdeaIndex?: number, feedback?: string) => {
		const newIdeaSets = ideaSets.slice(0, ideaSets.length - 1)

		if (likedIdeaIndex) {
			newIdeaSets.push({
				ideas: ideaSets[ideaSets.length - 1].ideas,
				likedIdeaIndex,
				feedback
			})
		}

		execute({
			ideaSets: newIdeaSets,
			requirements: {
				purpose,
				domains,
				technologies
			}
		})
	}


	return (
		<div className="container py-20">
			<Header purpose={purpose} domains={domains} technologies={technologies} />
			<div className="space-y-10 mt-10 flex flex-col items-center justify-center">
				{
					ideaSets.map((ideaSet, i) => (
						ideaSet.likedIdeaIndex ? (
							<PreviousIdeaSet
								key={ideaSet.ideas[ideaSet.likedIdeaIndex - 1].title}
								ideas={ideaSet.ideas}
								feedback={ideaSet.feedback}
								likedIdea={String(ideaSet.likedIdeaIndex)}
							/>
						) : (
							<ActiveIdeaSet
								key="active-idea-set"
								ideas={ideaSet.ideas}
								count={2}
								isFetching={status === "executing"}
								handleCreateIdeaSet={handleCreateIdeaSet}
							/>
						)))
				}
			</div>
		</div>
	);
}

export default IdeatePage;
