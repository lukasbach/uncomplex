import { UncomplexEntityInterface } from './UncomplexEntityInterface';

export interface UncomplexEntityInterfaceWithState<O = any, S extends object = object> extends UncomplexEntityInterface<O, S> {
  state: object;
}