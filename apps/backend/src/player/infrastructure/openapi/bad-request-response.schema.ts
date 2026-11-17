import z from 'zod';

export const badRequestResponse = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
      path: z.string().optional(),
    }),
  ),
});

export type BadRequestResponse = z.infer<typeof badRequestResponse>;
