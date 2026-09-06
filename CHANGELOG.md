# Changelog

## [2.0.0](https://github.com/Akurganow/array-functions/compare/1.5.1...2.0.0) (2026-09-06)

### ⚠ BREAKING CHANGES

* `compareValues` returns `0` for two values of different types; previously the result depended on `typeof a` and could throw for `'desc'`.
* `createBalancedArray` throws a `RangeError` for a non-integer `sum` (including `NaN` and `Infinity`); previously it returned an array whose total did not match `sum`.
* `engines.node` is now `>=22` (was `>=16`); Node.js 16, 18 and 20 are no longer supported.
* `SortableKey<T>` excludes optional keys and keys whose value may be `undefined`, so `sortBy`/`isSortedBy` by such a key no longer type-check; narrow the element type first, e.g. `items.filter((item): item is Item & Required<Pick<Item, 'label'>> => item.label !== undefined)`.
* `sortBy` returns a new array instead of sorting its input in place; code that relied on the argument being mutated must use the return value.
* `splitByKeyValue` groups by strict value (same-value-zero, like `Map`) instead of `String(value)`: `1` and `'1'` are separate groups, objects are grouped by reference, and groups are ordered by first appearance instead of `Object.values` key order.
* the package ships a single `dist/` entry (ESM + CJS) with an `exports` map; deep imports such as `@plq/array-functions/lib/sortBy` are no longer available.

### Miscellaneous Chores

* modernize toolchain, add Node/Bun CI matrix and refresh docs ([11e242d](https://github.com/Akurganow/array-functions/commit/11e242d4c308f01dec662d4ec9db23667fa75e80))

## [1.5.1](https://github.com/Akurganow/array-functions/compare/1.5.0...1.5.1) (2023-11-22)

## [1.5.0](https://github.com/Akurganow/array-functions/compare/1.4.0...1.5.0) (2023-11-21)


### Features

* add createBalancedArray function ([6916692](https://github.com/Akurganow/array-functions/commit/69166923de8868934539e393787eff1b66b78a9e))

## [1.4.0](https://github.com/Akurganow/array-functions/compare/1.3.0...1.4.0) (2023-11-20)


### Features

* add splitByKeyValue function ([d22309b](https://github.com/Akurganow/array-functions/commit/d22309b3772432a53195d90a6341227a1280107a))

## [1.3.0](https://github.com/Akurganow/array-functions/compare/1.2.0...1.3.0) (2023-10-10)


### Features

* Add getUniqueValues ([b20032e](https://github.com/Akurganow/array-functions/commit/b20032e22b4b2b9d30fcc56e31e6094aabc89393))


### Bug Fixes

* eslint errors ([aa2ce0c](https://github.com/Akurganow/array-functions/commit/aa2ce0c0352b6b269058935966960a4aff702f15))
* export Sortable types ([f11d1c7](https://github.com/Akurganow/array-functions/commit/f11d1c7f614141ac5983f1183bf30617460c82fe))

## [1.2.0](https://github.com/Akurganow/array-functions/compare/1.1.0...1.2.0) (2023-10-09)


### Features

* add filterBySameKeyValue ([70d8a17](https://github.com/Akurganow/array-functions/commit/70d8a175fa12bb96d763c4fdce7b721cec341e80))
* add getKeyValue ([fcf8f98](https://github.com/Akurganow/array-functions/commit/fcf8f98d241bb51ed568606fec018aa77e04449c))
* add sortBy ([0b82895](https://github.com/Akurganow/array-functions/commit/0b8289564d8435764e7921f1fba067aace4d3341))

## 1.1.0 (2023-10-09)


### Features

* Add isSortedBy ([9f808db](https://github.com/Akurganow/array-functions/commit/9f808dbc8f523963d1c86b31333a29ad36e06f01))


### Bug Fixes

* eslint indent error ([8f1f1fc](https://github.com/Akurganow/array-functions/commit/8f1f1fc2315f9845966a52a8faaed769e41b7936))
