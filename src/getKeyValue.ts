/**
 * Returns the values of the given key from an array of objects.
 *
 * @param arr The objects to read from.
 * @param key The key to read.
 * @returns The values, in the same order as the objects.
 *
 * @example
 * getKeyValue([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], 'name') // ['Alice', 'Bob']
 */
export default function getKeyValue<T extends object, K extends keyof T>(arr: readonly T[], key: K): T[K][] {
	return arr.map(item => item[key])
}
