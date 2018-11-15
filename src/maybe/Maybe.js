import Just, {isJust, just} from './Just';
import Nothing, {isNothing, nothing} from './Nothing';
import {isset, curry, id, trampoline} from 'fjl';
import {getMonadUnWrapper} from '../monad/Monad';

export {Just, isJust, isNothing, Nothing, just, nothing};

const
    /**
     * @private
     */
    [justUnWrapper, justUnWrapperTailCallName] = getMonadUnWrapper(Just)
;

export const
    /**
     * The maybe function takes a `replacement` value, a function (unary operation), and a Maybe value. If the Maybe value is `Nothing`, the function returns the `replacement` value. Otherwise, it applies the function to the value contained  by the `Just` and returns the result.
     * @param replacement {any}
     * @param fn {Function} - Unary operation.
     * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non-maybe value.
     * @returns {any}
     */
    maybe = curry((replacement, fn, maybeInst) => {
        const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : Nothing.of();
        return isNothing(subject) ? replacement : subject.map(fn).join();
    }),

    /**
     * Unwraps just (recursively).
     * @function module:monad.unWrapJust
     * @param x {any} - Expected `Just`.
     * @returns {any}
     */
    unWrapJust = trampoline(justUnWrapper, justUnWrapperTailCallName),

    /**
     * Unwraps maybe (recursively).
     * @function module:monad.unWrapMaybe
     * @param x {any} - Expected `Maybe`.
     * @returns {any}
     */
    unWrapMaybe = x => isNothing(x) ? nothing() : unWrapJust(x),

    /**
     * Equality operator for maybes.
     * @function module:monad.maybeEqual
     * @param a {any} - Maybe 1.
     * @param b {any} - Maybe 2.
     * @returns {boolean}
     */
    maybeEqual = curry((a, b) => unWrapMaybe(a) === unWrapMaybe(b)),

    /**
     * Checks for maybe.
     * @function module:monad.isMaybe
     * @param x {any}.
     * @returns {boolean}
     */
    isMaybe = x => isNothing(x) || isJust(x),

    /**
     * Creates maybe from value.
     * @function module:monad.toMaybe
     * @param x {any}
     * @returns {Maybe} - `Just` or `Nothing` based on value.
     */
    toMaybe = x => {
        if (!isset(x)) {
            return nothing();
        }
        return isMaybe(x) ? x : just(x);
    }
;
