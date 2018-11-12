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
