/**
 * Created by elyde on 12/11/2016.
 */
import {typeOf, curry, of, curry3, isUsableImmutable} from 'fjl';

export const

    equals = curry((a, b) =>
        a.equals ? a.equals(b) : a === b),

    empty = x => x.constructor.empty ? x.constructor.empty() : of(x),

    zero = x => x.constructor.zero ? x.constructor.zero() : of(x),

    ap = curry((a, b) => a.ap ? a.ap(b) : a(b)),

    alt = curry((a, b) => a.alt ? a.alt(b) : a || b),

    join = (x, delimiter) => x.join ? x.join(delimiter) : x,

    flatMap = curry((fn, x) => x.flatMap ? x.flatMap(fn) : join(map(fn, x))),

    fmap = curry((fn, x) => x.fmap ? x.fmap(fn) : fn(x)),

    // chainRec = () => {},

    lte = curry((a, b) => a.lte ? a.lte(b) : a <= b),

    // contramap () => {}

    liftN = curry3((fn, x1, ...otherXs) =>
        otherXs.reduce(
            (aggregator, x) => ap(aggregator, x), map(fn, x1)
        )),

    extend = curry((fn, x) => x.extend(fn)),

    extract = curry((fn, x) => x.extract(fn)),

    promap = curry((fn1, fn2, x) => x.promap(fn1, fn2)),

    bimap = curry((fn1, fn2, x) => x.bimap(fn1, fn2));

export default {
    equals,
    empty,
    ap,
    chain,
    join,
    alt,
    zero,
    liftN,
    bimap,
    promap
};
