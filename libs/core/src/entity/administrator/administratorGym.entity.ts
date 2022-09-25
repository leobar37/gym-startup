import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { DeepPartial } from '@wellness/common';
import { Administrator } from '../administrator/administrator.entity';
import { Gym } from '../gym/Gym.entity';

@Entity()
export class AdministratorGym extends WellnessEntity {
  constructor(input: DeepPartial<AdministratorGym>) {
    super(input);
  }

  // relationship with administrator
  administratorId: number;

  @ManyToOne(() => Administrator, (entity) => entity.administratorGym)
  administrator: Administrator;

  gymId: number;

  @ManyToOne(() => Gym)
  gym: Gym;

  @Column('bool')
  isOwner: boolean;
}
