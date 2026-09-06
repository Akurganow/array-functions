/**
 * A predicate for `Array.prototype.filter` that keeps only the first object for each distinct value of the given key.
 *
 * Bind the key with an arrow function and pass the result to `filter`.
 *
 * @param value The current object.
 * @param index The index of the current object.
 * @param array The array being filtered.
 * @param key The key whose value must be unique.
 * @returns `true` if this is the first object in `array` with this value of `key`.
 *
 * @example
 * const array = [{ id: 1 }, { id: 2 }, { id: 1 }]
 * array.filter((value, index, all) => filterBySameKeyValue(value, index, all, 'id')) // [{ id: 1 }, { id: 2 }]
 */
export default function filterBySameKeyValue<T extends object>(
	value: T,
	index: number,
	array: readonly T[],
	key: keyof T,
): boolean {
	return index === array.findIndex(item => item[key] === value[key])
}
