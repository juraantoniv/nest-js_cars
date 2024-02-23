import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'allConfigs';

export default registerAs(token, () => ({
  app_port: configService.get<string>('APP_PORT'),
  app_host: configService.get<string>('APP_HOST'),

  db_host: configService.get<string>('POSTGRES_HOST'),
  db_port: configService.get<number>('POSTGRES_PORT'),
  db_username: configService.get<string>('POSTGRES_USERNAME'),
  db_password: configService.get<string>('POSTGRES_PASSWORD'),
  db_database: configService.get<string>('POSTGRES_DB'),

  email_service_service: configService.get<string>('EMAIL_SERVICE_SERVICE'),
  email_service_user: configService.get<string>('EMAIL_SERVICE_USER'),
  email_service_pass: configService.get<string>('EMAIL_SERVICE_PASS'),
  email_service_defaults: configService.get<string>('EMAIL_SERVICE_DEFAULTS'),
  email_service_path: configService.get<string>(
    'src/common/email-templates/views',
  ),
}));
