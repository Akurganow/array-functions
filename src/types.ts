/** Sorting direction. */
export type SortableOrder = 'asc' | 'desc'

/** A primitive value that can be compared and sorted. */
export type SortableValue = string | number

/** A property that can be sorted by: a sortable value or a getter returning one. */
export type SortableProperty = SortableValue | (() => SortableValue)

/**
 * An object whose every property is sortable.
 * Kept for backwards compatibility; prefer {@link SortableKey} to constrain a single key.
 */
export type Sortable<T> = { [K in keyof T]: SortableProperty }

/**
 * The keys of `T` whose values are sortable (a `string`, a `number`, or a getter returning one).
 *
 * @example
 * type Key = SortableKey<{ id: number, name: string, tags: string[] }> // 'id' | 'name'
 */
export type SortableKey<T> = {
	[K in keyof T]-?: T[K] extends SortableProperty ? K : never
}[keyof T]
