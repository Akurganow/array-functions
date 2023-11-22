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
export default function filterBySameKeyValue<T extends { [k in string]: unknown }>(value: T, index: number, array: T[], key: keyof T): boolean {
	return index === array.findIndex(v => v[key] === value[key])
}
