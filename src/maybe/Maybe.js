import Just, {isJust, just} from './Just';
import Nothing, {isNothing, nothing} from './Nothing';
import {isset, curry, id} from 'fjl';
import {getMonadUnWrapper} from '../monad/Monad';

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

    unWrapJust = getMonadUnWrapper(Just),

    unWrapMaybe = x => isNothing(x) ? nothing() : unWrapJust(x),

    maybeEqual = curry((a, b) => unWrapMaybe(a) === unWrapMaybe(b)),

    isMaybe = x => isNothing(x) || isJust(x),

    toMaybe = x => isset(x) ? just(x) : nothing()

;
