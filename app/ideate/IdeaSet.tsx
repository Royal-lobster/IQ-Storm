"use client";

import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import IdeaCard from "./IdeaCard";
import type { Idea } from "../api/ideate/schema";
import LoadingIdeaCard from "./LoadingIdeaCard";

interface IdeaSetProps {
  ideas: Idea[];
  isActive?: boolean;
  isFetching?: boolean;
  count: number;
}

function IdeaSet({ ideas, isActive, isFetching, count }: IdeaSetProps) {
  return (
    <RadioGroup.Root className="flex gap-4" disabled={!isActive || isFetching}>
      {isFetching
        ? Array.from({ length: count }).map((_) => <LoadingIdeaCard />)
        : ideas.map((idea, i) => (
          <RadioGroup.Item value={String(i + 1)} className="group">
            <IdeaCard title={idea.title} description={idea.description} />
          </RadioGroup.Item>
        ))}
    </RadioGroup.Root>
  );
}

export default IdeaSet;
