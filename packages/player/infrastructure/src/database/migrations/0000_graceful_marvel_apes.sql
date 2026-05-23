CREATE TABLE "players" (
	"id" text NOT NULL,
	"nickname" text NOT NULL,
	"external_account_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"is_online" boolean DEFAULT false NOT NULL,
	CONSTRAINT "players_table_pkey" PRIMARY KEY("id"),
	CONSTRAINT "unique_nickname" UNIQUE("nickname"),
	CONSTRAINT "unique_external_account_id" UNIQUE("external_account_id"));