import { Column, DeepPartial, Entity, ManyToOne } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { Gym } from '../gym/Gym.entity';
@Entity()
export class Rol extends WellnessEntity {
  constructor(input: DeepPartial<Rol>) {
    super(input);
  }
  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('simple-array')
  permissions: string[];

  // relationship with gym, the roles avalaible within the gym

  @Column()
  gymId: number;

  @ManyToOne(() => Gym, (entity) => entity.roles)
  gym: Promise<Gym>;
}
