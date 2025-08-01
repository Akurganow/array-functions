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

### `splitByKeyValue`

Splits an array of objects into subarrays with the same value of the given key.

```javascript
import { splitByKeyValue } from '@plq/array-functions'

const array = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
	{ id: 3, name: 'Alice' },
]

console.log(splitByKeyValue(array, 'name')) // Output: [[{ id: 1, name: 'Alice' }, { id: 3, name: 'Alice' }], [{ id: 2, name: 'Bob' }]]
```

### `createBalancedArray`

Creates an array of a specified length where the sum of all elements equals a given sum. The function distributes the sum evenly across the array elements. If the sum is negative, the function creates an array of negative numbers. If the sum cannot be evenly distributed, the function distributes the remainder as evenly as possible. If the length is zero or negative, the function returns an empty array.

```typescript
import { createBalancedArray } from '@plq/array-functions'

console.log(createBalancedArray(5, 10)); // Output: [2, 2, 2, 2, 2]
console.log(createBalancedArray(3, -5)); // Output: [-2, -2, -1]
console.log(createBalancedArray(0, 10)); // Output: []
console.log(createBalancedArray(-3, 10)); // Output: []
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

### GitHub Copilot

This repository includes a configured GitHub Copilot setup via `.github/copilot.yml` to provide enhanced code suggestions. The configuration includes:

- **Repository context**: Understands this is a TypeScript array utility library
- **File patterns**: Focuses on source files (`src/`) and tests (`__tests__/`)
- **Code guidelines**: Promotes functional programming, type safety, and comprehensive testing
- **Custom instructions**: Provides specific guidance for maintaining code quality and consistency

The Copilot configuration helps ensure generated code follows the project's patterns and best practices.

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
