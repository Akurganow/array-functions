# @plq/array-functions

[![npm version](https://img.shields.io/npm/v/@plq/array-functions.svg)](https://www.npmjs.com/package/@plq/array-functions)
[![CI](https://github.com/Akurganow/array-functions/actions/workflows/ci.yml/badge.svg)](https://github.com/Akurganow/array-functions/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@plq/array-functions.svg)](https://www.npmjs.com/package/@plq/array-functions)

A small, dependency-free set of typed helpers for working with arrays of objects: sorting, grouping, deduplicating and
checking whether an array is already sorted.

- **Zero dependencies**, under 3 kB gzipped.
- **ESM and CommonJS** builds with bundled type declarations.
- **Runs everywhere**: tested on Node.js and Bun across Linux, macOS and Windows.
- **Pure functions**: inputs are never mutated.

## Installation

```bash
npm install @plq/array-functions
# or
pnpm add @plq/array-functions
# or
yarn add @plq/array-functions
# or
bun add @plq/array-functions
```

## Usage

```typescript
import { sortBy, splitByKeyValue } from '@plq/array-functions'

const users = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
  { id: 1, name: 'Alice' },
]

sortBy(users, 'id', 'asc')
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Alice' }]

splitByKeyValue(users, 'name')
// [[{ id: 2, name: 'Bob' }], [{ id: 3, name: 'Alice' }, { id: 1, name: 'Alice' }]]
```

CommonJS works too:

```javascript
const { sortBy } = require('@plq/array-functions')
```

> **Note on ordering.** Every sorting-related function (`sortBy`, `isSortedBy`, `isSortedValues`, `compareValues`)
> defaults to **descending** order. Pass `'asc'` explicitly for ascending order.

## API

### Sorting

#### `sortBy(items, key, order?)`

Returns a **new** array of objects sorted by `key`. The input is left untouched and the sort is stable.
`key` must point to a `string`, a `number`, or a function returning one of those. The function is called and its
return value is used for comparison. `NaN` values compare equal to everything, so their position in the result is
unspecified (as in 1.x).

```typescript
import { sortBy } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Alice' },
  { id: 2, name: 'Bob' },
]

sortBy(array, 'id')
// [{ id: 3, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 1, name: 'Alice' }]

sortBy(array, 'id', 'asc')
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Alice' }]

sortBy([{ createdAt: () => 20 }, { createdAt: () => 10 }], 'createdAt', 'asc')
// [{ createdAt: [Function] /* 10 */ }, { createdAt: [Function] /* 20 */ }]
```

Throws a `TypeError` when two compared values have different types (for example a `string` and a `number`).

#### `isSortedBy(array, key, order?)`

Checks whether an array of objects is sorted by `key`. Equal neighbours count as sorted. Empty and single-element
arrays are always sorted. `NaN` never compares as sorted against a neighbour, so an array of two or more elements
that contains `NaN` is never considered sorted.

```typescript
import { isSortedBy } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
]

isSortedBy(array, 'id')          // false, the default order is 'desc'
isSortedBy(array, 'id', 'asc')   // true
isSortedBy(array, 'name', 'asc') // false
```

Throws a `TypeError` when the array contains a non-object or when neighbouring values have different types.

#### `isSortedValues(values, order?)`

The same check for a flat array of strings or numbers. `NaN` never compares as sorted against a neighbour, so an
array of two or more elements that contains `NaN` is never considered sorted; a single-element array always is.

```typescript
import { isSortedValues } from '@plq/array-functions'

isSortedValues([3, 2, 1])            // true
isSortedValues([1, 2, 3], 'asc')     // true
isSortedValues(['a', 'c', 'b'], 'asc') // false
```

#### `compareValues(a, b, order?)`

A comparator for `Array.prototype.sort`. Strings are compared with `localeCompare`, numbers arithmetically.
Values of any other type are treated as equal. Two values of different types (e.g. a string and a number) are
treated as equal and `0` is returned.

```typescript
import { compareValues } from '@plq/array-functions'

['b', 'c', 'a'].sort((a, b) => compareValues(a, b, 'asc')) // ['a', 'b', 'c']
[1, 3, 2].sort(compareValues)                                // [3, 2, 1]
```

### Reading values

#### `getKeyValue(array, key)`

Returns the values of `key` from every object, in order, duplicates included.

```typescript
import { getKeyValue } from '@plq/array-functions'

getKeyValue([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }], 'name')
// ['Alice', 'Bob', 'Alice']
```

#### `getUniqueValues(array, key)`

Returns the distinct values of `key`, in order of first appearance. Values are compared like `Set` does:
objects by reference, `NaN` equal to `NaN`.

```typescript
import { getUniqueValues } from '@plq/array-functions'

getUniqueValues([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }], 'name')
// ['Alice', 'Bob']
```

### Grouping and filtering

#### `splitByKeyValue(array, key)`

Groups objects that share the same value of `key` into sub-arrays. Groups appear in order of first appearance and
objects keep their relative order within a group. `1` and `'1'` are different values.

```typescript
import { splitByKeyValue } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
]

splitByKeyValue(array, 'name')
// [[{ id: 1, name: 'Alice' }, { id: 3, name: 'Alice' }], [{ id: 2, name: 'Bob' }]]
```

#### `filterBySameKeyValue(value, index, array, key)`

A predicate for `Array.prototype.filter` that keeps only the first object for each distinct value of `key`.

```typescript
import { filterBySameKeyValue } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
]

array.filter((item, index, all) => filterBySameKeyValue(item, index, all, 'name'))
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### Building arrays

#### `createBalancedArray(length, sum)`

Creates an array of `length` integers that add up to `sum`, spreading the sum as evenly as possible. The remainder is
distributed one unit at a time from the start of the array. A negative `sum` yields non-positive elements; a zero or
negative `length` yields an empty array.

```typescript
import { createBalancedArray } from '@plq/array-functions'

createBalancedArray(5, 10) // [2, 2, 2, 2, 2]
createBalancedArray(3, 10) // [4, 3, 3]
createBalancedArray(3, -5) // [-2, -2, -1]
createBalancedArray(0, 10) // []
```

Throws a `RangeError` when `length` or `sum` is not an integer.

### Types

The package exports its helper types, so you can constrain your own APIs:

```typescript
import type { SortableKey, SortableOrder } from '@plq/array-functions'

interface User { id: number, name: string, tags: string[] }

type Key = SortableKey<User> // 'id' | 'name' — `tags` is not sortable
type Order = SortableOrder   // 'asc' | 'desc'
```

`DEFAULT_ORDER` (`'desc'`) is exported as well.

**Sorting by an optional property.** `SortableKey<T>` only offers keys whose value is always a `string`, a `number`
or a getter returning one, so `label?: string` is not accepted. In 1.x such a call compiled but threw at runtime as
soon as one element had no value. Narrow the element type first, for example
`items.filter((item): item is Item & Required<Pick<Item, 'label'>> => item.label !== undefined)`, and sort the
narrowed array.

## Supported runtimes

| Runtime | Versions tested | Platforms |
| ------- | --------------- | --------- |
| Node.js | active LTS and latest (currently 24 and 26) | Linux, macOS, Windows |
| Bun     | two most recent minor lines (currently 1.3 and 1.4) | Linux, macOS, Windows |

The published build targets ES2022 and declares `engines.node >= 22`.

## Contributing

Bug reports and pull requests are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development workflow,
the test matrix and the release process.

## License

[MIT](./LICENSE) © Alexander Kurganov
