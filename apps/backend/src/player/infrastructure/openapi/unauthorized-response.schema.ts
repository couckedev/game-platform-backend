import z from 'zod';

export const unauthorizedResponseSchema = z.object({
  message: z.literal('Unauthorized'),
});
export type UnauthorizedResponse = z.infer<typeof unauthorizedResponseSchema>;
