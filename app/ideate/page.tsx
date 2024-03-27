"use client";

import { requirementsSchema, type IdeaSets } from "./schema";
import ActiveIdeaSet from "./ActiveIdeaSet";
import Header from "./Header";
import PreviousIdeaSet from "./PreviousIdeaSet";
import { useAction } from "next-safe-action/hooks";
import { createIdeaSet } from "./createIdeaSet";
import { useState } from "react";
import { toast } from "sonner";

export interface IdeatePageProps {
	searchParams: Record<string, string>;
}

function IdeatePage({ searchParams }: IdeatePageProps) {
	const { purpose, domains, technologies } =
		requirementsSchema.parse(searchParams);

	const [ideaSets, setIdeaSets] = useState<IdeaSets[]>([]);

	const { execute, status } = useAction(createIdeaSet, {
		onSuccess: (data) => {
			const ideaSet = JSON.parse(JSON.stringify(data))
			console.log({ ideaSets, ideaSet })
			setIdeaSets((old) => [...old, ideaSet]);
		},
		onError: (error) => {
			toast.error(error.fetchError || error.serverError || "An error occurred");
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
					ideaSets.filter(i => i.likedIdeaIndex).map((ideaSet, i) => (
						<PreviousIdeaSet
							key={ideaSet.ideas[0].title}
							ideas={ideaSet.ideas}
							feedback={ideaSet.feedback}
							likedIdea={String(ideaSet.likedIdeaIndex)}
						/>
					))
				}
				<ActiveIdeaSet
					ideas={ideaSets.length ? ideaSets[ideaSets.length - 1]?.ideas : []}
					count={2}
					isFetching={status === "executing" || ideaSets.length === 0}
					handleCreateIdeaSet={handleCreateIdeaSet}
				/>
			</div>
		</div>
	);
}

export default IdeatePage;
