import { expect } from "chai";
import { ClassOnlyNativesA, ComposedClassOnlyA } from './demoClasses';
import { Uncomplex } from '../src/Uncomplex';
import { ClassOnlyNativesAEntityInterface, ComposedClassOnlyAEntityInterface } from './demoEntityInterfaces';

describe('parse', function() {
  it('class composed only of native elements', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(ClassOnlyNativesAEntityInterface);
    const refInstance = new ClassOnlyNativesA('test', 42, true);
    const parsed: ClassOnlyNativesA = uncomplex.parseObject(JSON.stringify({
      __uncomplexId: 'ClassOnlyNativesA', aStr: 'test', bStr: 42, cStr: true
    }));

    expect(parsed instanceof ClassOnlyNativesA).to.be.true;
    expect(parsed.toString()).deep.equal(refInstance.toString());
  });

  it('class composed of other complex objects', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(ClassOnlyNativesAEntityInterface, ComposedClassOnlyAEntityInterface);
    const refInstance = new ComposedClassOnlyA('test', 42, new ClassOnlyNativesA('test', 42, true));
    const parsed: ComposedClassOnlyA = uncomplex.parseObject(JSON.stringify({
      __uncomplexId: 'ComposedClassOnlyA',
      aStr: 'test', bStr: 42, cStr: { __uncomplexId: 'ClassOnlyNativesA', aStr: 'test', bStr: 42, cStr: true }
    }));

    expect(parsed instanceof ComposedClassOnlyA).to.be.true;
    expect(parsed.c instanceof ClassOnlyNativesA).to.be.true;
    expect(parsed.toString()).deep.equal(refInstance.toString());
  });
});
