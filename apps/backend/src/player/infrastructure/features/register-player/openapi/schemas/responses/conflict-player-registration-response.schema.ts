import z from 'zod';

export const conflictPlayerRegistrationResponseSchema = z.object({
  rejectionReason: z.literal('NICKNAME_ALREADY_TAKEN'),
});