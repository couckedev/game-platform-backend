import z from 'zod';

export const httpRegisterPlayerSuccessResponseBody = z.object();
export const httpRegisterPlayerSuccessResponse = z.union([
  z.object({
    statusCode: z.literal(201),
    body: httpRegisterPlayerSuccessResponseBody,
  }),
]);

export type HttpRegisterPlayerSuccessResponse = z.infer<
  typeof httpRegisterPlayerSuccessResponse
>;
