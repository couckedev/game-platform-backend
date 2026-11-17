import z from 'zod';

export const registerPlayerRequestBodySchema = z.object({
  nickname: z
    .string({ error: 'nickname is missing' })
    .nonempty({ error: 'nickname cannot be empty' }),
});

export type RegisterPlayerRequestBody = z.infer<typeof registerPlayerRequestBodySchema>;
