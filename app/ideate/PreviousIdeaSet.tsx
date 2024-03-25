"use client";

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import type { Idea } from "../api/ideate/schema";
import IdeaCard from "./IdeaCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HeartIcon } from '@radix-ui/react-icons';


interface IdeaSetProps {
  ideas: Idea[];
  likedIdea: string;
  feedback?: string;
}

function PreviousIdeaSet({ ideas, likedIdea, feedback }: IdeaSetProps) {
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

      {feedback && (
        <Alert className="mt-4">
          <HeartIcon className='stroke-primary fill-primary' />
          <AlertTitle className='text-primary'>Why you liked it?</AlertTitle>
          <AlertDescription>{feedback}</AlertDescription>
        </Alert>
      )}
    </div >
  );
}

export default PreviousIdeaSet;
