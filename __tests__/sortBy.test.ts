import getKeyValue from '../src/getKeyValue'
import sortBy from '../src/sortBy'

describe('sortBy', () => {
	test('empty', () => {
		const items: Array<{ id: string }> = []

		const sortedAsc = sortBy(items, 'id', 'asc')
		const sortedDesc = sortBy(items, 'id', 'desc')

		expect(sortedAsc).toEqual([])
		expect(sortedDesc).toEqual([])
	})
	test('string', () => {
		const items = [{ id: 'b' }, { id: 'c' }, { id: 'a' }]

		const sortedAsc = getKeyValue(sortBy(items, 'id', 'asc'), 'id')
		const sortedDesc = getKeyValue(sortBy(items, 'id', 'desc'), 'id')

		expect(sortedAsc).toEqual(['a', 'b', 'c'])
		expect(sortedDesc).toEqual(['c', 'b', 'a'])
	})
	test('number', () => {
		const items = [{ id: 2 }, { id: 3 }, { id: 1 }]

		const sortedAsc = getKeyValue(sortBy(items, 'id', 'asc'), 'id')
		const sortedDesc = getKeyValue(sortBy(items, 'id', 'desc'), 'id')

		expect(sortedAsc).toEqual([1, 2, 3])
		expect(sortedDesc).toEqual([3, 2, 1])
	})
	test('function:string', () => {
		const items = [{ id: () => 'b' }, { id: () => 'c' }, { id: () => 'a' }]

		const sortedAsc = sortBy(items, 'id', 'asc')
			.map(item => item.id())
		const sortedDesc = sortBy(items, 'id', 'desc')
			.map(item => item.id())

		expect(sortedAsc).toEqual(['a', 'b', 'c'])
		expect(sortedDesc).toEqual(['c', 'b', 'a'])
	})
	test('function:number', () => {
		const items = [{ id: () => 2 }, { id: () => 3 }, { id: () => 1 }]

		const sortedAsc = sortBy(items, 'id', 'asc')
			.map(item => item.id())
		const sortedDesc = sortBy(items, 'id', 'desc')
			.map(item => item.id())

		expect(sortedAsc).toEqual([1, 2, 3])
		expect(sortedDesc).toEqual([3, 2, 1])
	})
	test('mixed', () => {
		const items = [{ id: 'b' }, { id: 3 }, { id: 'a' }, { id: 2 }]

		expect(() => { sortBy(items, 'id') }).toThrow()
	})
	test('not a string or number', () => {
		const items = [{ id: {} }, { id: {} }]

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(sortBy(items, 'id')).toEqual(items)
	})
})
