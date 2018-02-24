/**
 * Created by elyde on 12/10/2016.
 */

import {isset, curry, id} from 'fjl';
import {Just} from "../maybe/Maybe";
import Monad from '../monad/Monad';
import {alwaysFunctor, toFunction} from "../utils";

class Left extends Monad {
    static of (x) { return new Left(x); }
}

class Right extends Just {
    map (fn) {
        const value = this.valueOf();
        if (isLeft(value)) {
            return value;
        }
        else if (!isset(value)) {
            return Left.of(
                `TypeError: Cannot operate on \`null\` and/or \`undefined\`.  ` +
                `Value given \`${value}\`.`
            );
        }
        return Right.of(fn(value));
    }

    static of (x) { return new Right(x); }
}

export const

    isRight = x => x instanceof Right,

    isLeft = x => x instanceof Left,

    either = curry((leftCallback, rightCallback, monad) => {
        const identity = alwaysFunctor(monad).map(id);
        switch (identity.constructor) {
            case Left:
                return identity.map(toFunction(leftCallback)).join();
            case Right:
                return identity.map(toFunction(rightCallback)).join();
            default:
                return Left.of(monad).map(leftCallback).join();
        }
    });

export {Left, Right};

