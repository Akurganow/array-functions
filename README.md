# array-functions
A set of frequently used functions for working with arrays, for sorting, filtering or checking the state of an array

## Functions

### `filterBySameKeyValue`

Filters an array of objects so that the value of a given key occurs only once in the array.

```javascript
import { filterBySameKeyValue } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
]

console.log(filterBySameKeyValue(array, 'name')) // Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### `getKeyValue`

Returns the array of values of a given key from an array of objects.

```javascript
import { getKeyValue } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
]

console.log(getKeyValue(array, 'name')) // Output: ['Alice', 'Bob', 'Alice']
```

### `sortBy`

Sorts an array of objects by a given key.

```javascript
import { sortBy } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Alice' },
  { id: 2, name: 'Bob' },
]

console.log(sortBy(array, 'id')) // Output: [{ id: 3, name: 'Bob' }, { id: 2, name: 'Alice' }, { id: 1, name: 'Alice' }]
console.log(sortBy(array, 'id', 'asc')) // Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Alice' }, { id: 3, name: 'Bob' }]
```

### `isSorted`

Checks if an array of objects is sorted by a given key.

```javascript
import { isSorted } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
]

console.log(isSorted(array, 'id')) // Output: false because default sort order is 'desc'
console.log(isSorted(array, 'id', 'asc')) // Output: true
console.log(isSorted(array, 'name', 'asc')) // Output: false
```

### `getUniqueValues`

Returns an array of unique values from an array of objects.

```javascript
import { getUniqueValues } from '@plq/array-functions'

const array = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Alice' },
]

console.log(getUniqueValues(array, 'name')) // Output: ['Alice', 'Bob']
```

## Development

### Install dependencies

```bash
npm install
```

### Lint

We use [ESLint](https://eslint.org/) and [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) to lint our code.
</br>
Check out [.eslintrc.json](https://github.com/Akurganow/array-functions/blob/main/.eslintrc.json)

```bash
npm run lint
```

### Run tests

We use [Jest](https://jestjs.io/) to test our code.

```bash
npm test
```

### Build

We use [TypeScript](https://www.typescriptlang.org/) to build our code.

```bash
npm run build
```

### Dev check list

- [ ] Add new file to `src` folder like `function-name.ts`
- [ ] Write a function `functionName` in `function-name.ts`
- [ ] Add new function to `src/index.ts` like `export { default as functionName } from './function-name'`
- [ ] Add new test to `__tests__` folder with name `function-name.test.ts`
- [ ] Write tests for `functionName` in `function-name.test.ts`
- [ ] Run `npm run lint`
- [ ] Run `npm run test`
- [ ] Commit and push your changes
- [ ] Create a pull request
