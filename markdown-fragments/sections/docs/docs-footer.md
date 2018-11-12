Readme docs:
### Just(x): Just{x}
Wraps a value in a just;  E.g.,
```javascript
import {Just} from 'fjl-data-core';
console.log(
    (new Just(99)).map(x => x * 2).value === 99 * 2
); // `true`
```

### just(x): Just{x}
Same as `Just` except in method form; E.g.:
```javascript
import {just} from 'fjl-data-core';
console.log(
    (just(99)).map(x => x * 2).value === 99 * 2
); // `true`
```

### isJust(x): boolean
`// Self explanatory`

### Nothing(): Nothing
Always returns `Nothing` singleton; Even when called with `new`; E.g.:
```javascript
import {Nothing} from 'fjl-data-core';
import {log} from 'fjl';
log(
    Nothing() === new Nothing()
) // `true`
```
 
### nothing(): Nothing
Same as `Nothing` except in method form; E.g.:
```javascript
import {nothing} from 'fjl-data-core';
import {log} from 'fjl';
log(
    nothing() === Nothing() && nothing() === new Nothing()
) // `true`
```

### isNothing(x): boolean
`// Self explanatory`

### `maybe(replacement: *, a => b, Maybe(a)): (b|replacement)`
**Haskell Type**
`maybe :: b -> (a -> b) -> Maybe a -> b`
Returns `replacment` value if `Maybe(a)` is a `Nothing` else maps
`a => b` operation on `Maybe(a)` 


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
