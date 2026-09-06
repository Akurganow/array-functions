import compareValues from './compareValues'
import { DEFAULT_ORDER } from './constants'
import { resolveSortableValue } from './internal'
import type { SortableKey, SortableOrder, SortableValue } from './types'

/**
 * Returns a new array with the objects sorted by the given key.
 *
 * The input array is not modified. The sort is stable, so objects with equal values keep their relative order.
 * When the value under `key` is a function it is called with the object as `this` and its return value is compared.
 * `NaN` values compare equal to everything, so their position in the result is unspecified (as in 1.x).
 *
 * @param items The objects to sort.
 * @param key The key to sort by. Its value must be a `string`, a `number`, or a getter returning one.
 * @param order The sorting direction. Defaults to `'desc'`.
 * @returns A new, sorted array.
 * @throws {TypeError} If two compared values have different types.
 *
 * @example
 * sortBy([{ id: 2 }, { id: 1 }], 'id', 'asc') // [{ id: 1 }, { id: 2 }]
 * sortBy([{ id: 1 }, { id: 2 }], 'id') // [{ id: 2 }, { id: 1 }]
 */
export default function sortBy<T extends object>(
	items: readonly T[],
	key: SortableKey<T>,
	order: SortableOrder = DEFAULT_ORDER,
): T[] {
	return [...items].sort((a, b) => {
		const aValue = resolveSortableValue(a, key)
		const bValue = resolveSortableValue(b, key)

		if (typeof aValue !== typeof bValue) {
			throw new TypeError(`Types are not equal (a: ${typeof aValue}, b: ${typeof bValue})`)
		}

		return compareValues(aValue as SortableValue, bValue as SortableValue, order)
	})
}
