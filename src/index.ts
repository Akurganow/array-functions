import { isObject } from '@plq/is'

export type Sortable<T> = { [k in keyof T]: string | number | (() => string | number) }
export type SortableKey<T> = T extends Sortable<T> ? keyof T : never
export type SortableOrder = 'asc' | 'desc'

const defaultOrder: SortableOrder = 'desc'

export function filterBySameKeyValue<T extends { [k in string]: unknown }>(value: T, index: number, array: T[], key: keyof T) {
	return index === array.findIndex(v => v[key] === value[key])
}

export function compareValues<T extends (string | number)>(a: T, b: T, order: SortableOrder = defaultOrder): number {
	switch (typeof a) {
		case 'string':
			return order === 'asc'
				? (a as string).localeCompare(b as string)
				: (b as string).localeCompare(a as string)
		case 'number':
			return order === 'asc'
				? (a as number) - (b as number)
				: (b as number) - (a as number)
		default:
			return 0
	}
}


export function sortBy<T extends Sortable<T>>(items: T[], key: SortableKey<T>, order: SortableOrder = defaultOrder) {
	if (items.length <= 1) return items

	return items.sort((a, b) => {
		if (typeof a[key] !== typeof b[key]) throw new Error(`Types are not equal (a: ${typeof a[key]}, b: ${typeof b[key]})`)

		let aValue = a[key] as string | number
		let bValue = b[key] as string | number

		if (typeof aValue === 'function' && typeof bValue === 'function') {
			aValue = (aValue as (() => string | number))()
			bValue = (bValue as (() => string | number))()
		}

		return compareValues(aValue, bValue, order)
	})
}

export function isSortedValues<T extends (string | number)>(values: T[], order: SortableOrder = defaultOrder): boolean {
	if (values.length === 0) return true

	return values.every((value, index, valuesArray) => {
		if (index === 0) return true

		if (typeof value !== typeof valuesArray[index - 1]) throw new Error(`Types are not equal (a: ${typeof value}, b: ${typeof valuesArray[index - 1]})`)

		const prevValue = valuesArray[index - 1]

		switch (typeof value) {
			case 'string':
				return order === 'asc'
					? (value as string).localeCompare(prevValue as unknown as string) >= 0
					: (prevValue as unknown as string).localeCompare(value as string) >= 0
			case 'number':
				return order === 'asc'
					? (value as number) >= (prevValue as unknown as number)
					: (prevValue as unknown as number) >= (value as number)
		}
	})
}

export function isSortedBy<T extends Sortable<T>>(array: T[], key: SortableKey<T>, order: SortableOrder = defaultOrder) {
	if (array.length <= 1) return true

	if (!isObject(array[0])) throw new Error(`Array is not an array of objects. (${typeof array[0]})`)

	const mapped = (array as Sortable<T>[])
		.map(item => {
			if (typeof item[key] === 'function') {
				return (item[key] as (() => string | number))() as string | number
			} else {
				return item[key] as unknown as string | number
			}
		})

	return isSortedValues(mapped, order)
}

export function getKeyValue<T extends object>(arr: T[], key: keyof T): T[keyof T][] {
	return arr.map(item => item[key])
}
