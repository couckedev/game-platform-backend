import z from 'zod';

export const httpRegisterPlayerUnprocessableEntityResponseBody = z.object({
  rejectionReason: z.enum([
    'NICKNAME_TOO_SHORT',
    'NICKNAME_TOO_LONG',
    'NICKNAME_TOO_FEW_LETTERS',
    'NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS',
  ]),
});
export const httpRegisterPlayerUnprocessableEntityResponse = z.union([
  z.object({
    statusCode: z.literal(422),
    body: httpRegisterPlayerUnprocessableEntityResponseBody,
  }),
]);

export type HttpRegisterPlayerUnprocessableEntityResponse = z.infer<
  typeof httpRegisterPlayerUnprocessableEntityResponse
>;
