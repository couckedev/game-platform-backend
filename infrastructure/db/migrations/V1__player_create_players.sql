CREATE TABLE players (
    id          TEXT        NOT NULL,
    external_account_id TEXT NOT NULL,
    nickname    TEXT        NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL,

    CONSTRAINT players_pkey PRIMARY KEY (id),
    CONSTRAINT players_external_account_id_key UNIQUE (external_account_id),
    CONSTRAINT players_nickname_key UNIQUE (nickname)
);
