import z from 'zod';

export const httpRegisterPlayerRequestSchema = z.object({
  nickname: z.string(),
});

export type HttpRegisterPlayerRequest = z.infer<
  typeof httpRegisterPlayerRequestSchema
>;
