CREATE TABLE players (
  id         TEXT PRIMARY KEY,
  nickname   TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL
);