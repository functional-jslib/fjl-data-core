import Just, {isJust} from './Just';
import Nothing, {isNothing} from './Nothing';
import {isset, curry, id} from 'fjl';

export * from './Just';
export * from './Nothing';

export const

    /**
     * @param replacement {*}
     * @param fn {Function} - Some operation.
     * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non
     */
    maybe = curry((replacement, fn, maybeInst) => {
        const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : Nothing();
        return isNothing(subject) ? replacement : subject.flatMap(fn).valueOf();
    }),

    isMaybe = x => isNothing(x) || isJust(x);

function Maybe (x) {
    return isset(x) ? new Just(x) : new Nothing();
}

// Statics
Maybe.Nothing = Nothing;
Maybe.Just = Just;
Maybe.of = x => Maybe(x);

Object.freeze(Maybe);

export default Maybe;
