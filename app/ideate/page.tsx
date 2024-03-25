import { requirementsSchema } from "../api/ideate/schema";
import ActiveIdeaSet from "./ActiveIdeaSet";
import Header from "./Header";
import PreviousIdeaSet from "./PreviousIdeaSet";

export interface IdeatePageProps {
	searchParams: Record<string, string>;
}

function IdeatePage({ searchParams }: IdeatePageProps) {
	const { purpose, domains, technologies } =
		requirementsSchema.parse(searchParams);
	return (
		<div className="container py-20">
			<Header purpose={purpose} domains={domains} technologies={technologies} />
			<div className="space-y-10 mt-10 flex flex-col items-center justify-center">
				<PreviousIdeaSet ideas={[{
					title: "Crypto Education Platform with Al-Powered Learning Paths",
					description: "A platform that uses AI to create personalized learning paths for users to learn about blockchain and cryptocurrencies.",
				}, {
					title: "Decentralized Healthcare Marketplace",
					description: "A decentralized marketplace where patients can buy and sell healthcare services using cryptocurrencies.",
				}]} defaultCheckedIdea="2" />

				<ActiveIdeaSet
					ideas={[{
						title: "AI-Powered Crypto Trading Bot",
						description: "A trading bot that uses AI to analyze market trends and make profitable trades.",
					}, {
						title: "Blockchain-Based Voting System",
						description: "A secure and transparent voting system that uses blockchain technology to prevent fraud.",
					}]}
					count={2}
					isFetching={false}
				/>
			</div>
		</div>
	);
}

export default IdeatePage;
