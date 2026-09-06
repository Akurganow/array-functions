import { describe, expect, test } from 'vitest'
import isSortedBy from '../src/isSortedBy'

describe('isSortedBy', () => {
	test('empty', () => {
		expect(isSortedBy([] as Array<{ id: string }>, 'id')).toBe(true)
	})

	test('single', () => {
		expect(isSortedBy([{ id: 'a' }], 'id')).toBe(true)
	})

	test('same', () => {
		const items = [{ id: 'a' }, { id: 'a' }, { id: 'a' }]

		expect(isSortedBy(items, 'id')).toBe(true)
		expect(isSortedBy(items, 'id', 'asc')).toBe(true)
	})

	test('mixed types', () => {
		const items = [{ id: 'a' }, { id: 1 }, { id: 'c' }] as unknown as Array<{ id: string }>

		expect(() => isSortedBy(items, 'id')).toThrow(TypeError)
		expect(() => isSortedBy(items, 'id')).toThrow('Types are not equal (a: string, 1: number)')
	})

	test('not an array of objects', () => {
		const items = ['a', 'b', 'c'] as unknown as Array<{ id: string }>

		expect(() => isSortedBy(items, 'id')).toThrow(TypeError)
		expect(() => isSortedBy(items, 'id')).toThrow('Array is not an array of objects.')
	})

	test('string', () => {
		const itemsAsc = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
		const itemsDesc = [{ id: 'c' }, { id: 'b' }, { id: 'a' }]
		const itemsUnsorted = [{ id: 'a' }, { id: 'c' }, { id: 'b' }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBe(true)
		expect(isSortedBy(itemsAsc, 'id')).toBe(false)
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBe(true)
		expect(isSortedBy(itemsUnsorted, 'id')).toBe(false)
		expect(isSortedBy(itemsUnsorted, 'id', 'asc')).toBe(false)
	})

	test('number', () => {
		const itemsAsc = [{ id: 1 }, { id: 2 }, { id: 3 }]
		const itemsDesc = [{ id: 3 }, { id: 2 }, { id: 1 }]
		const itemsUnsorted = [{ id: 1 }, { id: 3 }, { id: 2 }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBe(true)
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBe(true)
		expect(isSortedBy(itemsUnsorted, 'id')).toBe(false)
	})

	test('function:string', () => {
		const itemsAsc = [{ id: () => 'a' }, { id: () => 'b' }, { id: () => 'c' }]
		const itemsDesc = [{ id: () => 'c' }, { id: () => 'b' }, { id: () => 'a' }]
		const itemsUnsorted = [{ id: () => 'a' }, { id: () => 'c' }, { id: () => 'b' }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBe(true)
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBe(true)
		expect(isSortedBy(itemsUnsorted, 'id')).toBe(false)
	})

	test('function:number', () => {
		const itemsAsc = [{ id: () => 1 }, { id: () => 2 }, { id: () => 3 }]
		const itemsDesc = [{ id: () => 3 }, { id: () => 2 }, { id: () => 1 }]
		const itemsUnsorted = [{ id: () => 1 }, { id: () => 3 }, { id: () => 2 }]

		expect(isSortedBy(itemsAsc, 'id', 'asc')).toBe(true)
		expect(isSortedBy(itemsDesc, 'id', 'desc')).toBe(true)
		expect(isSortedBy(itemsUnsorted, 'id')).toBe(false)
	})

	test('calls getters with the object as `this`', () => {
		const items = [
			{
				id: 1,
				rank() {
					return this.id
				},
			},
			{
				id: 2,
				rank() {
					return this.id
				},
			},
		]

		expect(isSortedBy(items, 'rank', 'asc')).toBe(true)
		expect(isSortedBy(items, 'rank')).toBe(false)
	})

	test('NaN is never sorted', () => {
		expect(isSortedBy([{ id: NaN }, { id: 1 }], 'id', 'asc')).toBe(false)
		expect(isSortedBy([{ id: 1 }, { id: NaN }, { id: 0 }], 'id', 'asc')).toBe(false)
		expect(isSortedBy([{ id: () => NaN }, { id: () => 1 }], 'id')).toBe(false)
		expect(isSortedBy([{ id: NaN }], 'id')).toBe(true)
	})

	test('objects with extra, non-sortable properties', () => {
		const items = [
			{ id: 1, tags: ['a'] },
			{ id: 2, tags: [] },
		]

		expect(isSortedBy(items, 'id', 'asc')).toBe(true)
	})
})
