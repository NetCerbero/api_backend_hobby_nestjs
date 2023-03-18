import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'tls';
import { Configuration } from '../config/config.keys';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'mysql',
        host: config.get(Configuration.DB_HOST),
        port: parseInt(config.get(Configuration.DB_PORT)),
        database: config.get(Configuration.DB_NAME),
        username: config.get(Configuration.DB_USER),
        password: config.get(Configuration.DB_PASSWORD),
        entities: [__dirname + '/../*/*/*/*/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
