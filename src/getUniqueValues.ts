/**
 * Returns the distinct values of the given key from an array of objects.
 *
 * Values are compared with the same-value-zero algorithm used by `Set`, so objects are distinct by reference
 * and `NaN` is equal to `NaN`. The first occurrence of each value decides its position in the result.
 *
 * @param arr The objects to read from.
 * @param key The key to read.
 * @returns The distinct values, in order of first appearance.
 *
 * @example
 * getUniqueValues([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }], 'name') // ['Alice', 'Bob']
 */
export default function getUniqueValues<T extends object, K extends keyof T>(arr: readonly T[], key: K): T[K][] {
	return [...new Set(arr.map(item => item[key]))]
}
