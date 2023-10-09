import { isObject } from '@plq/is'

type Sortable<T> = { [k in keyof T]: string | number | (() => string | number) }
type SortableKey<T> = T extends Sortable<T> ? keyof T : never
type SortableOrder = 'asc' | 'desc'

const defaultOrder: SortableOrder = 'desc'

function isSortedValues<T extends (string | number)>(values: T[], order: SortableOrder = defaultOrder): boolean {
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
