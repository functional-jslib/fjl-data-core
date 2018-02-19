/**
 * Created by elyde on 12/10/2016.
 */

import {isset, instanceOf, curry, map} from 'fjl';
import {Just, Nothing} from "../maybe/Maybe";

export function Left (value) {
    if (!isLeft(this)) {
        return Left.of(value);
    }
    Object.defineProperty(this, 'value', {value: value});
}

Left.of = x => new Left(x);

// Returns self from all monad methods/operations
Object.assign(Left.prototype, Nothing.prototype);

export function Right (value) {
    if (!isRight(this)) {
        return Right.of(value);
    }
    Just.call(this, value);
}

Object.assign(Right.prototype, Just.prototype);

Right.prototype.map = function (fn) {
    const {constructor} = this,
        value = this.valueOf();
    if (isLeft(value)) {
        return value;
    }
    else if (!isset(value)) {
        return constructor.counterConstructor.of(
            `TypeError: Cannot operate on \`null\` and/or \`undefined\`.  ` +
            `Value given \`${value}\`.`
        );
    }
    return constructor.of(fn(value));
};

Right.of = x => new Right(x);

Right.counterConstructor = Left;

export const

    isRight = instanceOf(Right),

    isLeft = instanceOf(Left),

    either = curry((leftCallback, rightCallback, monad) => {
        let identity = map(x => x, monad),
            ctor = identity.constructor;
        if (isLeft(ctor)) {
            return map(leftCallback, identity).join();
        }
        else if (isRight(ctor)) {
            return map(rightCallback, identity).join();
        }
    });

export default Either;
