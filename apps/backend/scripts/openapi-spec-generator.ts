import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { generateOpenAPI } from '@/app';

const { values } = parseArgs({
  options: {
    'output-dir': {
      type: 'string',
    },
  },
});

const outputDir = values['output-dir'] ?? '.';

const authorizationUrl = process.env.KEYCLOAK_AUTHORIZATION_URL;
const tokenUrl = process.env.KEYCLOAK_TOKEN_URL;
if (authorizationUrl === undefined) {
  throw new Error('KEYCLOAK_AUTHORIZATION_URL environment variable is not set');
}
if (tokenUrl === undefined) {
  throw new Error('KEYCLOAK_TOKEN_URL environment variable is not set');
}
const document = generateOpenAPI({
  authorizationUrl,
  tokenUrl,
});

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'openapi.json'), JSON.stringify(document, null, 2));
