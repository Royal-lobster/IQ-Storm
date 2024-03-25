"use client";

import * as RadioGroup from '@radix-ui/react-radio-group';
import type { Idea } from "./schema";
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
    <div className="border border-dashed p-6 w-max rounded-md">
      <RadioGroup.Root className="flex justify-center items-stretch flex-wrap gap-4"
        disabled={true}
        value={likedIdea}
      >
        {ideas.map((idea, i) => (
          <RadioGroup.Item value={String(i + 1)} className="group" key={idea.title}>
            <IdeaCard title={idea.title} description={idea.description} />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

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
