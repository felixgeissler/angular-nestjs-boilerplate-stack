import { TypeOrmModuleOptions } from '@nestjs/typeorm';


class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing environment variable ${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    
    return {
      type: 'postgres',

      host: 'postgres',
      port: 5432,
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE_NAME'),

      entities: ['dist/**/*.entity.js'],

      migrationsTableName: 'migration',

      migrations: ['dist/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: false,
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE_NAME'
  ]);

export { configService };