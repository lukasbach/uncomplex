import { UncomplexEntityInterface } from '../UncomplexEntityInterface';

export const MapEntityInterface: UncomplexEntityInterface<Map<any, any>, { entries: Array<[any, any]> }> = {
  entityId: 'Map',
  applicableClasses: [Map],
  simplifyObject: object => {
    const result = { entries: [] };
    for (const entry of object.entries()) {
      result.entries.push(entry);
    }
    return result;
  },
  parseObject: object => {
    const map = new Map();
    for (const [key, value] of object.entries) {
      map.set(key, value);
    }
    return map;
  },
};
