CREATE TABLE "players" (
	"player_id" text NOT NULL,
	"external_account_id" text NOT NULL,
	"nickname" text NOT NULL,
	CONSTRAINT "pk_players" PRIMARY KEY("player_id","external_account_id"),
	CONSTRAINT "unique_player_id" UNIQUE("player_id"),
	CONSTRAINT "unique_external_account_id" UNIQUE("external_account_id")
);
