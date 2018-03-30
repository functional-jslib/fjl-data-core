/**
 * Created by elydelacruz on 2/19/2017.
 */

'use strict';

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

    fork () {
        return this.map(fn => fn());
    }

    do (...args) {
        return IO.of(this.join()(...args));
    }

    unsafePerformIO (...args) {
        return this.do(...args);
    }
}
