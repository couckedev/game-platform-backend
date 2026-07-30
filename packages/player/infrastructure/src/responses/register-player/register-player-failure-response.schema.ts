import z from 'zod';

export const registerPlayerFailureResponseSchema = z.object({
  rejectionReason: z.enum(['NICKNAME_TOO_LONG', 'NICKNAME_TOO_SHORT']),
  errorMessage: z.string(),
});

export type RegisterPlayerFailureResponse = z.infer<
  typeof registerPlayerFailureResponseSchema
>;
