import { DEFAULT_ORDER } from './constants'
import { isObject, resolveSortableValue } from './internal'
import isSortedValues from './isSortedValues'
import type { SortableKey, SortableOrder, SortableValue } from './types'

/**
 * Checks whether an array of objects is sorted by the given key.
 *
 * When the value under `key` is a function it is called with the object as `this` and its return value is compared.
 * Empty and single-element arrays are always sorted.
 * `NaN` never compares as sorted against a neighbour, so an array of two or more elements that contains `NaN`
 * is never considered sorted (a single-element array is). Values of unsupported types compare as equal.
 *
 * @param array The objects to check.
 * @param key The key to compare by. Its value must be a `string`, a `number`, or a getter returning one.
 * @param order The expected sorting direction. Defaults to `'desc'`.
 * @returns `true` if the objects are sorted by `key`.
 * @throws {TypeError} If `array` contains a non-object, or if two neighbouring values have different types.
 *
 * @example
 * isSortedBy([{ id: 1 }, { id: 2 }], 'id', 'asc') // true
 * isSortedBy([{ id: 1 }, { id: 2 }], 'id') // false, the default order is 'desc'
 */
export default function isSortedBy<T extends object>(
	array: readonly T[],
	key: SortableKey<T>,
	order: SortableOrder = DEFAULT_ORDER,
): boolean {
	if (array.length <= 1) return true

	if (array.some(item => !isObject(item))) {
		throw new TypeError('Array is not an array of objects.')
	}

	const values = array.map(item => resolveSortableValue(item, key) as SortableValue)

	return isSortedValues(values, order)
}
