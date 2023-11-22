import { Sortable, SortableKey, SortableOrder } from './types'
import { DEFAULT_ORDER } from './constants'
import compareValues from './compareValues'

/**
 * Sorts an array of objects by a given key.
 * @template T The type of the object.
 * @param {T[]} items The array of objects.
 * @param {SortableKey<T>} key The key to sort by.
 * @param {SortableOrder} [order='desc'] The order of sorting.
 * @returns {T[]} The sorted array.
 *
 * @example
 * sortBy([{ id: 2 }, { id: 1 }], 'id', 'asc'); // Output: [{ id: 1 }, { id: 2 }]
 */
export default function sortBy<T extends Sortable<T>>(items: T[], key: SortableKey<T>, order: SortableOrder = DEFAULT_ORDER): T[] {
	if (items.length <= 1) return items

	return items.sort((a, b) => {
		if (typeof a[key] !== typeof b[key]) throw new Error(`Types are not equal (a: ${typeof a[key]}, b: ${typeof b[key]})`)

		let aValue = a[key] as string | number
		let bValue = b[key] as string | number

		if (typeof aValue === 'function' && typeof bValue === 'function') {
			aValue = (aValue as (() => string | number))()
			bValue = (bValue as (() => string | number))()
		}

		return compareValues(aValue, bValue, order)
	})
}
