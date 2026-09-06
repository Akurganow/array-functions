/**
 * Groups an array of objects into sub-arrays that share the same value of the given key.
 *
 * Values are compared with the same-value-zero algorithm used by `Map`, so `1` and `'1'` land in different groups
 * and objects are grouped by reference. Groups are ordered by the first appearance of their value, and objects keep
 * their relative order inside a group.
 *
 * @param arr The objects to group.
 * @param key The key to group by.
 * @returns An array of groups.
 *
 * @example
 * splitByKeyValue([
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Alice' },
 * ], 'name')
 * // [[{ id: 1, name: 'Alice' }, { id: 3, name: 'Alice' }], [{ id: 2, name: 'Bob' }]]
 */
export default function splitByKeyValue<T extends object, K extends keyof T>(arr: readonly T[], key: K): T[][] {
	const groups = new Map<T[K], T[]>()

	for (const item of arr) {
		const value = item[key]
		const group = groups.get(value)

		if (group) {
			group.push(item)
		} else {
			groups.set(value, [item])
		}
	}

	return [...groups.values()]
}
