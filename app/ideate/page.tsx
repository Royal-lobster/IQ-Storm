import { type PreviousIdea, requirementsSchema } from "../api/ideate/schema";
import ActiveIdeaSet from "./ActiveIdeaSet";
import Header from "./Header";
import PreviousIdeaSet from "./PreviousIdeaSet";

export interface IdeatePageProps {
	searchParams: Record<string, string>;
}

function IdeatePage({ searchParams }: IdeatePageProps) {
	const { purpose, domains, technologies } =
		requirementsSchema.parse(searchParams);

	const ideas: PreviousIdea[] = [
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
			chosenIndex: 2,
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

	return (
		<div className="container py-20">
			<Header purpose={purpose} domains={domains} technologies={technologies} />
			<div className="space-y-10 mt-10 flex flex-col items-center justify-center">
				{
					ideas.map((ideaSet, i) => (
						ideaSet.chosenIndex ? (
							<PreviousIdeaSet
								key={ideaSet.ideas[ideaSet.chosenIndex - 1].title}
								ideas={ideaSet.ideas}
								feedback={ideaSet.feedback}
								likedIdea={String(i + 1)}
							/>
						) : (
							<ActiveIdeaSet
								key="active-idea-set"
								ideas={ideaSet.ideas}
								count={2}
								isFetching={false}
							/>
						)))
				}
			</div>
		</div>
	);
}

export default IdeatePage;
