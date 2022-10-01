import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { SafeAny } from '@wellness/common';
import {
  EventBusModule,
  LoggerWellnessModule,
  ConnectionModule
} from '@wellness/core';
import { resolve } from 'path';
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
    ConnectionModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
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
