CREATE TABLE "reserved_nicknames" (
	"nickname" text NOT NULL,
	CONSTRAINT "unique_nickname" UNIQUE("nickname")
);
