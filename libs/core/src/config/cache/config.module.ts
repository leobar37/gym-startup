import { Module, CacheModule, DynamicModule } from '@nestjs/common';

@Module({})
export class CacheConfigModule {
  static register(): DynamicModule {
    const module = CacheModule.register({
      isGlobal: true,
    });

    return {
      module: CacheConfigModule,
      controllers: module.controllers,
      exports: module.exports,
      global: true,
      imports: module.imports,
      providers: module.providers,
    };
  }
}
