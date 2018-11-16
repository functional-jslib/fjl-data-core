let NothingSingleton;

/**
 * Constructor and function for creating/fetching `Nothing`.
 * @note Nothing always returns a singleton instance of `Nothing` (whether calling `Nothing` with new or as a
 * function.
 * @function module:maybe.Nothing
 * @param [x=undefined]{*} - Ignored.
 * @returns {Nothing}
 * @constructor
 * @memberOf module:maybe
 */
function Nothing (x = undefined) {
    if (NothingSingleton) {
        return NothingSingleton;
    }
    else if (!(this instanceof Nothing)) {
        return new Nothing();
    }
    NothingSingleton = this;
    Object.freeze(NothingSingleton);
}

// Documented further below
const

    /**
     * Checks for `Nothing`.
     * @function module:maybe.isNothing
     * @param x {*}
     * @returns {boolean}
     */
    isNothing = x => x === NothingSingleton,

    /**
     * Returns `Nothing`.
     * @function module:maybe.nothing
     * @returns {Nothing}
     */
    nothing = () => new Nothing(),
    returnThis = function (x) { return this; }
    ;

// Methods
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#valueOf
 * @returns {Nothing}
 */
Nothing.prototype.valueOf   = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#join
 * @returns {Nothing}
 */
Nothing.prototype.join      = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#map
 * @returns {Nothing}
 */
Nothing.prototype.map       = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#ap
 * @returns {Nothing}
 */
Nothing.prototype.ap        = returnThis;
/**
 * Returns `Nothing`.
 * @method module:maybe.Nothing#flatMap
 * @returns {Nothing}
 */
Nothing.prototype.flatMap   = returnThis;

// Set statics
/**
 * Applicative `pure` - Same as `new Nothing()`, `Nothing()`, and `nothing()`.
 * @memberOf module:maybe.Nothing
 * @function module:maybe.Nothing.of
 * @static
 * @returns {Nothing}
 */
Nothing.of  = x => new Nothing();

// Object.freeze makes properties on object immutable
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// Saves us from having to do the following (great!):
// Object.defineProperties(Nothing, {
//     of: {value: () => new Nothing(), enumerable: true},
//     isNothing: {value: isNothing, enumerable: true}
// });
Object.freeze(Nothing);

export {isNothing, nothing};

export default Nothing;
