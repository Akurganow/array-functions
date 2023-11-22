export type Sortable<T> = { [k in keyof T]: string | number | (() => string | number) }
export type SortableKey<T> = T extends Sortable<T> ? keyof T : never
export type SortableOrder = 'asc' | 'desc'
