import { Column, Entity, ManyToOne } from 'typeorm';
import { WellnessEntity } from '../base/base.entity';
import { BusinessPlan } from './BusinessPlan.entity';

export enum GymPlanStateEnum {
  /**
   * The relationship is active
   * and the conditions for it to expire have not yet been
   * filled
   */
  ACTIVE,
  /**
   * The relationship is culminated
   * and there is no need to need check it
   */
  EXPIRED,
}

@Entity()
export class GymPlan extends WellnessEntity {
  @Column({
    type: 'enum',
    enum: GymPlanStateEnum,
    default: GymPlanStateEnum.ACTIVE,
  })
  status: GymPlanStateEnum;

  @Column('timestamp')
  endAt: Date;
  
  @Column()
  businessPlanId : number
  
  @ManyToOne(() => BusinessPlan , entity => entity.gymPlans)
  businessPlan : BusinessPlan
}
