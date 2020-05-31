import { UncomplexEntityInterface } from '../UncomplexEntityInterface';

export const BigIntEntityInterface: UncomplexEntityInterface<bigint, { n: string }> = {
  entityId: 'BigInt',
  isApplicable: o => typeof o === 'bigint',
  simplifyObject: object => ({ n: object.toString() }),
  parseObject: object => BigInt(object.n),
};
