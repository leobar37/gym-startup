import { WellnessEntity } from '../base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { DeepPartial } from '@wellness/common';
import { Sede } from '../sede/Sede.entity';
import { Rol } from '../rol/Rol.entity';
import { AdministratorGym } from '../administrator/administratorGym.entity';
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
}
