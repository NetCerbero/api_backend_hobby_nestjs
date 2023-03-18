import { DataSource, DataSourceOptions } from 'typeorm';
const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'tienda',
  entities: ['src/*/*/*/*/*.entity{.ts,.js}'], //[__dirname + '\\entities\\**\\*{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'], //[__dirname + '\\migrations\\**\\*{.ts,.js}'],
  //cli: { migrationsDir: 'src/database/migrations' },
  synchronize: false,
};

export const dataSource = new DataSource(config);
