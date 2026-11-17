import z from 'zod';

export const registerPlayerRequestBodySchema = z.object({
  nickname: z.string({ error: 'nickname is missing' }),
});

export type RegisterPlayerRequestBody = z.infer<typeof registerPlayerRequestBodySchema>;
