import { Controller, Get } from '@nestjs/common';

@Controller()
export class SystemController {
  @Get('/ready')
  ping(): boolean {
    return true;
  }
}
