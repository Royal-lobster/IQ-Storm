"use client";

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import type { Idea } from "../api/ideate/schema";
import IdeaCard from "./IdeaCard";

interface IdeaSetProps {
  ideas: Idea[];
  likedIdea: string;
}

function PreviousIdeaSet({ ideas, likedIdea }: IdeaSetProps) {
  return (
    <div className="border p-6 w-max rounded-md">
      <ToggleGroup.Root className="flex justify-center items-stretch flex-wrap gap-4"
        type="single"
        disabled={true}
        value={likedIdea}
      >
        {ideas.map((idea, i) => (
          <ToggleGroup.Item value={String(i + 1)} className="group" key={idea.title}>
            <IdeaCard title={idea.title} description={idea.description} />
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div >
  );
}

export default PreviousIdeaSet;
