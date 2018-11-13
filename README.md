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
Functor, [Apply](#apply), [Applicative](#applicative), [Bifunctor](#bifunctor), [Monad](#monad), [isMonad](#ismonad), [valueOf](#valueof), [join](#join),
[fmap](#fmap), [ap](#ap), [flatMap](#flatmap), [getMonadUnWrapper](#getmonadunwrapper), [IO](#io), [Just](#just), [isJust](#isjust), [just](#just), [Nothing](#nothing),
[isNothing](#isnothing), [nothing](#nothing), [maybe](#maybe), [unWrapJust](#unwrapjust), [unWrapMaybe](#unwrapmaybe), [maybeEqual](#maybeequal), [isMaybe](#ismaybe),
[toMaybe](#tomaybe), [Left](#left), [Right](#right), [isRight](#isright), [isLeft](#isleft), [either](#either), [toRight](#toright), [toLeft](#toleft)
```

### `alwaysFunctor`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `ap`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `Applicative`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `Apply`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `Bifunctor`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `either`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `flatMap`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `fmap`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `Functor`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `getMonadUnWrapper`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `IO`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `isJust`
**Signature**: `isJust(x: any): boolean`

[Back to members list](#fjldatacore-members)

### `isLeft`
**Signature**: `isLeft(x: any): boolean`

[Back to members list](#fjldatacore-members)

### `isMaybe`
**Signature**: `isMaybe(x: any): boolean`

[Back to members list](#fjldatacore-members)

### `isMonad`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `isNothing`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `isRight`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `join`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `Just`
**Signature**: `class Just(x): Just<x>`

`Just` monad - Wraps given value in a `Just` and gives 
you a monad interface (functor + apply + applicative + monad);

[Back to members list](#fjldatacore-members)

### `just`
**Signature**: `just (x: any): Just<x>`

Wraps given value in a `Just` (same as `Just` except in method form); E.g.:

```javascript
import {just} from 'fjl-data-core';
console.log(
    just(99).map(x => x * 2).value === 99 * 2
); // `true`
```

[Back to members list](#fjldatacore-members)

### `Left`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `maybe`
**Signature:** `maybe(replacement :*, a => b, Maybe(a)) :(b|replacement)`

Returns `replacment` value if `Maybe(a)` is a `Nothing` else maps
`a => b` operation on `Maybe(a)`;

**Haskell Type (fyi):**
`maybe :: b -> (a -> b) -> Maybe a -> b`

[Back to members list](#fjldatacore-members)

### `maybeEqual`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `Monad`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `Nothing`
**Signature**: `Nothing(): Nothing`

Always returns `Nothing` singleton; Even when called with `new`; E.g.:

```javascript
import {Nothing} from 'fjl-data-core';
import {log} from 'fjl';
log(
    Nothing() === new Nothing()
) // `true`
```

[Back to members list](#fjldatacore-members)

### `nothing(): Nothing`
Same as `Nothing` except in method form; E.g.:
```javascript
import {nothing} from 'fjl-data-core';
import {log} from 'fjl';
log(
    nothing() === Nothing() && nothing() === new Nothing()
) // `true`
```

[Back to members list](#fjldatacore-members)

### `Right`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `toLeft`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `toMaybe`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `toRight`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `trampoline`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `justUnWrapper(x: Just): (Just|*)`

Removes one layer of structure from a `Just`.

[Back to members list](#fjldatacore-members)

### `unWrapMaybe`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)

### `valueOf`

@todo - Added documentation here.

[Back to members list](#fjldatacore-members)


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
