import { ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Character } from "@/lib/types";

interface CharacterHeroCardProps {
  character: Character;
}

export function CharacterHeroCard({ character }: CharacterHeroCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      {/* Mod Image */}
      <div className="relative aspect-2/1 overflow-hidden">
        <img
          src={character.imageUrl}
          alt={character.characterName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Mod Info */}
      <CardHeader>
        <CardTitle className="text-xl">{character.characterName}</CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">by {character.creator}</span>
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="size-4" />
            <span>{character.likes}</span>
          </div>
        </div>
      </CardHeader>

      {character.description && (
        <CardContent>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {character.description}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
