import { ResolveField, Resolver } from '@nestjs/graphql';
import { Ficha } from '@wellness/core';

@Resolver((of) => Ficha)
export class FichaEntityResolver {}
