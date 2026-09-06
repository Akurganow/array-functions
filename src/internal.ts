import type { SortableKey } from './types'

/**
 * Reads the value of `key` from `item`, calling it with `item` as `this` when it is a getter function.
 * @internal
 */
export function resolveSortableValue<T extends object>(item: T, key: SortableKey<T>): unknown {
	const value = (item as Record<PropertyKey, unknown>)[key]

	return typeof value === 'function' ? (value as (this: T) => unknown).call(item) : value
}

/**
 * Returns `true` when `value` is a non-null object.
 * @internal
 */
export function isObject(value: unknown): value is object {
	return typeof value === 'object' && value !== null
}
