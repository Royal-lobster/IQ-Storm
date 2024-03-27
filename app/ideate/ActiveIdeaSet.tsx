"use client";

import React from "react";
import * as RadioGroup from '@radix-ui/react-radio-group';
import IdeaCard from "./IdeaCard";
import type { Idea } from "./schema";
import LoadingIdeaCard from "./LoadingIdeaCard";
import { Button } from "@/components/ui/button";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { range } from "@/lib/utils";

interface IdeaSetProps {
  ideas?: Idea[];
  isFetching?: boolean;
  defaultCheckedIdea?: string;
  count: number;
  handleCreateIdeaSet: (likedIdeaIndex?: number, feedback?: string) => void;

}

function ActiveIdeaSet({ ideas, isFetching, count, defaultCheckedIdea, handleCreateIdeaSet }: IdeaSetProps) {
  const [likedIdeaIndex, setLikedIdeaIndex] = React.useState<string | undefined>(defaultCheckedIdea);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const feedback = data.get("feedback") as string ?? undefined;
    const likedIdeaIndexNumber = Number(data.get("likedIdeaIndex") as string ?? undefined);

    handleCreateIdeaSet(likedIdeaIndexNumber, feedback);
  }

  return (
    <div>
      <form className="space-y-6 border p-6 w-max rounded-md bg-primary/10 border-primary" onSubmit={handleFormSubmit}>
        <Label htmlFor="likedIdeaIndex" className="text-xl font-semibold text-primary">Which one do you like?</Label>
        <RadioGroup.Root className="flex justify-center items-stretch flex-wrap gap-4"
          disabled={isFetching}
          onValueChange={setLikedIdeaIndex}
          value={likedIdeaIndex}
          name="likedIdeaIndex"
        >
          {isFetching || !ideas
            ? range(count).map((i) => <LoadingIdeaCard key={i} />)
            : ideas.map((idea, i) => (
              <RadioGroup.Item value={String(i + 1)} className="group" key={idea.title}>
                <IdeaCard title={idea.title} description={idea.description} />
              </RadioGroup.Item>
            ))}
        </RadioGroup.Root>
        {likedIdeaIndex && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="feedback">Why did you like it ?</Label>
            <Textarea placeholder="Type your message here." id="feedback" />
            <p className="text-sm text-muted-foreground">
              This will help both you and me to know what you really want.
            </p>
          </div>
        )}
        <Button disabled={isFetching || !ideas} variant="outline" type="submit" className="flex translate-y-10 !mt-0 mx-auto border-primary">
          {likedIdeaIndex ? "Generate More" : "Don't like any"}
          {likedIdeaIndex ? <PlusIcon /> : <ReloadIcon />}
        </Button>
      </form >

      {ideas && likedIdeaIndex && <div className="flex justify-end items-center mt-20 gap-6">
        <p className="text-right">
          <span>Wanna start with implementing</span> <br />
          <span className="text-primary"> {ideas[Number(likedIdeaIndex) - 1].title}</span>
        </p>
        <Button>Start Implementing</Button>
      </div>}
    </div>
  );
}

export default ActiveIdeaSet;
