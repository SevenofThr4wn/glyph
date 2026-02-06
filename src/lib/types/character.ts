export type Character = {
  id: string;
  characterName: string;
  creator: string;
  likes: number;
  imageUrl: string;
  description?: string;
  tags?: string[];
};
