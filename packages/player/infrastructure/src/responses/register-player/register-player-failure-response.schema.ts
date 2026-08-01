import z from 'zod';

export const registerPlayerFailureResponseSchema = z.object({
  rejectionReason: z.enum([
    'NICKNAME_TOO_LONG',
    'NICKNAME_TOO_SHORT',
    'NICKNAME_TOO_FEW_LETTERS',
    'NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS',
  ]),
  errorMessage: z.string(),
});

export type RegisterPlayerFailureResponse = z.infer<
  typeof registerPlayerFailureResponseSchema
>;
