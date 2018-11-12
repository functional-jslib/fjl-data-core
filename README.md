# fjl-data-identity (WIP (Work in progress))
Haskell's `data Maybe a`, `data Either a b`, and `data IO a * -> *` implementations in javascript.

## Reasoning
- Mimick some of haskell's base Monads: Maybe, Either, and IO (for starters).
- Use the js platform's features to implement the required functionality.

## Basic usage
```
    Just(99)
    .map(x => Just(x * 2))
    .flatMap(x => Just(x * 2))
```

## Library members
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

## Testing
- `jest` - @todo add url 
- `chai` - @todo add url

## License
BSD-3-Clause
