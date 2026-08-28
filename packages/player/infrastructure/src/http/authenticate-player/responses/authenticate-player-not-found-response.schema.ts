import z from 'zod';

export const httpAuthenticatePlayerNotFoundResponseBody = z.object({});
export const httpAuthenticatePlayerNotFoundResponse = z.union([
  z.object({
    statusCode: z.literal(404),
    body: httpAuthenticatePlayerNotFoundResponseBody,
  }),
]);

export type HttpAuthenticatePlayerNotFoundResponse = z.infer<
  typeof httpAuthenticatePlayerNotFoundResponse
>;
