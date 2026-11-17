CREATE TABLE "player"."players" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nickname" text NOT NULL,
	"externalAccountId" text NOT NULL,
	CONSTRAINT "players_nickname_unique" UNIQUE("nickname")
);
