import { Sortable, SortableKey, SortableOrder } from './types'
import { DEFAULT_ORDER } from './constants'
import { isFunction, isObject } from '@plq/is'

import isSortedValues from './isSortedValues'

/**
 * Checks if an array of objects is sorted by a given key.
 * @template T The type of the object.
 * @param {T[]} array The array of objects.
 * @param {SortableKey<T>} key The key to check by.
 * @param {SortableOrder} [order='desc'] The order of sorting.
 * @returns {boolean} Whether the array is sorted by the key.
 *
 * @example
 * isSortedBy([{ id: 1 }, { id: 2 }], 'id', 'asc'); // Output: true
 */
export default function isSortedBy<T extends Sortable<T>>(array: T[], key: SortableKey<T>, order: SortableOrder = DEFAULT_ORDER): boolean {
	if (array.length <= 1) return true

	if (array.some(item => !isObject(item))) throw new Error('Array is not an array of objects.')

	const mapped = (array as Sortable<T>[])
		.map(item => {
			if (isFunction(item[key])) {
				return (item[key] as (() => string | number))() as string | number
			} else {
				return item[key] as unknown as string | number
			}
		})

	return isSortedValues(mapped, order)
}
