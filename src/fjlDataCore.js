/**
 * Created by elydelacruz on 2/19/2017.
 * @module fjlDataCore
 * Core monad types (useful for javascript).
 */
import Functor from './functor/Functor';
import Apply from './functor/Apply';
import Applicative from './functor/Applicative';
import Bifunctor from './functor/Bifunctor';
import Monad, {isMonad, valueOf, join, fmap,
    ap, flatMap, getMonadUnWrapper, trampoline} from './monad/Monad';
import IO from './io/IO';

export {
    Functor, Apply, Applicative, Bifunctor, IO, Monad,
    isMonad, valueOf, join, fmap, ap, flatMap, getMonadUnWrapper,
    trampoline
};

export * from './maybe/Maybe';
export * from './either/Either';
export * from './utils';
