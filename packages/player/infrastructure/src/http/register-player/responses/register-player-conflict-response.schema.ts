import z from 'zod';

export const httpRegisterPlayerConflictResponseBody = z.object({
  rejectionReason: z.literal('NICKNAME_ALREADY_TAKEN'),
});
export const httpRegisterPlayerConflictResponse = z.union([
  z.object({
    statusCode: z.literal(409),
    body: httpRegisterPlayerConflictResponseBody,
  }),
]);

export type HttpRegisterPlayerConflictResponse = z.infer<
  typeof httpRegisterPlayerConflictResponse
>;
