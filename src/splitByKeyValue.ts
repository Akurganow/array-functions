/**
 * Splits an array of objects into subarrays with the same value of the given key.
 * @template T The type of the object.
 * @param {T[]} arr The array of objects.
 * @param {keyof T} key The key to split by.
 * @returns {T[][]} An array of subarrays, where each subarray contains objects with the same value for the given key.
 *
 * @example
 * const array = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Alice' },
 * ];
 * splitByKeyValue(array, 'name'); // Output: [[{ id: 1, name: 'Alice' }, { id: 3, name: 'Alice' }], [{ id: 2, name: 'Bob' }]]
 */
export default function splitByKeyValue<T extends { [k in string]: unknown }>(arr: T[], key: keyof T): T[][] {
	const groups: { [key: string]: T[] } = {}

	arr.forEach(item => {
		const keyValue = String(item[key])

		if (!groups[keyValue]) {
			groups[keyValue] = []
		}

		groups[keyValue].push(item)
	})

	return Object.values(groups)
}
