"use client"

import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import IdeaCard from "./IdeaCard";

interface IdeaCardsProps {
  ideas: { title: string; description: string }[];
  disabled?: boolean;
}

function IdeaSet({ ideas, disabled }: IdeaCardsProps) {
  return (
    <RadioGroup.Root className="flex gap-4" disabled={disabled}>
      {ideas.map((idea, i) => (
        <RadioGroup.Item value={String(i + 1)} className="group">
          <IdeaCard title={idea.title} description={idea.description} />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

export default IdeaSet;
