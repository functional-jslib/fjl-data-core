/**
 * Created by elydelacruz on 2/19/2017.
 */

import Monad from '../monad/Monad';
import {toFunction} from '../utils';

export default class IO extends Monad {
    constructor(fn) {
        super(toFunction(fn));
    }

    static of(fn) {
        return new IO(fn);
    }

    static isIO (x) {
        return x instanceof IO;
    }

    flatMap (fn) {
        const out = fn(this.join()());
        return !(out instanceof this.constructor) ?
            IO.of(out) : IO.of(out.join()());
    }

    static do (io, ...args) {
        return (IO.isIO(io) ? io : IO.of(io)).fork(...args);
    }

    fork (...args) {
        return IO.of(setTimeout(() => this.join()(...args), 0));
    }

}
