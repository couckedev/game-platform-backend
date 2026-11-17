import z from 'zod';

const playerRegistrationRejectionReasons = ['NICKNAME_TOO_SHORT'] as const;

export const unprocessablePlayerRegistrationResponseSchema = z.object({
  rejectionReason: z.enum(playerRegistrationRejectionReasons),
});

export type UnprocessablePlayerRegistrationResponse = z.infer<
  typeof unprocessablePlayerRegistrationResponseSchema
>;
