import {isFunction} from 'fjl';
import Functor from "./functor/Functor";

export const
    toFunction = x => isFunction(x) ? x : () => x,
    alwaysFunctor = x => !x.map ? new Functor(x) : x
;
