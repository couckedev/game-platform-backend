import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthcheckController {
  @Get('/ready')
  ping(): boolean {
    return true;
  }
}
