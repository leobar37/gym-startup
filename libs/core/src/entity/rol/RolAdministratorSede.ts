import { DeepPartial } from '@wellness/common';
import { Column, Entity } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';

@Entity()
export class RolAdministrarSede extends WellnessEntity {
  constructor(input: DeepPartial<RolAdministrarSede>) {
    super(input);
  }

  @Column('integer')
  sedeId: number;

  @Column('integer')
  administratorId: number;

  @Column('integer')
  rolId: number;
}
