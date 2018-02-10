/**
 * Created by edlc on 12/9/16.
 * Basic `Identity` class.  Used to extend from to create `Maybe` and `Either` module/classes.
 * @module Identity
 * @see `Maybe` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html
 * @see `Either` reference: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html
 */
export const isIdentity = value => value instanceof Identity;

export class Identity {
    constructor(value) {
        this.value = value;
    }

    static of (value) {
        new Identity(value);
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
