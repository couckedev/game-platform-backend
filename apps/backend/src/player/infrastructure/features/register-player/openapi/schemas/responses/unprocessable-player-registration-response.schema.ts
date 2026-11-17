import z from 'zod';

const playerRegistrationRejectionReasons = [
  'NICKNAME_TOO_SHORT',
  'NICKNAME_TOO_LONG',
  'NICKNAME_FORBIDDEN_CHARACTERS',
  'NICKNAME_TOO_FEW_LETTERS',
] as const;

export const unprocessablePlayerRegistrationResponseSchema = z.object({
  rejectionReason: z.enum(playerRegistrationRejectionReasons),
});

export type UnprocessablePlayerRegistrationResponse = z.infer<
  typeof unprocessablePlayerRegistrationResponseSchema
>;
