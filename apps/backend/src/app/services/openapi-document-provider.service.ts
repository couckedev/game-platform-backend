import type { OnModuleInit } from '@nestjs/common';
import { playerModuleRegistry } from '@player/infrastructure/openapi';
import {
  generateOpenAPI,
  sharedModuleRegistry,
} from '@shared/infrastructure/openapi';
import type { AppConfig } from '../configuration';

export class OpenAPIDocumentProvider implements OnModuleInit {
  private _document: ReturnType<typeof generateOpenAPI> | null = null;

  constructor(private readonly config: AppConfig) {}

  onModuleInit() {
    this._document = generateOpenAPI(
      [sharedModuleRegistry, playerModuleRegistry],
      {
        authorizationUrl: this.config.authentication.authorizationUrl,
        tokenUrl: this.config.authentication.tokenUrl,
      },
    );
  }

  get document(): ReturnType<typeof generateOpenAPI> {
    if (this._document === null)
      throw new Error('OpenAPI documentation has not been generated');
    return this._document;
  }
}
