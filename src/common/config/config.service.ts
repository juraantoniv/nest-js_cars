import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class CustomConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configs: ConfigType<typeof configuration>,
  ) {}

  get app_port(): string {
    return this.configs.app_port;
  }

  get app_host(): string {
    return this.configs.app_host;
  }

  get db_host(): string {
    return this.configs.db_host;
  }

  get db_port(): number {
    return this.configs.db_port;
  }

  get db_username(): string {
    return this.configs.db_username;
  }

  get db_password(): string {
    return this.configs.db_password;
  }

  get db_database(): string {
    return this.configs.db_database;
  }
  get email_service_service(): string {
    return this.configs.email_service_service;
  }
  get email_service_user(): string {
    return this.configs.email_service_user;
  }
  get email_service_pass(): string {
    return this.configs.email_service_pass;
  }
  get email_service_defaults(): string {
    return this.configs.email_service_defaults;
  }
  get email_service_path(): string {
    return this.configs.email_service_path;
  }
}
