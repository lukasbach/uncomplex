import {
  BigIntEntityInterface,
  DateEntityInterface,
  MapEntityInterface, SymbolEntityInterface,
  Uncomplex,
} from '../src';

const uncomplex = Uncomplex.new().withEntityInterfaces(
  BigIntEntityInterface, DateEntityInterface, MapEntityInterface, SymbolEntityInterface);

const map = new Map();
map.set('a', 'aa');
map.set('b', 42);

const sym1 = Symbol('a');
const sym2 = Symbol('b');

const example = { bigInt: BigInt(9999999999999), date: new Date(1800000000000), map, sym1, sym2, sym1alt: sym1 };
const asString = uncomplex.stringifyObject(example);

console.log(asString);
// {
//   "bigInt":{"n":"9999999999999","__uncomplexId":"BigInt"},
//   "date":{"iso":"2027-01-15T08:00:00.000Z","__uncomplexId":"Date"},
//   "map":{"entries":[["a","aa"],["b",42]],"__uncomplexId":"Map"},
//   "sym1":{"id":0,"key":"a","__uncomplexId":"Symbol"},
//   "sym2":{"id":1,"key":"b","__uncomplexId":"Symbol"},
//   "sym1alt":{"id":0,"key":"a","__uncomplexId":"Symbol"}
// }

const parsed = uncomplex.parseObject(asString);
console.log(parsed);
// { bigInt: 9999999999999n,
//   date: 2027-01-15T08:00:00.000Z,
//   map: Map { 'a' => 'aa', 'b' => 42 },
//   sym1: Symbol(a),
//   sym2: Symbol(b),
//   sym1alt: Symbol(a) }

console.log(parsed.sym1 === parsed.sym2, parsed.sym1 === parsed.sym1alt);
// false, true
