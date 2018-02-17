/**
 * Created by elyde on 12/10/2016.
 */


'use strict';

import {isset, instanceOf, curry, map} from 'fjl';
import Monad from '../monad/Monad';
import {Just} from "../maybe/Maybe";
import {Bifunctor} from "../functor/Bifunctor";
import Nothing from "../maybe/Nothing";

export function Left (value) {
    if (!(this instanceof Left)) {
        return new Left(value);
    }
    Object.defineProperty(this, 'value', {value: value});
}

// Returns self from all monad methods/operations
Object.assign(Left.prototype, Nothing.prototype);

export function Right (value) {
    if (!(this instanceof Right)) {
        return new Right(value);
    }
    Just.call(this, value);
}

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

Right.counterConstructor = Left;

Object.assign(Right.prototype, Just.prototype);

export const

    isRight = instanceOf(Right),

    isLeft = instanceOf(Left),

    isEither = x => isRight(x) || isLeft(x),

    either = curry((leftCallback, rightCallback, monad) => {
        let identity = map(x => x, monad),
            ctor = identity.constructor;
        if (ctor === Left) {
            return map(leftCallback, identity);
        }
        else if (ctor === Right) {
            return map(rightCallback, identity);
        }
    });

export default Either;
