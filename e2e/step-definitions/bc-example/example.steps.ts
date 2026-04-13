import { Given, When, Then } from '@cucumber/cucumber';
import type { GamePlatformWorld } from '../../support/world';

Given<GamePlatformWorld>('que le système est initialisé', async function () {
  // TODO: initialiser le contexte du scénario
});

When<GamePlatformWorld>("j'effectue une action d'exemple", async function () {
  // TODO: exécuter la commande métier
});

Then<GamePlatformWorld>('le résultat est un succès', async function () {
  // TODO: vérifier le résultat attendu
});
