import { Temporal } from "@js-temporal/polyfill";

Object.assign(globalThis, { Temporal });

// Point d'entrée pour le démarrage de l'application en mode test.
// Configurer ici les adapters in-memory, les repositories de test, etc.

export async function setupApp(): Promise<void> {
  // ex: initialiser les repositories in-memory
  // ex: configurer le container d'injection de dépendances
}

export async function teardownApp(): Promise<void> {
  // ex: libérer les ressources
}
