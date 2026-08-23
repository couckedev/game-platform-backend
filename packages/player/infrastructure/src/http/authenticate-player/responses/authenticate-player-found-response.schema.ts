import z from 'zod';

export const httpAuthenticatePlayerFoundResponseBody = z.object({
  nickname: z.string(),
});
export const httpAuthenticatePlayerFoundResponse = z.union([
  z.object({
    statusCode: z.literal(200),
    body: httpAuthenticatePlayerFoundResponseBody,
  }),
]);

export type HttpAuthenticatePlayerFoundResponse = z.infer<
  typeof httpAuthenticatePlayerFoundResponse
>;
