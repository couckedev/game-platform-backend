export interface StartedPostgresContainer {
  connectionUrl: string;
  stop: () => Promise<unknown>;
}
