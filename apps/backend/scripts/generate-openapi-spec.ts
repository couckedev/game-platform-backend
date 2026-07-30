import { writeFileSync } from 'node:fs';
import { playerModuleRegistry } from '@player/infrastructure/openapi';
import {
  generateOpenAPI,
  sharedModuleRegistry,
} from '@shared/infrastructure/openapi';

const document = generateOpenAPI(
  sharedModuleRegistry,
  playerModuleRegistry,
  // authRegistry,
  // inventoryRegistry,
);

writeFileSync('openapi.json', JSON.stringify(document, null, 2));
