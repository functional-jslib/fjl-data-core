/**
 * Created by elydelacruz on 2/19/2017.
 */

import Monad from '../monad/Monad';
import {compose, toFunction} from 'fjl';

export default class IO extends Monad {
    static unWrapIO (io) {
        if (!IO.isIO(io)) { return io; }
        return Monad.unWrapMonadByType(IO, io);
    }
    static of(fn) {
        return new IO(fn);
    }
    static isIO (x) {
        return x instanceof IO;
    }
    static do (io, ...args) {
        const instance = !IO.isIO(io) ? new IO(io) : io;
        return compose(
            IO.of,
            IO.unWrapIO
        )(
            toFunction(instance.join())(...args)
        );
    }

    constructor(fn) {
        super(toFunction(fn));
    }

    flatMap (fn) {
        return compose(
            this.constructor.of,
            IO.unWrapIO, fn,
            IO.unWrapIO
        )(
            toFunction(this.join())()
        );
    }

    map (fn) {
        return compose(
            this.constructor.of,
            fn
        )(
            toFunction(this.valueOf())()
        );
    }
}
