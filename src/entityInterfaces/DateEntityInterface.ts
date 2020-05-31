import { UncomplexEntityInterface } from '../UncomplexEntityInterface';

export const DateEntityInterface: UncomplexEntityInterface<Date, { iso: string }> = {
  entityId: 'Date',
  applicableClasses: [Date],
  simplifyObject: object => ({ iso: object.toISOString() }),
  parseObject: object => new Date(object.iso),
};
