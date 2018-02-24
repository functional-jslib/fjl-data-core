/**
 * Created by elyde on 12/10/2016.
 */

import {isset, instanceOf, curry, map} from 'fjl';
import {Just, Nothing} from "../maybe/Maybe";
import Monad from '../monad/Monad';

export class Left extends Monad {
    static of (x) { return new Left(x); }
}

// Returns self from all monad methods/operations
Object.assign(Left.prototype, Nothing.prototype);

export class Right extends Just {
    map (fn) {
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
    }

    static of (x) { return new Right(x); }
}

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
