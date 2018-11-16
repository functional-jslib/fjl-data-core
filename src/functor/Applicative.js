/**
 * Created by edlc on 12/9/16.
 * Applicative class module.
 * @memberOf module:functor
 */
import Apply from './Apply';

/**
 * @class module:functor.Applicative
 * @extends module:functor.Apply
 */
export default class Applicative extends Apply {
    /**
     * Constructs an applicative with given `value`.
     * @function module:functor.Applicative.of
     * @static
     * @param value {*}
     * @returns {Applicative}
     */
    static of (value) {
        return new Applicative(value);
    }
}
