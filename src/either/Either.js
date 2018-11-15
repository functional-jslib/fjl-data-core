/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 * @module either
 */
import {isset, curry, id, toFunction} from 'fjl';
import {Just} from '../maybe/Maybe';
import Monad, {alwaysMonad} from '../monad/Monad';

/**
 * `Left` representation of `Either` construct.
 * @class Left
 * @param x {any}
 * @property value {any}
 */
export class Left extends Monad {
    static of (x) { return new Left(x); }
}

/**
 * @class Right
 * @param x {any}
 * @property value {any}
 */
export class Right extends Just {
    map (fn) {
        const value = this.valueOf();
        if (isLeft(value)) {
            return value;
        }
        else if (!isset(value)) {
            return Left.of(
                `TypeError: Cannot operate on \`${value}\`.`
            );
        }
        return Right.of(fn(value));
    }

    static of (x) { return new Right(x); }
}

export const
    /**
     * Checks for instance of `Right` constructor.
     * @function module:either.isRight
     * @param x {any}
     * @returns {boolean}
     */
    isRight = x => x instanceof Right,

    /**
     * Checks for instance of `Left` constructor.
     * @function module:either.isLeft
     * @param x {any}
     * @returns {boolean}
     */
    isLeft = x => x instanceof Left,

    /**
     * Calls matching callback on incoming `Either`'s type;  If is a `Left` (after mapping identity func on it) then calls left-callback and unwraps result
     * else calls right-callback and does the same.  Think of it like a functional
     * ternary statement (lol).
     * @function module:either.either
     * @param leftCallback {Function} - Mapped over value of `monad`'s identity.
     * @param rightCallback {Function} - "".
     * @return {any} - Value of unwrapped resulting value of `flatMap`ped, passed-in callback's on passed in monad.
     * @example
     * expect(
         either(() => 404, () => 200, compose(right, right, right, right)(true))
       ).toEqual(undefined);
     */
    either = curry((leftCallback, rightCallback, monad) => {
        const identity = alwaysMonad(monad).flatMap(id),
            out = isRight(monad) ?
                identity.flatMap(toFunction(rightCallback)) :
                Left.of(identity).flatMap(leftCallback)
            ;
        return isset(out) ? out.join() : out;
    }),

    /**
     * Returns a `Right` - if not a `Right` creates one from given, else returns given.
     * @function module:either.toRight
     * @param x {any}
     * @returns {Right}
     */
    toRight = x => isRight(x) ? x : new Right(x),

    /**
     * Returns a `Left` - if not a `Left` creates one from given, else returns given.
     * @function module:either.toLeft
     * @param x {any}
     * @returns {Left}
     */
    toLeft = x => isLeft(x) ? x : new Left(x)

;
