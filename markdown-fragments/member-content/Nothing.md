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
