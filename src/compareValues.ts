import { DEFAULT_ORDER } from './constants'
import type { SortableOrder, SortableValue } from './types'

/**
 * Compares two values of the same type, for use as an `Array.prototype.sort` comparator.
 *
 * - Strings are compared with `localeCompare`, so ordering follows the rules of the current locale.
 * - Numbers are compared arithmetically.
 * - Values of any other type are considered equal and `0` is returned.
 *
 * With `order` set to `'asc'` the natural comparison result is returned; with `'desc'` it is reversed.
 *
 * @param a The first value.
 * @param b The second value.
 * @param order The sorting direction. Defaults to `'desc'`.
 * @returns A negative number if `a` should come before `b`, a positive number if after, and `0` if they are equal.
 *
 * @example
 * ['a', 'c', 'b'].sort((a, b) => compareValues(a, b, 'asc')) // ['a', 'b', 'c']
 * [1, 3, 2].sort((a, b) => compareValues(a, b)) // [3, 2, 1]
 */
export default function compareValues<T extends SortableValue>(
	a: T,
	b: T,
	order: SortableOrder = DEFAULT_ORDER,
): number {
	const [first, second] = order === 'asc' ? [a, b] : [b, a]

	if (typeof first === 'string' && typeof second === 'string') {
		return first.localeCompare(second)
	}

	if (typeof first === 'number' && typeof second === 'number') {
		return first - second
	}

	return 0
}
