import { Sede } from '../../entity/sede/Sede.entity';
/**
 * Represent a shareable entity, like a plan or a client
 */
export interface SedeSharedConnection {
  sedes: Sede[];
}
/**
 * Represent a simple entity that belongs to a sede (not shareable)
 */
export interface SedeSimpleConnection {
  sedeId: number;
}
