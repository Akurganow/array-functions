# array-functions
A set of frequently used functions for working with arrays, for sorting, filtering or checking the state of an array

## Functions

### `filterBySameKeyValue`

Filters an array of objects so that the value of a given key occurs only once in the array.

```javascript
import { filterBySameKeyValue } from '@plq/array-functions';

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
];

console.log(filterBySameKeyValue(array, 'name')); // Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### `getKeyValue`

Returns the array of values of a given key from an array of objects.

```javascript
import { getKeyValue } from '@plq/array-functions';

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
];

console.log(getKeyValue(array, 'name')); // Output: ['Alice', 'Bob', 'Alice']
```

### `sortBy`

Sorts an array of objects by a given key.

```javascript
import { sortBy } from '@plq/array-functions';

const array = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

console.log(sortBy(array, 'id')); // Output: [{ id: 3, name: 'Bob' }, { id: 2, name: 'Alice' }, { id: 1, name: 'Alice' }]
console.log(sortBy(array, 'id', 'asc')); // Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Alice' }, { id: 3, name: 'Bob' }]
```

### `isSorted`

Checks if an array of objects is sorted by a given key.

```javascript
import { isSorted } from '@plq/array-functions';

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
];

console.log(isSorted(unsorted, 'id')); // Output: false
