// asset or assetBoot
import { AssetBoot, Asset } from '@wellness/core';
import { createUnionType } from '@nestjs/graphql';

export const ResourceUnion = createUnionType({
  name: 'ResourceUnion',
  types: () => [AssetBoot, Asset],
  resolveType(value) {
    if ('assets' in value) {
      return AssetBoot;
    }
    if ('bootId' in value) {
      return Asset;
    }

    return null;
  },
});

export type ResourceUnionType = typeof ResourceUnion;
