"use server";

import { trendingCharactersSchema } from "@/lib/schemas";
import { createRouter, publicProcedure } from "../trpc";

export const characterRouter = createRouter({
  getTrendingCharacters: publicProcedure
    .input(trendingCharactersSchema)
    .query(async ({ input, ctx }) => {
      const { featuredLimit, regularLimit } = input;
      const characters = await ctx.prisma.character.findMany({
        orderBy: { likes: "desc" },
        take: featuredLimit + regularLimit,
      });

      const featuredCharacters = characters.slice(0, featuredLimit);
      const regularCharacters = characters.slice(
        featuredLimit,
        featuredLimit + regularLimit,
      );

      return {
        featuredCharacters: featuredCharacters.map((char) => ({
          id: char.id,
          characterName: char.name,
          creator: char.name,
          likes: char.likes,
          imageUrl: char.thumbnailUrl || "",
          description: char.briefDescription || "",
        })),
        regularCharacters: regularCharacters.map((char) => ({
          id: char.id,
          characterName: char.name,
          creator: char.name,
          likes: char.likes,
          imageUrl: char.thumbnailUrl || "",
          description: char.briefDescription || "",
        })),
      };
    }),
});
