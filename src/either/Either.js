/**
 * Created by elyde on 12/10/2016.
 */


'use strict';

import {isset, curry2, map, subClass, subClassMulti} from 'fjl';
import Monad from '../monad/Monad';
import {Just} from "../maybe/Maybe";

export function Left (value) {
    if (!(this instanceof Left)) {
        return new Left(value);
    }
    Just.call(this, value);
}

Object.assign(Left.prototype, Just.prototype);

export function Right (value) {
    if (!(this instanceof Right)) {
        return new Right(value);
    }
    Just.call(this, value);
}

Right.counterConstructor = Left;
Object.assign(Right.prototype, Just.prototype);

function Either (left, right) {
        if (!(this instanceof Either)) {
            return Either.of(left, right);
        }
        BiFunctor.call(this, left, right);
    }

export const either = curry2((leftCallback, rightCallback, monad) => {
    let identity = map(value => value, monad),
        ctor = identity.constructor;
    if (ctor === Left) {
        return map(leftCallback, identity);
    }
    else if (ctor === Right) {
        return map(rightCallback, identity);
    }
});

export default Either;
