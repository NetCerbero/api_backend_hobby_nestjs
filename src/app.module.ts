import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';

@Module({
  imports: [DatabaseModule, ConfigModule],
})
export class AppModule {
  static port: number | string;
  static allowedOrigins: string[];
  constructor(readonly _config: ConfigService) {
    AppModule.port = this._config.get(Configuration.PORT_SERVER);
    AppModule.allowedOrigins = [
      ...this._config.get(Configuration.LIST_CORS).split(','),
    ];
  }
}
