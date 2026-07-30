import z from 'zod';

export const httpRegisterPlayerFailureResponseBody = z.object({
  rejectionReason: z.enum(['NICKNAME_TOO_SHORT', 'NICKNAME_TOO_LONG']),
});
export const httpRegisterPlayerFailureResponse = z.union([
  z.object({
    statusCode: z.literal(422),
    body: httpRegisterPlayerFailureResponseBody,
  }),
]);

export type HttpRegisterPlayerFailureResponse = z.infer<
  typeof httpRegisterPlayerFailureResponse
>;
