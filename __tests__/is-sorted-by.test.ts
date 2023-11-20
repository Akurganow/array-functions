import { isSortedBy } from '../src'

describe('isSortedBy', () => {
	test('empty', () => {
		const items: Array<{ id: string }> = []

		expect(isSortedBy(items, 'id')).toBeTruthy()
	})
	test('single', () => {
		const items = [{ id: 'a' }]

		expect(isSortedBy(items, 'id')).toBeTruthy()
	})
	test('same', () => {
		const items = [{ id: 'a' }, { id: 'a' }, { id: 'a' }]

		expect(isSortedBy(items, 'id')).toBeTruthy()
	})
	test('mixed types', () => {
		const items = [{ id: 'a' }, { id: 1 }, { id: 'c' }]

		expect(() => isSortedBy(items, 'id')).toThrowErrorMatchingInlineSnapshot('"Types are not equal (a: string, 1: number)"')
	})
	test('not an array of objects', () => {
		const items = ['a', 'b', 'c'] as unknown as Array<{ id: string }>

		expect(() => isSortedBy(items, 'id')).toThrowErrorMatchingInlineSnapshot('"Array is not an array of objects. (string)"')
	})
	test('string', () => {
		const itemsAsc = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
		const itemsDesc = [{ id: 'c' }, { id: 'b' }, { id: 'a' }]
		const itemsUnsorted = [{ id: 'a' }, { id: 'c' }, { id: 'b' }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBeTruthy()
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBeTruthy()
		expect(isSortedBy(itemsUnsorted, 'id')).toBeFalsy()
	})
	test('number', () => {
		const itemsAsc = [{ id: 1 }, { id: 2 }, { id: 3 }]
		const itemsDesc = [{ id: 3 }, { id: 2 }, { id: 1 }]
		const itemsUnsorted = [{ id: 1 }, { id: 3 }, { id: 2 }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBeTruthy()
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBeTruthy()
		expect(isSortedBy(itemsUnsorted, 'id')).toBeFalsy()
	})
	test('function:string', () => {
		const itemsAsc = [{ id: () => 'a' }, { id: () => 'b' }, { id: () => 'c' }]
		const itemsDesc = [{ id: () => 'c' }, { id: () => 'b' }, { id: () => 'a' }]
		const itemsUnsorted = [{ id: () => 'a' }, { id: () => 'c' }, { id: () => 'b' }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBeTruthy()
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBeTruthy()
		expect(isSortedBy(itemsUnsorted, 'id')).toBeFalsy()
	})
	test('function:number', () => {
		const itemsAsc = [{ id: () => 1 }, { id: () => 2 }, { id: () => 3 }]
		const itemsDesc = [{ id: () => 3 }, { id: () => 2 }, { id: () => 1 }]
		const itemsUnsorted = [{ id: () => 1 }, { id: () => 3 }, { id: () => 2 }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBeTruthy()
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBeTruthy()
		expect(isSortedBy(itemsUnsorted, 'id')).toBeFalsy()
	})
})
