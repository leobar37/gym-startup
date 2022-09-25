import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntitiesMap } from '../entity/entities';
import { isDev, SafeAny } from '@wellness/common';
import { DataSourceOptions } from 'typeorm';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const config = {
          url: configService.get('DB_URL') as string,
          type: 'postgres',
          entities: [...Object.values(coreEntitiesMap)],
          synchronize: isDev,
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          logging: true,
        } as DataSourceOptions;
        return config as SafeAny;
      },
      inject: [ConfigService],
    }),
  ],
})
export class ConnectionModule {}
