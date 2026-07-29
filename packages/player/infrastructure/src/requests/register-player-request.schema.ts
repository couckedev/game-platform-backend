import z from 'zod';

export const registerPlayerRequestSchema = z.object({
  nickname: z.string(),
});

export type RegisterPlayerRequest = z.infer<typeof registerPlayerRequestSchema>;
