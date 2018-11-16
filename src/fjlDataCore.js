/**
 * Makes all module members in library accessible via itself (is also the main export of the library).
 * Created by elydelacruz on 2/19/2017.
 * @module fjlDataCore
 */
import Functor from './functor/Functor';
import Apply from './functor/Apply';
import Applicative from './functor/Applicative';
import Bifunctor from './functor/Bifunctor';
import Monad, {isMonad, valueOf, join, fmap,
    ap, flatMap, getMonadUnWrapper} from './monad/Monad';
import IO from './io/IO';

export {
    Functor, Apply, Applicative, Bifunctor, IO, Monad,
    isMonad, valueOf, join, fmap, ap, flatMap, getMonadUnWrapper
};

export * from './maybe/Maybe';
export * from './either/Either';

/* ==================================== */
/* Virtual types */
/* ==================================== */
/**
 * @typedef {Function} UnaryOperation
 */

/**
 * @typedef {Just|Nothing} Maybe
 */

/**
 * @typedef {Left|Right} Either
 */
