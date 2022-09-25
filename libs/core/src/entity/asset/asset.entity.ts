import { Field, Float, ObjectType } from '@nestjs/graphql';
import { DeepPartial, SafeAny } from '@wellness/common';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { SedeSharedConnection } from '../../common/types/Sede.types';
import { WellnessEntity } from '../base/base.entity';
import { Sede } from '../sede/Sede.entity';
import { AssetBoot } from './relation-asset.entity';
/**
 * @description
 */

@Entity()
@ObjectType()
export class Asset extends WellnessEntity implements SedeSharedConnection {
  constructor(input: DeepPartial<Asset>) {
    super(input);
  }


  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field((type) => Float, { nullable: true })
  size: number;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Column('simple-json', { default: null })
  metadata: SafeAny;

  @Column({ nullable: true })
  bootId: number;

  @Field({ nullable: true })
  previewUrl: string;

  @ManyToOne((type) => AssetBoot, (boot) => boot.assets, { nullable: true })
  @Field((type) => AssetBoot, { nullable: true })
  boot: AssetBoot;
  // connection with sede
  @ManyToMany(() => Sede)
  @JoinTable()
  sedes: Sede[];
}
