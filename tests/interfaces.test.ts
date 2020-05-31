import { expect } from "chai";
import { Uncomplex } from '../src/Uncomplex';
import { SymbolEntityInterface } from '../src/entityInterfaces/SymbolEntityInterface';
import { DateEntityInterface } from '../src/entityInterfaces/DateEntityInterface';
import { BigIntEntityInterface } from '../src/entityInterfaces/BigIntEntityInterface';
import { MapEntityInterface } from '../src/entityInterfaces/MapEntityInterface';
import { ClassOnlyNativesAEntityInterface } from './demoEntityInterfaces';
import { ClassOnlyNativesA } from './demoClasses';

describe('predefined entity interfaces', function() {
  it('SymbolEntityInterface', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(SymbolEntityInterface);
    const [sym1, sym2] = [Symbol('a'), Symbol('b')];
    const instance = { a: sym1, b: sym2, c: sym2 };
    const asString = uncomplex.stringifyObject(instance);

    expect(asString).to.equal('{"a":{"id":0,"key":"a","__uncomplexId":"Symbol"},' +
      '"b":{"id":1,"key":"b","__uncomplexId":"Symbol"},' +
      '"c":{"id":1,"key":"b","__uncomplexId":"Symbol"}}');

    const parsed = uncomplex.parseObject(asString);

    expect(typeof parsed.a).to.equal('symbol');
    expect(typeof parsed.b).to.equal('symbol');
    expect(typeof parsed.c).to.equal('symbol');

    expect(parsed.a).not.to.equal(parsed.b);
    expect(parsed.a).not.to.equal(parsed.c);
    expect(parsed.b).to.equal(parsed.c);
  });

  it('DateEntityInterface', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(DateEntityInterface);
    const date = new Date(1800000000000);
    const instance = { date };
    const asString = uncomplex.stringifyObject(instance);

    expect(asString).to.equal('{"date":{"iso":"2027-01-15T08:00:00.000Z","__uncomplexId":"Date"}}');

    const parsed = uncomplex.parseObject(asString);

    expect(parsed.date instanceof Date).to.be.true;

    expect(parsed.date.toISOString()).to.equal(date.toISOString());
  });

  it('BigIntEntityInterface', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(BigIntEntityInterface);
    const number = BigInt(9007199254740991);
    const instance = { number };
    const asString = uncomplex.stringifyObject(instance);

    expect(asString).to.equal('{"number":{"n":"9007199254740991","__uncomplexId":"BigInt"}}');

    const parsed = uncomplex.parseObject(asString);

    expect(typeof parsed.number).to.equal('bigint');
    expect(parsed.number).to.equal(number);
    expect(parsed.number.toString()).to.equal(number.toString());
  });

  it('MapEntityInterface', function() {
    const uncomplex = Uncomplex.new().withEntityInterfaces(MapEntityInterface, ClassOnlyNativesAEntityInterface);
    const map = new Map();
    map.set('a', 'aa');
    map.set('b', new ClassOnlyNativesA('a', 42, true));
    const instance = { map };
    const asString = uncomplex.stringifyObject(instance);

    expect(asString).to.equal('{"map":{"entries":[["a","aa"],' +
      '["b",{"aStr":"a","bStr":42,"cStr":true,"__uncomplexId":"ClassOnlyNativesA"}]],"__uncomplexId":"Map"}}');

    const parsed = uncomplex.parseObject(asString);

    expect(parsed.map instanceof Map).to.be.true;
    expect(parsed.map.get('a')).to.equal('aa');
    expect(parsed.map.get('b') instanceof ClassOnlyNativesA).to.be.true;
    expect(parsed.map.get('b').b).to.equal(42);
    expect(parsed.map.size).to.equal(2);
  });
});
