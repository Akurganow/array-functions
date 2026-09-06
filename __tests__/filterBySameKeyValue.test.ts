import { describe, expect, test } from 'vitest'
import filterBySameKeyValue from '../src/filterBySameKeyValue'

describe('filterBySameKeyValue', () => {
	test('keeps the first object for each value of the key', () => {
		const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'a' }, { id: 'b' }, { id: 'c' }]

		const filtered = items.filter((item, index, all) => filterBySameKeyValue(item, index, all, 'id'))

		expect(filtered).toEqual([items[0], items[1], items[2]])
		expect(filtered[0]).toBe(items[0])
	})

	test('distinguishes values by strict equality', () => {
		const items = [{ id: 1 }, { id: '1' }, { id: 1 }]

		const filtered = items.filter((item, index, all) => filterBySameKeyValue(item, index, all, 'id'))

		expect(filtered).toEqual([{ id: 1 }, { id: '1' }])
	})

	test('works with a pre-bound key', () => {
		const byName = <T extends { name: string }>(item: T, index: number, all: T[]) =>
			filterBySameKeyValue(item, index, all, 'name')
		const items = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Alice' },
		]

		expect(items.filter(byName)).toEqual([
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
		])
	})

	test('keeps every object of an empty or unique array', () => {
		expect([].filter((item, index, all) => filterBySameKeyValue(item, index, all, 'id'))).toEqual([])

		const unique = [{ id: 1 }, { id: 2 }]

		expect(unique.filter((item, index, all) => filterBySameKeyValue(item, index, all, 'id'))).toEqual(unique)
	})
})
