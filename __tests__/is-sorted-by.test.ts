import {isSortedBy} from "../src"

describe('isSortedBy', () => {
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
		const itemsAsc = [{id: () => 1}, {id: () => 2}, {id: () => 3}]
		const itemsDesc = [{id: () => 3}, {id: () => 2}, {id: () => 1}]
		const itemsUnsorted = [{id: () => 1}, {id: () => 3}, {id: () => 2}]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBeTruthy()
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBeTruthy()
		expect(isSortedBy(itemsUnsorted, 'id')).toBeFalsy()
	})
})
