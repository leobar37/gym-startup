import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { isDev, SafeAny } from '@wellness/common';
import {
  coreEntitiesMap,
  EventBusModule,
  LoggerWellnessModule
} from '@wellness/core';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { RequestContextService } from './common/context';
import { AsistenceModule } from './modules/asistence';
import { AssetsModule } from './modules/assets';
import { FichaModule } from './modules/ficha';
import { PingModule } from './modules/ping';
import { ReportsModule } from './modules/reports';
import { SuscriptionModule } from './modules/suscriptions';
import { UserModule } from './modules/users';
const BUSINESS_MODULES = [
  PingModule,
  UserModule,
  AsistenceModule,
  SuscriptionModule,
  AssetsModule,
  FichaModule,
  AuthModule,
  ReportsModule,
];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      debug: true,
      driver: ApolloDriver,
      autoSchemaFile: resolve('./', 'schema.gql'),
      context: ({ req }) => ({ req }),
    } as SafeAny),
    EventBusModule,
    LoggerWellnessModule,
    ...BUSINESS_MODULES,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
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
          logging : true
        } as DataSourceOptions;
        console.log(config);
        return config as SafeAny;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [RequestContextService],
  exports: [],
})
export class AppModule {
  public static injector: ModuleRef;
  constructor(private moduleRef: ModuleRef) {
    AppModule.injector = moduleRef;
  }
}
