import { DeepPartial } from '@wellness/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { AdministratorGym } from '../administrator/administratorGym.entity';
import { WellnessEntity } from '../base/base.entity';
import { GymBusinessPlan } from '../business-plan/GymPlan.entity';
import { Rol } from '../rol/Rol.entity';
import { Sede } from '../sede/Sede.entity';
@Entity()
export class Gym extends WellnessEntity {
  constructor(input: DeepPartial<Gym>) {
    super(input);
  }

  @Column('varchar')
  name: string;

  // relationship with sede

  @OneToMany(() => Sede, (entity) => entity.gym)
  sedes: Promise<Sede[]>;

  // relationshipt with rol

  @OneToMany(() => Rol, (entity) => entity.gym)
  roles: Promise<Rol[]>;

  // relationship with administrator

  @OneToMany(() => AdministratorGym, (entity) => entity.gym)
  administratorGym: Promise<AdministratorGym[]>;

  // relationship with business plan

  @OneToMany(() => GymBusinessPlan , (entity) =>  entity.gym)
  gymBusinessPlan : Promise<GymBusinessPlan[]>
}
