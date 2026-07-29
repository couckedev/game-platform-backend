import type { PipeTransform } from '@nestjs/common';
import type z from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) {}

  transform(value: unknown) {
    return this.schema.safeParse(value).data;
  }
}
