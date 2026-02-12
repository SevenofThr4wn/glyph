import { Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Character } from "@/lib/types";
import { CharacterCard } from "./character-card";
import { CharacterHeroCard } from "./character-hero-card";

interface TrendingCharactersProps {
  featuredCharacters: Character[];
  regularCharacters: Character[];
  onViewAll?: () => void;
}

export function TrendingCharacters({
  featuredCharacters,
  regularCharacters,
  onViewAll,
}: TrendingCharactersProps) {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <Flame className="text-primary size-8" />
          <h2 className="text-3xl font-bold">Trending Characters</h2>
        </div>
        <Button variant="outline" onClick={onViewAll}>
          View all
          <ArrowRight className="ml-1 size-4" />
        </Button>
      </div>

      {/* Featured Characters Section */}
      {featuredCharacters.length > 0 && (
        <div className="mb-8">
          <div className="grid gap-5 md:grid-cols-2">
            {featuredCharacters.map((character) => (
              <CharacterHeroCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Characters Section */}
      {regularCharacters.length > 0 && (
        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-semibold">
            More Trending
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {regularCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
