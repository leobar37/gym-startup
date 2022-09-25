import { ObjectType, registerEnumType, Field } from '@nestjs/graphql';
import { DeepPartial, Role } from '@wellness/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { AdministratorGym } from './administratorGym.entity';
/**
 * @description
 */

registerEnumType(Role, {
  name: 'Role',
  description: 'Describe the role of a administrator',
});
@Entity()
@ObjectType()
export class Administrator extends WellnessEntity {
  constructor(input: DeepPartial<Administrator>) {
    super(input);
  }

  @Column({ nullable: true })
  @Field((type) => String)
  name: string;

  @Column({ nullable: true })
  @Field((type) => String)
  dni: string;

  @Column({ nullable: true })
  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  password: string;

  @Column({ type: 'varchar' })
  @Field((type) => Role)
  rol: Role;

  // relationship with gym

  @OneToMany(() => AdministratorGym, (entity) => entity.administrator)
  administratorGym: Promise<AdministratorGym[]>;
}
