import {map, id} from 'fjl';
import {flatMap} from './operators';

/**
 * Created by edlc on 12/9/16.
 * @module Identity
 */
export const isIdentity = value => value instanceof Identity;

export class Identity {
    constructor(value) {
        this.value = value;
    }

    static of (value) {
        new Identity(value);
    }

    static unwrap (value) {
        if (isIdentity(value)) {
            return Identity.unwrap(value.valueOf());
        }
    }

    valueOf () {
        return this.value;
    }

    join () {
        return this.valueOf();
    }

    map (fn) {
        return this.constructor.of(fn(this.valueOf()));
    }

    ap (x) {
        return x.map(this.valueOf());
    }

    flatMap(fn) {
        return this.map(fn).join();
    }
}

// Export `isIdentity` and make it not `writable`
Object.defineProperty(Identity, 'isIdentity', {value: isIdentity, enumerable: true});

export default Identity;
