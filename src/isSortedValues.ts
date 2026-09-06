import compareValues from './compareValues'
import { DEFAULT_ORDER } from './constants'
import type { SortableOrder, SortableValue } from './types'

/**
 * Checks whether an array of values is sorted in the given order.
 *
 * Equal neighbours are considered sorted, so `[1, 1, 2]` is sorted ascending.
 * Empty and single-element arrays are always sorted.
 * `NaN` never compares as sorted against a neighbour, so an array of two or more elements that contains `NaN`
 * is never considered sorted (a single-element array is). Values of unsupported types compare as equal.
 *
 * @param values The values to check.
 * @param order The expected sorting direction. Defaults to `'desc'`.
 * @returns `true` if the values are sorted.
 * @throws {TypeError} If two neighbouring values have different types.
 *
 * @example
 * isSortedValues([1, 2, 3], 'asc') // true
 * isSortedValues(['c', 'b', 'a']) // true
 * isSortedValues([1, 3, 2], 'asc') // false
 */
export default function isSortedValues<T extends SortableValue>(
	values: readonly T[],
	order: SortableOrder = DEFAULT_ORDER,
): boolean {
	for (let index = 1; index < values.length; index++) {
		const previous = values[index - 1]
		const current = values[index]

		// `undefined` is outside `T`, but a sparse array can still produce it at run time; it fails the type check like any other mismatch.
		if (previous === undefined || current === undefined || typeof current !== typeof previous) {
			throw new TypeError(
				`Types are not equal (${String(previous)}: ${typeof previous}, ${String(current)}: ${typeof current})`,
			)
		}

		// `NaN` cannot be ordered, so an array containing it is never sorted (matches 1.x).
		if (Number.isNaN(previous) || Number.isNaN(current) || compareValues(previous, current, order) > 0) {
			return false
		}
	}

	return true
}
