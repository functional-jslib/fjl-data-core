import Just, {isJust} from './Just';
import Nothing, {isNothing} from './Nothing';
import {isset, curry, id} from 'fjl';

export {Just, isJust, isNothing, Nothing};

export const
    /**
     * @param replacement {*}
     * @param fn {Function} - Some operation.
     * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non
     */
    maybe = curry((replacement, fn, maybeInst) => {
        const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : Nothing.of();
        return isNothing(subject) ? replacement : subject.map(fn).join();
    }),

    isMaybe = x => isNothing(x) || isJust(x);

function Maybe (x) {
    return isset(x) ? Just.of(x) : Nothing.of();
}

Maybe.of = x => Maybe(x);

export default Maybe;
