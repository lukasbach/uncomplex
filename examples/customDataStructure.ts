import { Uncomplex, UncomplexEntityInterface } from '../src';

class Example {
  public param: string;
  constructor(param: string) {
    this.param = param;
  }
}

export const ExampleEntityInterface: UncomplexEntityInterface<Example, { p: string }> = {
  entityId: 'Example',
  applicableClasses: [Example],
  simplifyObject: object => ({ p: object.param }),
  parseObject: object => new Example(object.p)
};

const uncomplex = Uncomplex.new().withEntityInterfaces(ExampleEntityInterface);
const example = { ex: new Example('test') };
const asString = uncomplex.stringifyObject(example);

console.log(asString);
// {"ex":{"p":"test","__uncomplexId":"Example"}}

const parsed = uncomplex.parseObject(asString);
console.log(parsed.ex instanceof Example, parsed.ex.param);
// true 'test'
