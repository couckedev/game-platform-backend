import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { playerModuleRegistry } from '@player/infrastructure/openapi';
import {
  generateOpenAPI,
  sharedModuleRegistry,
} from '@shared/infrastructure/openapi';
import { parseAppConfig } from '../src/app/configuration';

const { values } = parseArgs({
  options: {
    'output-dir': {
      type: 'string',
    },
  },
});

const outputDir = values['output-dir'] ?? '.';

const parsedEnv = parseAppConfig(process.env);

const document = generateOpenAPI([sharedModuleRegistry, playerModuleRegistry], {
  authorizationUrl: parsedEnv.authentication.authorizationUrl,
  tokenUrl: parsedEnv.authentication.tokenUrl,
});

mkdirSync(outputDir, { recursive: true });

writeFileSync(
  join(outputDir, 'openapi.json'),
  JSON.stringify(document, null, 2),
);
