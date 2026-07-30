import { BadRequestException, type PipeTransform } from '@nestjs/common';
import type z from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) {}

  transform(value: unknown) {
    const { data, success, error } = this.schema.safeParse(value);

    if (!success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          code: issue.code,
          message: issue.message,
        })),
      });
    }

    return data;
  }
}
