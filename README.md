[![Build Status](https://travis-ci.org/functional-jslib/fjl-data-core.png)](https://travis-ci.org/functional-jslib/fjl-data-core)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl-data-core.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl-data-core)
[![NPM version](https://badge.fury.io/js/fjl-data-core.svg)](http://badge.fury.io/js/fjl-data-core)
[![Dependencies](https://david-dm.org/functional-jslib/fjl-data-core.png)](https://david-dm.org/functional-jslib/fjl-data-core)
# fjl-data-core (W.I.P. (work-in-progress))
Haskell's `data Maybe a`, `data Either a b`, and `data IO a * -> *` implementations in javascript.

## Sections in Readme:
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Docs](#docs)
- [Motivation](#motivations)
- [Development](#development)
- [Supported Platforms](#supported-platforms)
- [License](#license)
- [Resources](#resources)
- [Change log](#change-log)

## Requirements:
- Javascript Ecmascript 5+.

### Supported Platforms:

#### Browsers
- IE9+, and all other modern day browsers.

#### NodeJs
- 8+

## Getting Started:

### In NodeJs: 
#### Using es2015 modules:
```
import {...} from 'fjl-data-core';
```

#### Using CommonJs modules:
```
const {...} = require('fjl-data-core');
```

### In Browser:
See desired export type below:
- './dist/amd/' - Asynchronous module format.
- './dist/cjs/' - CommonJs module format.
- './dist/umd/' - Universal module definition format.
- './dist/iife/' - Immediately Invoked Function Execution - (exports `fjlMutable` as a global).
- './dist/es6-module/' - Ecmascript 6 module format.

## Docs

**JSDocs** are here (https://functional-jslib.github.io/fjl-data-core/) [https://functional-jslib.github.io/fjl-data-core/].

### `fjlDataCore` members
 ```
Functor, Apply, Applicative, Bifunctor, Monad, isMonad, valueOf, join,
fmap, ap, flatMap, getMonadUnWrapper, trampoline, IO, Just, isJust,
just, Nothing, isNothing, nothing, maybe, isMaybe, toMaybe, Left, Right,
isRight, isLeft, either, toFunction, alwaysFunctor
```

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

## Development:
- For commands see './package.json' scripts.

### Dir structure
- Everything is in './src'.
- Distribution is in './dist'.
- Docs are in './docs'.

### Testing
Using `jest` (see './package.json' scripts).

## License:
BSD 3 Clause - Included in sources.

## Resources:


## Change log

### 0.1.0
