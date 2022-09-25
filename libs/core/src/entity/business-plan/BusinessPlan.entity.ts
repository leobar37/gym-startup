import { DeepPartial, SafeAny } from '@wellness/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { GymPlan } from './GymPlan.entity';

@Entity()
export class BusinessPlan extends WellnessEntity {
  constructor(input: DeepPartial<BusinessPlan>) {
    super(input);
  }

  @Column('real', { nullable: true })
  priceMonth: number;

  @Column('real', { nullable: true })
  priceYear: number;

  @Column('real')
  visible: boolean;

  @Column('integer')
  // duration in days
  duration: number;

  @Column('simple-json', { default: '{}' })
  // TODO: this not should be any
  descripion: SafeAny;

  @Column('jsonb', { default: '{}' })
  config: SafeAny;

  // relation with plan

  @OneToMany(() => GymPlan , entity => entity.businessPlan)
  gymPlans : Promise<GymPlan[]>
}
