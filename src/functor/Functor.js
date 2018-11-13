/**
 * Functor class and associated operations.
 * Created by edlc on 12/9/16.
 * @module functor
 */


/**
 * Always returns a functor;  If given value is not
 * a functor creates one and passes given value to it.
 * @function module:functor.alwaysFunctor
 * @param x {{map: Function}|any} - Functor or any.
 * @returns {any}
 */
export const alwaysFunctor = x => !x.map ? new Functor(x) : x;

/**
 * Plain old functor class.
 * @class module:functor.Functor
 * @param value {any}
 * @property value {any}
 */
export default class Functor {

    /**
     * @memberOf module:functor.Functor
     * @param value {any}
     */
    constructor(value) {
        this.value = value;
    }

    /**
     * Extracts value of functor (same as monadic `join`).
     * @memberOf module:functor.Functor
     * @returns {any}
     */
    valueOf() {
        return this.value;
    }

    /**
     * Maps a function over contents of functor.
     * @memberOf module:functor.Functor
     * @param fn {Function} - Function that takes one `any` and returns one `any`.
     * @returns {Functor}
     */
    map(fn) {
        return new this.constructor(fn(this.valueOf()));
    }

    /**
     * Same as `#Functor.map`.
     * @memberOf module:functor.Functor
     * @param fn {Function}
     * @returns {Functor}
     */
    fmap (fn) {
        return this.map(fn);
    }
}
