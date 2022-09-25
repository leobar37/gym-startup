import { Field, ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '@wellness/common';
import { Column, Entity, JoinTable, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { SedeSharedConnection } from '../../common/types';
import { WellnessEntity } from '../base/base.entity';
import { Detail } from '../detail-plan';
import { Sede } from '../sede/Sede.entity';
import { Suscription } from '../suscription/suscription.entity';

/**
 * @description
 */
@Entity()
@ObjectType()
export class Plan extends WellnessEntity implements SedeSharedConnection {
  constructor(input: DeepPartial<Plan>) {
    super(input);
  }

  @Column(() => Detail)
  @Field((type) => Detail)
  detail: Detail;

  @Column('boolean')
  @Field((type) => Boolean)
  visible: boolean;

  // subscription
  @OneToOne((type) => Suscription, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Suscription)
  @JoinColumn()
  suscription: Promise<Suscription>;

  @ManyToMany(() => Sede)
  @JoinTable()
  sedes: Sede[];
}
