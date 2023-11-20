import { isObject } from '@plq/is'

export type Sortable<T> = { [k in keyof T]: string | number | (() => string | number) }
export type SortableKey<T> = T extends Sortable<T> ? keyof T : never
export type SortableOrder = 'asc' | 'desc'

const defaultOrder: SortableOrder = 'desc'

/**
 * Filters an array of objects so that the value of a given key occurs only once in the array.
 * @template T The type of the object.
 * @param {T} value The current value.
 * @param {number} index The index of the current value.
 * @param {T[]} array The array of objects.
 * @param {keyof T} key The key to filter by.
 * @returns {boolean} Whether the value is the first occurrence of the key's value in the array.
 *
 * @example
 * const array = [{ id: 1 }, { id: 2 }, { id: 1 }];
 * const filtered = array.filter((value, index, array) => filterBySameKeyValue(value, index, array, 'id'));
 * // filtered: [{ id: 1 }, { id: 2 }]
 */
export function filterBySameKeyValue<T extends { [k in string]: unknown }>(value: T, index: number, array: T[], key: keyof T): boolean {
	return index === array.findIndex(v => v[key] === value[key])
}

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
export function compareValues<T extends (string | number)>(a: T, b: T, order: SortableOrder = defaultOrder): number {
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
export function sortBy<T extends Sortable<T>>(items: T[], key: SortableKey<T>, order: SortableOrder = defaultOrder): T[] {
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
export function isSortedValues<T extends (string | number)>(values: T[], order: SortableOrder = defaultOrder): boolean {
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
export function isSortedBy<T extends Sortable<T>>(array: T[], key: SortableKey<T>, order: SortableOrder = defaultOrder): boolean {
	if (array.length <= 1) return true

	if (!isObject(array[0])) throw new Error(`Array is not an array of objects. (${typeof array[0]})`)

	const mapped = (array as Sortable<T>[])
		.map(item => {
			if (typeof item[key] === 'function') {
				return (item[key] as (() => string | number))() as string | number
			} else {
				return item[key] as unknown as string | number
			}
		})

	return isSortedValues(mapped, order)
}

/**
 * Returns the array of values of a given key from an array of objects.
 * @template T The type of the object.
 * @param {T[]} arr The array of objects.
 * @param {keyof T} key The key to get values by.
 * @returns {T[keyof T][]} The array of values.
 *
 * @example
 * const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * getKeyValue(array, 'name'); // Output: ['Alice', 'Bob']
 */
export function getKeyValue<T extends { [k in string]: unknown }>(arr: T[], key: keyof T): T[keyof T][] {
	return arr.map(item => item[key])
}

/**
 * Returns an array of unique values from an array of objects.
 * @template T The type of the object.
 * @param {T[]} arr The array of objects.
 * @param {keyof T} key The key to get unique values by.
 * @returns {T[keyof T][]} The array of unique values.
 *
 * @example
 * const array = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Alice' }];
 * getUniqueValues(array, 'name'); // Output: ['Alice']
 */
export function getUniqueValues<T extends { [k in string]: unknown }>(arr: T[], key: keyof T): T[keyof T][] {
	const uniqueValues = new Set<T[keyof T]>()
	arr.forEach(item => uniqueValues.add(item[key]))

	return Array.from(uniqueValues)
}
