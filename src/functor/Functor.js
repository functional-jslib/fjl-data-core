/**
 * Functor class and associated operations.
 * Created by edlc on 12/9/16.
 * @module functor
 */

/**
 * Always returns a functor;  If given value is not
 * a functor creates one from given value to it.
 * @function module:functor.toFunctor
 * @param x {{map: Function}|*} - Functor or any.
 * @returns {*}
 */
export const toFunctor = x => !x.map ? new Functor(x) : x;

/**
 * Plain old functor class.
 * @class module:functor.Functor
 * @param value {*}
 * @property value {*}
 */
export default class Functor {

    /**
     * @constructor
     * @param value {*}
     */
    constructor(value) {
        this.value = value;
    }

    /**
     * Extracts value of functor (same as monadic `join`).
     * @method module:functor.Functor#valueOf
     * @returns {*}
     */
    valueOf() {
        return this.value;
    }

    /**
     * Maps a function over contents of functor.
     * @method module:functor.Functor#map
     * @param fn {Function} - Function that takes one `any` and returns one `any`.
     * @returns {Functor}
     */
    map(fn) {
        return new this.constructor(fn(this.valueOf()));
    }

    /**
     * Same as `#Functor.map`.
     * @method module:functor.Functor#fmap
     * @param fn {Function}
     * @returns {Functor}
     */
    fmap (fn) {
        return this.map(fn);
    }
}
