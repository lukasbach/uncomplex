import { expect } from "chai";
import { ClassOnlyNativesA, ComposedClassOnlyA } from './demoClasses';
import { Uncomplex } from '../src/Uncomplex';
import { ClassOnlyNativesAEntityInterface, ComposedClassOnlyAEntityInterface } from './demoEntityInterfaces';

describe('stringify', function() {
  it('class composed only of native elements', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(ClassOnlyNativesAEntityInterface);
    const instance = new ClassOnlyNativesA('test', 42, true);
    const asString = uncomplex.stringifyObject(instance);

    expect(asString).equal('{"aStr":"test","bStr":42,"cStr":true,"__uncomplexId":"ClassOnlyNativesA"}');
  });

  it('class composed of other complex objects', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(ClassOnlyNativesAEntityInterface, ComposedClassOnlyAEntityInterface);
    const instance = new ComposedClassOnlyA('test', 42, new ClassOnlyNativesA('test', 42, true));
    const asString = uncomplex.stringifyObject(instance);

    expect(asString).equal('{"aStr":"test","bStr":42,"cStr":{"aStr":"test","bStr":42,"cStr":true,"__uncomplexId":"ClassOnlyNativesA"},"__uncomplexId":"ComposedClassOnlyA"}');
  });
});
