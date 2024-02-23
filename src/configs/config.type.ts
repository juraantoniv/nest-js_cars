export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  email: EmailConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type EmailConfig = {
  service: string;
  user: string;
  pass: string;
  defaults: string;
  path: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};
