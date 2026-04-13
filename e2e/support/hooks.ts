import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';

BeforeAll(async () => {
  // Setup global avant tous les scénarios (ex: démarrage de la base de données)
});

AfterAll(async () => {
  // Teardown global après tous les scénarios
});

Before(async () => {
  // Setup avant chaque scénario (ex: réinitialisation de l'état)
});

After(async () => {
  // Teardown après chaque scénario
});
