import z from 'zod';

export const playerFoundResponseSchema = z.object({
  nickname: z.string(),
});
export type PlayerFoundResponse = z.infer<typeof playerFoundResponseSchema>;
