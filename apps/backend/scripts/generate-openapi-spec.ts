import { writeFileSync } from 'node:fs';
import {
  generateOpenAPI,
  sharedModuleRegistry,
} from '@shared/infrastructure/openapi';

const document = generateOpenAPI(
  sharedModuleRegistry,
  // authRegistry,
  // inventoryRegistry,
);

writeFileSync('openapi.json', JSON.stringify(document, null, 2));
