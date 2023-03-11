import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';
    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../../.env';
      const existPath = fs.existsSync(envFilePath);
      if (!existPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        DB_NAME: process.env.DB_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        PORT_SERVER: process.env.PORT_SERVER,
        LIST_CORS: process.env.LIST_CORS,
        EXPIRESIN: process.env.EXPIRESIN,
        MAX_ACTIVE_SESSIONS: process.env.MAX_ACTIVE_SESSIONS,
        JWT_SECRET: process.env.JWT_SECRET,
        REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
        INIT_USER: process.env.INIT_USER,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
