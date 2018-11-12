import Just, {isJust, just} from './Just';
import Nothing, {isNothing, nothing} from './Nothing';
import {isset, curry, id} from 'fjl';

export {Just, isJust, isNothing, Nothing, just, nothing};

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

    isMaybe = x => isNothing(x) || isJust(x),

    toMaybe = x => isset(x) ? just(x) : nothing()

;
