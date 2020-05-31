import { expect } from "chai";
import { ClassOnlyNativesA, ComposedClassOnlyA } from './demoClasses';
import { Uncomplex } from '../src/Uncomplex';
import { ClassOnlyNativesAEntityInterface, ComposedClassOnlyAEntityInterface } from './demoEntityInterfaces';

describe('stringify and parse', function() {
  it('class composed only of native elements', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(ClassOnlyNativesAEntityInterface);
    const instance = new ClassOnlyNativesA('test', 42, true);
    const reconstructed = uncomplex.parseObject(uncomplex.stringifyObject(instance))

    expect(reconstructed instanceof ClassOnlyNativesA).to.be.true;
    expect(reconstructed.toString()).deep.equal(instance.toString());
  });

  it('class composed of other complex objects', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(ClassOnlyNativesAEntityInterface, ComposedClassOnlyAEntityInterface);
    const instance = new ComposedClassOnlyA('test', 42, new ClassOnlyNativesA('test', 42, true));
    const reconstructed = uncomplex.parseObject(uncomplex.stringifyObject(instance))

    expect(reconstructed instanceof ComposedClassOnlyA).to.be.true;
    expect(reconstructed.c instanceof ClassOnlyNativesA).to.be.true;
    expect(reconstructed.toString()).deep.equal(instance.toString());
  });
});
