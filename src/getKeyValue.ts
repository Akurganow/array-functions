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
export default function getKeyValue<T extends { [k in string]: unknown }>(arr: T[], key: keyof T): T[keyof T][] {
	return arr.map(item => item[key])
}
