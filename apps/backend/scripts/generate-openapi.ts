import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { generateOpenAPI } from '../src/openapi/generate-openapi';

const { values } = parseArgs({
  options: {
    'output-dir': {
      type: 'string',
    },
  },
});

const outputDir = values['output-dir'] ?? '.';
const keycloakIssuerUrl = process.env.KEYCLOAK_ISSUER_URL;
if (!keycloakIssuerUrl) {
  throw new Error('KEYCLOAK_ISSUER_URL must be set to generate the OpenAPI document');
}
const document = generateOpenAPI(keycloakIssuerUrl);

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'openapi.json'), JSON.stringify(document, null, 2));
