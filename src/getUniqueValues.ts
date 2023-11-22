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
export default function getUniqueValues<T extends { [k in string]: unknown }>(arr: T[], key: keyof T): T[keyof T][] {
	const uniqueValues = new Set<T[keyof T]>()

	arr.forEach(item => uniqueValues.add(item[key]))

	return Array.from(uniqueValues)
}
