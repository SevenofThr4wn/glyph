import z from "zod";

export const createCharacterSchema = z.object({
    name: z.string().min(1).max(150),
});

export const updateCharacterSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(150).optional(),
    gender: z.enum(["Male", "Female", "NonBinary"]).optional(),
    sexualOrientation: z.enum(["ASEXUAL", "BISEXUAL",  "GAY", "HETEROSEXUAL", "PREFER_NOT_TO_SAY"]).optional(),
    bio: z.string().max(5000).optional(),
    
});

export const getCharacterSchema = z.object({
    id: z.string().uuid()
});

export const trendingCharactersSchema = z.object({
    featuredLimit: z.number().int().positive().max(100).default(2),
    regularLimit: z.number().int().positive().max(100).default(5),
    featuredCharacters: z.object({
        id: z.string().uuid(),
        characterName: z.string().min(1).max(150),
        creator: z.string().min(1).max(100),
        likes: z.number().int().nonnegative(),
        imageUrl: z.string().url(),
        description: z.string().max(5000).optional(),
        tags: z.array(z.string().min(1).max(50)).optional(),
    }).array(),
    regularCharacters: z.object({
        id: z.string().uuid(),
        characterName: z.string().min(1).max(150),
        creator: z.string().min(1).max(100),
        likes: z.number().int().nonnegative(),
        imageUrl: z.string().url(),
        description: z.string().max(5000).optional(),
        tags: z.array(z.string().min(1).max(50)).optional(),
    }).array()
});