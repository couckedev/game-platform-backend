import z from 'zod';
import { PLAYER_ERRORS } from '../../translations/en';

export const registerPlayerFailureResponseSchema = z.object({
  errorMessage: z.literal(PLAYER_ERRORS.NICKNAME_TOO_SHORT),
  rejectionReason: z.literal('NICKNAME_TOO_SHORT'),
});

export type RegisterPlayerFailureResponse = z.infer<
  typeof registerPlayerFailureResponseSchema
>;
