To check project consistency :

# 1. Vérifier qu'on est sur la bonne branche
git branch --show-current

# 2. Nettoyage complet
pnpm clean:hard

# 3. Réinstallation complète
pnpm install

# 4. Reset Nx
pnpm nx reset

# 5. Build complet de tous les projets
pnpm nx run-many -t build

# 6. Vérifier les projets affectés
pnpm nx affected -t build

# 7. Vérifier le graphe des dépendances Nx
pnpm nx graph --file=graph.html

# 8. Test du déploiement autonome
rm -rf /tmp/frontend-deploy

pnpm --filter=@game-platform/frontend deploy --prod /tmp/frontend-deploy

# 9. Vérifier que les workspaces ont été embarqués
ls /tmp/frontend-deploy/node_modules/@player
ls /tmp/frontend-deploy/node_modules/@shared

# 10. Vérifier que les dépendances runtime existent
ls /tmp/frontend-deploy/node_modules/@nestjs >/dev/null
ls /tmp/frontend-deploy/node_modules/winston >/dev/null
ls /tmp/frontend-deploy/node_modules/tslib >/dev/null

# 11. Build Docker sans cache
docker build \
  --no-cache \
  --secret id=github_token,env=GITHUB_TOKEN \
  -f apps/frontend/Dockerfile \
  -t game-platform-frontend .

# 12. Exécution Docker
docker run \
  --rm \
  --env-file .env \
  -p 3000:3000 \
  game-platform-frontend