import { SortableOrder } from './types'
import { DEFAULT_ORDER } from './constants'

/**
 * Checks if an array of values is sorted.
 * @template T The type of the values.
 * @param {T[]} values The array of values.
 * @param {SortableOrder} [order='desc'] The order of sorting.
 * @returns {boolean} Whether the array is sorted.
 *
 * @example
 * isSortedValues([1, 2, 3], 'asc'); // Output: true
 */
export default function isSortedValues<T extends (string | number)>(values: T[], order: SortableOrder = DEFAULT_ORDER): boolean {
	if (values.length === 0) return true

	return values.every((value, index, valuesArray) => {
		if (index === 0) return true

		if (typeof value !== typeof valuesArray[index - 1]) throw new Error(`Types are not equal (${valuesArray[index - 1]}: ${typeof valuesArray[index - 1]}, ${value}: ${typeof value})`)

		const prevValue = valuesArray[index - 1]

		switch (typeof value) {
			case 'string':
				return order === 'asc'
					? (value as string).localeCompare(prevValue as unknown as string) >= 0
					: (prevValue as unknown as string).localeCompare(value as string) >= 0
			case 'number':
				return order === 'asc'
					? (value as number) >= (prevValue as unknown as number)
					: (prevValue as unknown as number) >= (value as number)
		}
	})
}
