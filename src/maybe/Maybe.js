import Just from './Just';
import Nothing, {isNothing} from './Nothing';
import {isset, curry, id} from 'fjl';

export * from './Just';

export * from './Nothing';

export const maybe = curry((replacement, fn, maybeInst) => {
    const subject = maybeInst.map(id);
    return isNothing(subject) ? replacement : subject.flatMap(fn).valueOf();
});

export default function Maybe (x) {
    return !isset(x) ? Just(x) : Nothing();
}
