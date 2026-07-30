import z from 'zod';

export const registerPlayerFailureResponseSchema = z.object({
  rejectionReason: z.enum([
    'NICKNAME_TOO_LONG',
    'NICKNAME_TOO_SHORT',
    'NICKNAME_TOO_FEW_LETTERS',
  ]),
  errorMessage: z.string(),
});

export type RegisterPlayerFailureResponse = z.infer<
  typeof registerPlayerFailureResponseSchema
>;
