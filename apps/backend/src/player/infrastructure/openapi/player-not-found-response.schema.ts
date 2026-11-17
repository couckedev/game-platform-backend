import z from 'zod';

export const authenticatePlayerNotFoundResponseSchema = z.object({});

export type AuthenticatelayerNotFoundResponse = z.infer<
  typeof authenticatePlayerNotFoundResponseSchema
>;
