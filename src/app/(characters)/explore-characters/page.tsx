"use client";

import { TrendingCharacters } from "@/components/pages/characters/explore-characters";
import { Character } from "@/lib/types/character";
import { faker } from "@faker-js/faker";

// Placeholder data for demonstration purposes

// Will be replaced with a tRPC call to fetch real data from the server in the future.
const placeholderCreatorName = faker.internet.displayName();

const placeholderDescripiton = faker.lorem.sentences(4);

const sampleFeaturedCharacters: Character[] = [
  {
    id: "1",
    characterName: "Featured Character 1",
    creator: placeholderCreatorName,
    likes: 250,
    imageUrl: "https://picsum.photos/seed/blackwidow/600/300",
    description: placeholderDescripiton,
  },
  {
    id: "2",
    characterName: "Featured Character 2",
    creator: placeholderCreatorName,
    likes: 250,
    imageUrl: "https://picsum.photos/seed/glowbegone/600/300",
    description: placeholderDescripiton,
  },
];

const sampleRegularCharacters: Character[] = [
  {
    id: "3",
    characterName: "Regular Character 1",
    creator: placeholderCreatorName,
    likes: 210,
    imageUrl: "https://picsum.photos/seed/darkapprentice/400/225",
  },
  {
    id: "4",
    characterName: "Regular Character 2",
    creator: placeholderCreatorName,
    likes: 250,
    imageUrl: "https://picsum.photos/seed/horsesave/400/225",
  },
  {
    id: "5",
    characterName: "Regular Character 3",
    creator: placeholderCreatorName,
    likes: 250,
    imageUrl: "https://picsum.photos/seed/jailgrates/400/225",
  },
  {
    id: "6",
    characterName: "Regular Character 4",
    creator: placeholderCreatorName,
    likes: 250,
    imageUrl: "https://picsum.photos/seed/arrowspin/400/225",
  },
];


export default function ExploreCharactersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TrendingCharacters
        featuredCharacters={sampleFeaturedCharacters}
        regularCharacters={sampleRegularCharacters}
      />
    </div>
  );
}
