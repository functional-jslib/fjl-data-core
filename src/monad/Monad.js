/**
 * Created by edlc on 12/9/16.
 * Contains basic `Monad` class and associated methods.
 * For 'what is a monad'/back-story
 * @see `Maybe` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html)
 * @see `Either` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html)
 * @module monad
 */

import {isset, curry, instanceOf, trampoline} from 'fjl';
import Applicative from '../functor/Applicative';
import Functor from '../functor/Functor';

export const

    /**
     * Returns boolean indicating whether given value is an
     * instance of monad or not.
     * @function module:monad.isMonad
     * @param value {any}
     * @returns {boolean}
     */
    isMonad = value => value && value instanceof Monad,

    /**
     * Always returns a monad;  If given value is not
     * a monad creates using given value.
     * @function module:functor.alwaysMonad
     * @param x {Monad|any} - Monad or any.
     * @returns {any}
     */
    alwaysMonad = x => !x.map ? new Monad(x) : x,

    /**
     * Calls `valueOf` on value (use for functional composition).
     * @function module.fjlDataCore.valueOf
     * @param x {any}
     * @returns {any}
     */
    valueOf = x => x.valueOf(),

    /**
     * Calls `valueOf` on given value.  Same as
     * monadic `join` operation (extracts inner value of
     * container/object).
     * @function module.fjlDataCore.join
     * @param x {any}
     * @returns {any}
     */
    join = valueOf,

    /**
     * Maps given function over given functor.
     * @function module.fjlDataCore.fmap
     * @param fn {Function}
     * @param x {Functor}
     * @returns {Functor}
     */
    fmap = curry((fn, x) => x.map(fn)),

    /**
     * Applies function contained by applicative to contents of given functor.
     * (Same as functional applicative `apply`).
     * @function module.fjlDataCore.ap
     * @param applicative {Applicative}
     * @param functor {Functor}
     * @returns {Applicative}
     */
    ap = curry((applicative, functor) => applicative.ap(functor)),

    /**
     * Flat maps a function over given monad's contained value.
     * @function module.fjlDataCore.flatMap
     * @param fn {Function}
     * @param monad {Monad}
     * @returns {Monad}
     */
    flatMap = curry((fn, monad) => monad.flatMap(fn)),

    /**
     * A recursive monad un-wrapper (doesn't work on promises (for promises use `async` `await` (to unwrap))).  Unwraps monad to most inner contents (final inner value).
     * @function module:monad.getMonadUnWrapper
     * @param Type {Function}
     * @returns {Array.<any>} - [unWrapFunction, tailCallFuncName (used by `trampoline` @see module:fjl.trampoline)]
     */
    getMonadUnWrapper = Type => {
        return [ function unWrapMonadByType(monad) {
                return instanceOf(Type, monad) ?
                    function trampolineCall() {
                        return unWrapMonadByType(monad.valueOf());
                    } :
                    monad;
            }, 'trampolineCall' ];
    };

/**
 * @class module:monad.Monad
 * @param x {any}
 * @property value {any}
 */
export default class Monad extends Applicative {
    static unWrapMonadByType (Type, monad) {
        if (!isset(monad)) { return monad; }
        const [unWrapper, tailCallName] = getMonadUnWrapper(Type),
            unwrap = trampoline(unWrapper, tailCallName);
        return unwrap(monad);
    }

    /**
     * Monadic join - Removes one layer of monadic structure from value.
     * @memberOf module:monad.Monad
     * @returns {any}
     */
    join () {
        return this.valueOf();
    }

    /**
     * Flat map operation.
     * @memberOf module:monad.Monad
     * @param fn {Function}
     * @returns {Monad}
     */
    flatMap (fn) {
        const out = Monad.unWrapMonadByType(this.constructor, fn(this.join()));
        return this.constructor.of(out);
    }

    /**
     * Same as `Monad.flatMap`.
     * @memberOf module:monad.Monad
     * @param fn {Function}
     * @returns {Monad}
     */
    chain (fn) {
        return this.flatMap(fn);
    }

    /**
     * Same as `new Monad(...)` just in 'static' function
     * format.
     * @memberOf module:monad.Monad
     * @static
     * @param x {any}
     * @returns {Monad}
     */
    static of (x) { return new Monad(x); }

    /**
     * Checks for monad.
     * @memberOf module:monad.Monad
     * @static
     * @param x {any}
     * @returns {boolean}
     */
    static isMonad (x) { return isMonad(x); }
}
