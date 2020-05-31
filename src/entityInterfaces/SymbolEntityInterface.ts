import { UncomplexEntityInterface } from '../UncomplexEntityInterface';

export const SymbolEntityInterface: UncomplexEntityInterface<symbol, { id: number, key: string }, { symbols: symbol[] }> = {
  entityId: 'Symbol',
  isApplicable: o => typeof o === 'symbol',
  simplifyObject: (object, _, state) => {
    if (!state.symbols) {
      state.symbols = [];
    }

    const existingSymbolIndex = state.symbols.findIndex(s => s === object);
    const key = object.toString().substring(7).slice(0, -1);

    if (existingSymbolIndex > 0) {
      return { id: existingSymbolIndex, key };
    } else {
      state.symbols.push(object);
      return { id: state.symbols.length - 1, key }
    }

  },
  parseObject: (object, _, state) => {
    if (!state.symbols) {
      state.symbols = [];
    }

    if (state.symbols[object.id] === undefined) {
      state.symbols[object.id] = Symbol(object.key);
    }

    return state.symbols[object.id];
  },
};
