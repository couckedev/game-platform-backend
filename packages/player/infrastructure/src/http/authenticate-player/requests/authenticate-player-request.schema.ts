import z from 'zod';

export const httpAuthenticatePlayerRequestSchema = z.object({});

export type HttpAuthenticatePlayerRequest = z.infer<
  typeof httpAuthenticatePlayerRequestSchema
>;
