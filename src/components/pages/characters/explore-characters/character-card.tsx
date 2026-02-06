"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Character } from "@/lib/types";
import { ThumbsUp } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      {/* Mod Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={character.imageUrl}
          alt={character.characterName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Mod Info */}
      <CardHeader className="pb-4">
        <CardTitle className="line-clamp-1 text-base">
          {character.characterName}
        </CardTitle>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground truncate">
            by {character.creator}
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            <ThumbsUp className="size-3.5" />
            <span>{character.likes}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
