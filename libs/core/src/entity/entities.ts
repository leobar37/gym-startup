import { Activity } from './activity/activity.entity';
import { Administrator } from './administrator/administrator.entity';
import { Asistence } from './asistence/asistence.entity';
import { Asset } from './asset/asset.entity';
import { AssetBoot } from './asset/relation-asset.entity';
import { Client } from './client/client.entity';
import { Contract } from './contract/contract.entity';
import { ContractView } from './contract/Contract.view';
import { DetailFicha } from './ficha/Detail-ficha.entity';
import { Ficha } from './ficha/ficha.entity';
import { Plan } from './plan/plan.entity';
import { Suscription } from './suscription/suscription.entity';
import { User } from './user/user.entity';
// v2
import { AdministratorGym } from './administrator/administratorGym.entity';
import { BusinessPlan } from './business-plan/BusinessPlan.entity';
import { GymBusinessPlan } from './business-plan/GymPlan.entity';
import { Gym } from './gym/Gym.entity';
import { Rol } from './rol/Rol.entity';
import { RolAdministrarSede } from './rol/RolAdministratorSede';
import { Sede } from './sede/Sede.entity';

export const coreEntitiesMap = {
  Activity,
  Administrator,
  Asistence,
  Asset,
  AssetBoot,
  Client,
  Contract,
  DetailFicha,
  Ficha,
  Plan,
  Suscription,
  User,
  ContractView,
  Gym,
  Sede,
  BusinessPlan,
  GymBusinessPlan ,
  Rol,
  RolAdministrarSede,
  AdministratorGym
};
