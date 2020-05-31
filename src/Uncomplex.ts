import { UncomplexEntityInterface } from './UncomplexEntityInterface';
import { UncomplexEntityInterfaceWithState } from './UncomplexEntityInterfaceWithState';

export class Uncomplex {
  private entityInterfaces: UncomplexEntityInterfaceWithState[];

  constructor() {
    this.entityInterfaces = [];
  }

  public static new() {
    return new Uncomplex();
  }
  
  public registerEntityInterfaces(...entityInterfaces: UncomplexEntityInterface[]) {
    this.entityInterfaces.push(...entityInterfaces.map(e => ({ ...e, state: {} })));
  }

  public withEntityInterfaces(...entityInterfaces: UncomplexEntityInterface[]) {
    this.registerEntityInterfaces(...entityInterfaces);
    return this;
  }

  public stringifyObject(object: object) {
    this.resetEntityInterfaceStates();
    return JSON.stringify(this.recursiveStringifyCall(object));
  }

  public parseObject(string: string) {
    this.resetEntityInterfaceStates();
    let object = JSON.parse(string);
    object = this.recursiveParseCall(object);
    return object;
  }

  private resetEntityInterfaceStates() {
    for (const entityInterface of this.entityInterfaces) {
      entityInterface.state = {};
    }
  }

  private recursiveParseCall(ref: any, key?: string | number) {
    switch (typeof ref) {
      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
        return ref;
      case 'symbol':
      case 'bigint':
      case 'function':
      case 'object':
        if (!ref) {
          return null;
        } else if (Array.isArray(ref)) {
          return ref.map((element, i) => this.recursiveParseCall(element, i));
        } else if (ref.__uncomplexId) {
          const entityInterface = this.findEntityInterfaceForId(ref.__uncomplexId);

          if (entityInterface) {
            for (const key of Object.keys(ref)) {
              ref[key] = this.recursiveParseCall(ref[key], key);
            }
            return entityInterface.parseObject(ref, key, entityInterface.state);
          } else {
            throw Error(`Uncomplex is missing an entity interface "${ref.__uncomplexId}" for parsing.`);
          }
        } else {
          for (const key of Object.keys(ref)) {
            ref[key] = this.recursiveParseCall(ref[key], key);
          }
          return ref;
        }
    }
  }

  private recursiveStringifyCall(ref: any, key?: string | number) {
    switch (typeof ref) {
      case 'undefined':
        return null;
      case 'boolean':
      case 'number':
      case 'string':
        return ref;
      case 'bigint':
      case 'symbol':
      case 'function':
      case 'object':
        if (!ref) {
          return null;
        } else if (Array.isArray(ref)) {
          return ref.map((element, i) => this.recursiveStringifyCall(element, i));
        } else {
          const entityInterface = this.findEntityInterfaceForComplexObject(ref);

          if (entityInterface) {
            const simplified: any = entityInterface.simplifyObject(ref, key, entityInterface.state);
            for (const key of Object.keys(simplified)) {
              simplified[key] = this.recursiveStringifyCall(simplified[key], key);
            }
            simplified.__uncomplexId = entityInterface.entityId;
            return simplified;
          } else {
            const result = {};
            for (const key of Object.keys(ref)) {
              result[key] = this.recursiveStringifyCall(ref[key], key);
            }
            return result;
          }
        }
    }
  }

  private findEntityInterfaceForId(id: string) {
    return this.entityInterfaces.find(i => i.entityId === id);
  }

  private findEntityInterfaceForComplexObject(object: any) {
    return this.entityInterfaces.find(i => i
      .applicableClasses?.find(applicableClass => object instanceof applicableClass) || i.isApplicable?.(object));
  }
}