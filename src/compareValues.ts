import { SortableOrder } from './types'
import { DEFAULT_ORDER } from './constants'

/**
 * Compares two values.
 * @param {string | number} a The first value.
 * @param {string | number} b The second value.
 * @param {SortableOrder} [order='desc'] The order of sorting.
 * @returns {number} The result of the comparison.
 *
 * This function compares two values `a` and `b`. Depending on the type of these values, the function uses different comparison approaches:
 * - If the values are strings, the function uses the `localeCompare` method, which compares strings based on locale. This means that the strings are compared according to the sorting rules for the current language and region.
 * - If the values are numbers, the function simply subtracts one number from another. This gives a negative number if `a` is less than `b`, a positive number if `a` is greater than `b`, and zero if `a` and `b` are equal.
 * - If the values are of any other type, the function returns `0`.
 *
 * The function also takes into account the sorting order, which can be either 'asc' (ascending) or 'desc' (descending). If the sorting order is 'asc', the function returns the comparison result as is. If the sorting order is 'desc', the function returns the reverse comparison result.
 *
 * @example
 * ['a', 'b'].sort((a, b) => compareValues(a, b, 'asc')); // Output: ['b', 'a']
 */
export default function compareValues<T extends (string | number)>(a: T, b: T, order: SortableOrder = DEFAULT_ORDER): number {
	const type = typeof a

	switch (type) {
		case 'string':
			return order === 'asc'
				? (a as string).localeCompare(b as string)
				: (b as string).localeCompare(a as string)
		case 'number':
			return order === 'asc'
				? (a as number) - (b as number)
				: (b as number) - (a as number)
		default:
			return 0
	}
}
