import {isFunction} from 'fjl';

export const toFunction = x => isFunction(x) ? x : () => x;
