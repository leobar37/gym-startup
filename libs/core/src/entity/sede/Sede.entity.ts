import { DeepPartial } from '@wellness/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { Gym } from '../gym/Gym.entity';
@Entity()
export class Sede extends WellnessEntity {
  constructor(input: DeepPartial<Sede>) {
    super(input);
  }
  @Column('varchar')
  name: string;

  // relation with gym
  @Column()
  gymId: number;
  @ManyToOne(() => Gym, (entity) => entity.sedes)
  gym: Promise<Gym>;
}
