import { ideateInputSchema } from "../api/ideate/schema";
import Header from "./Header";

export interface IdeatePageProps {
	searchParams: Record<string, string>;
}

function IdeatePage({ searchParams }: IdeatePageProps) {
	const { purpose, domains, technologies } =
		ideateInputSchema.parse(searchParams);
	return (
		<div className="container py-20">
			<Header purpose={purpose} domains={domains} technologies={technologies} />
		</div>
	);
}

export default IdeatePage;
