### `maybe`
**Signature:** `maybe(replacement :*, a => b, Maybe(a)) :(b|replacement)`

Returns `replacment` value if `Maybe(a)` is a `Nothing` else maps
`a => b` operation on `Maybe(a)`;

**Haskell Type (fyi):**
`maybe :: b -> (a -> b) -> Maybe a -> b`

[Back to members list](#fjldatacore-members)
