Readme docs:
### `class Just(x): Just<x>`
Wraps a value in a `Just` functor;  E.g.,
```javascript
import {Just} from 'fjl-data-core';
console.log(
    (new Just(99)).map(x => x * 2).value === 99 * 2
); // `true`
```

### `just(x) :Just<x>`
Same as `Just` except in method form; E.g.:
```javascript
import {just} from 'fjl-data-core';
console.log(
    (just(99)).map(x => x * 2).value === 99 * 2
); // `true`
```

### `isJust(x) :boolean`

### `Nothing() :Nothing`
Always returns `Nothing` singleton; Even when called with `new`; E.g.:
```javascript
import {Nothing} from 'fjl-data-core';
import {log} from 'fjl';
log(
    Nothing() === new Nothing()
) // `true`
```
 
### `nothing() :Nothing`
Same as `Nothing` except in method form; E.g.:
```javascript
import {nothing} from 'fjl-data-core';
import {log} from 'fjl';
log(
    nothing() === Nothing() && nothing() === new Nothing()
) // `true`
```

### `isNothing(x) :boolean`

### `maybe(replacement :*, a => b, Maybe(a)) :(b|replacement)`
Returns `replacment` value if `Maybe(a)` is a `Nothing` else maps
`a => b` operation on `Maybe(a)`;

**Haskell Type**
`maybe :: b -> (a -> b) -> Maybe a -> b`

### `isMaybe(x) :boolean`
### `isMonad(x) :boolean`
### `toMaybe(x) :(Just<x>|Nothing)`
Wraps given value in a maybe;  Value gets wrapped in a `Just` if 
it is non-empty (not equal to `undefined` or `null`), else returns `Nothing`.

### `join(m :Monad) :Monad`
Removes one layer of structure from monad.
```javascript
import {join, just, maybeEqual} from 'fjl-data-core';
import {compose, log} from 'fjl';

compose(log, maybeEqual(just(99)), join, just, just)(99); // `true` 
```
### `fmap(x => y, f :Functor) :Functor<y>`
### `ap(x :Applicative, f :Functor) :Applicative`
### `flatMap(fn: (x) => y, m :Monad<x>) :Monad<y>`
### `getMonadUnWrapper(Type: Function) :(m: Monad) => *`
### `trampoline(fn: Function) :*`
### `class Monad (x) {}`

### Old docs below
- `Maybe` - Gives you an either of `Just a` or a `Nothing`.  Example:
```
log(Maybe(99)) // Just(99)
log(Maybe(undefined)) // Nothing()
```
- `Maybe.Nothing` - Always gives you a `Nothing` whether you're `flatMap`ing `map`ing or other etc. you'll always 
get a `Nothing` on `Nothing`.  Example:
```
Nothing.map(x => (console.log('Hello World Big Bird'), 99)) === Nothing // true
``` 
- `Maybe.Just` - @todo add description
- `Either.Right` - @todo add description
- `Either.Left` - @todo add description
- `IO` - Functions similarly to es6 `Promise`s but currently, they do not have `bimap` (`then`) functionality
and/or `catch` functionality (will add functionality later).
- `Monad` - Class for easily creating other monads (inherits `Applicative`, `Apply` and `Functor` from './src/...'). 
- @todo add other members
