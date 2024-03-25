import { requirementsSchema } from "../api/ideate/schema";
import Header from "./Header";
import IdeaSet from "./IdeaSet";

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
				<IdeaSet ideas={[{
					title: "Crypto Education Platform with Al-Powered Learning Paths",
					description: "A platform that uses AI to create personalized learning paths for users to learn about blockchain and cryptocurrencies.",
				}, {
					title: "Decentralized Healthcare Marketplace",
					description: "A decentralized marketplace where patients can buy and sell healthcare services using cryptocurrencies.",
				}]} isActive={false} count={2} isFetching={false} />

				<IdeaSet
					ideas={[{
						title: "AI-Powered Crypto Trading Bot",
						description: "A trading bot that uses AI to analyze market trends and make profitable trades.",
					}, {
						title: "Blockchain-Based Voting System",
						description: "A secure and transparent voting system that uses blockchain technology to prevent fraud.",
					}]}
					isActive={true}
					count={2}
					isFetching={false}
				/>
			</div>
		</div>
	);
}

export default IdeatePage;
