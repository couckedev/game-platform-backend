.PHONY: db-create db-start db-stop db-destroy keycloak-up keycloak-down up down logs

db-create:
	docker compose up database -d

db-start:
	docker compose start database

db-stop:
	docker compose stop database

db-destroy:
	docker compose down database -v

keycloak-up:
	docker compose up keycloak -d
	docker compose up keycloak-config

keycloak-down:
	docker compose stop keycloak

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f
