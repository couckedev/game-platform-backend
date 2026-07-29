import z from 'zod';

export const httpRegisterPlayerFailureResponseBody = z.object({
  rejectionReason: z.literal('NICKNAME_TOO_SHORT'),
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
