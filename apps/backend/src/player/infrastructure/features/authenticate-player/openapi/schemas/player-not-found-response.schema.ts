import z from 'zod';

export const playerNotFoundResponseSchema = z.object({
  message: z.literal('Player not found'),
});
export type PlayerNotFoundResponse = z.infer<typeof playerNotFoundResponseSchema>;
