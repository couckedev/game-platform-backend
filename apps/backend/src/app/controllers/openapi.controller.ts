import { Controller, Get, Inject } from '@nestjs/common';
import { OpenAPIDocumentProvider } from '../services';

@Controller()
export class OpenAPIController {
  constructor(
    @Inject(OpenAPIDocumentProvider)
    private readonly openAPIDocumentProvider: OpenAPIDocumentProvider,
  ) {}

  @Get('openapi.json')
  getOpenAPIDocumentation(): unknown {
    return this.openAPIDocumentProvider.document;
  }
}
