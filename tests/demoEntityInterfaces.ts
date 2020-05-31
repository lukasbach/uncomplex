import { UncomplexEntityInterface } from '../src/UncomplexEntityInterface';
import {
  ClassOnlyNativesA,
  ClassOnlyNativesB,
  ComposedClassAAndB,
  ComposedClassOnlyA,
  ComposedClassOnlyB,
} from './demoClasses';

export const ClassOnlyNativesAEntityInterface: UncomplexEntityInterface<ClassOnlyNativesA, any> = {
  entityId: 'ClassOnlyNativesA',
  applicableClasses: [ClassOnlyNativesA],
  simplifyObject: object => ({ aStr: object.a, bStr: object.b, cStr: object.c }),
  parseObject: object => new ClassOnlyNativesA(object.aStr, object.bStr, object.cStr)
};

export const ClassOnlyNativesBEntityInterface: UncomplexEntityInterface<ClassOnlyNativesB, any> = {
  entityId: 'ClassOnlyNativesB',
  applicableClasses: [ClassOnlyNativesB],
  simplifyObject: object => ({ aStr: object.a, bStr: object.b, cStr: object.c }),
  parseObject: object => new ClassOnlyNativesB(object.aStr, object.bStr, object.cStr)
};

export const ComposedClassOnlyAEntityInterface: UncomplexEntityInterface<ComposedClassOnlyA, any> = {
  entityId: 'ComposedClassOnlyA',
  applicableClasses: [ComposedClassOnlyA],
  simplifyObject: object => ({ aStr: object.a, bStr: object.b, cStr: object.c }),
  parseObject: object => new ComposedClassOnlyA(object.aStr, object.bStr, object.cStr)
};

export const ComposedClassOnlyBEntityInterface: UncomplexEntityInterface<ComposedClassOnlyB, any> = {
  entityId: 'ComposedClassOnlyB',
  applicableClasses: [ComposedClassOnlyB],
  simplifyObject: object => ({ aStr: object.a, bStr: object.b, cStr: object.c }),
  parseObject: object => new ComposedClassOnlyB(object.aStr, object.bStr, object.cStr)
};

export const ComposedClassAAndBEntityInterface: UncomplexEntityInterface<ComposedClassAAndB, any> = {
  entityId: 'ComposedClassAAndB',
  applicableClasses: [ComposedClassAAndB],
  simplifyObject: object => ({ aStr: object.a, bStr: object.b, cStr: object.c }),
  parseObject: object => new ComposedClassAAndB(object.aStr, object.bStr, object.cStr)
};
