import { describe, expect, test } from 'vitest'
import getKeyValue from '../src/getKeyValue'
import sortBy from '../src/sortBy'

describe('sortBy', () => {
	test('empty', () => {
		const items: Array<{ id: string }> = []

		expect(sortBy(items, 'id', 'asc')).toEqual([])
		expect(sortBy(items, 'id', 'desc')).toEqual([])
	})

	test('string', () => {
		const items = [{ id: 'b' }, { id: 'c' }, { id: 'a' }]

		expect(getKeyValue(sortBy(items, 'id', 'asc'), 'id')).toEqual(['a', 'b', 'c'])
		expect(getKeyValue(sortBy(items, 'id', 'desc'), 'id')).toEqual(['c', 'b', 'a'])
	})

	test('number', () => {
		const items = [{ id: 2 }, { id: 3 }, { id: 1 }]

		expect(getKeyValue(sortBy(items, 'id', 'asc'), 'id')).toEqual([1, 2, 3])
		expect(getKeyValue(sortBy(items, 'id', 'desc'), 'id')).toEqual([3, 2, 1])
	})

	test('defaults to descending order', () => {
		const items = [{ id: 2 }, { id: 3 }, { id: 1 }]

		expect(getKeyValue(sortBy(items, 'id'), 'id')).toEqual([3, 2, 1])
	})

	test('function:string', () => {
		const items = [{ id: () => 'b' }, { id: () => 'c' }, { id: () => 'a' }]

		expect(sortBy(items, 'id', 'asc').map(item => item.id())).toEqual(['a', 'b', 'c'])
		expect(sortBy(items, 'id', 'desc').map(item => item.id())).toEqual(['c', 'b', 'a'])
	})

	test('function:number', () => {
		const items = [{ id: () => 2 }, { id: () => 3 }, { id: () => 1 }]

		expect(sortBy(items, 'id', 'asc').map(item => item.id())).toEqual([1, 2, 3])
		expect(sortBy(items, 'id', 'desc').map(item => item.id())).toEqual([3, 2, 1])
	})

	test('calls getters with the object as `this`', () => {
		const items = [
			{
				id: 2,
				rank() {
					return this.id
				},
			},
			{
				id: 3,
				rank() {
					return this.id
				},
			},
			{
				id: 1,
				rank() {
					return this.id
				},
			},
		]

		expect(getKeyValue(sortBy(items, 'rank', 'asc'), 'id')).toEqual([1, 2, 3])
	})

	test('does not modify the input array', () => {
		const items = [{ id: 2 }, { id: 3 }, { id: 1 }]
		const sorted = sortBy(items, 'id', 'asc')

		expect(sorted).not.toBe(items)
		expect(getKeyValue(items, 'id')).toEqual([2, 3, 1])
		expect(sorted[0]).toBe(items[2])
	})

	test('is stable', () => {
		const items = [
			{ id: 1, name: 'first' },
			{ id: 2, name: 'second' },
			{ id: 1, name: 'third' },
			{ id: 2, name: 'fourth' },
		]

		expect(getKeyValue(sortBy(items, 'id', 'asc'), 'name')).toEqual(['first', 'third', 'second', 'fourth'])
		expect(getKeyValue(sortBy(items, 'id', 'desc'), 'name')).toEqual(['second', 'fourth', 'first', 'third'])
	})

	test('sorts objects with extra, non-sortable properties', () => {
		const items = [
			{ id: 2, tags: ['b'], meta: { nested: true } },
			{ id: 1, tags: ['a'], meta: { nested: false } },
		]

		expect(getKeyValue(sortBy(items, 'id', 'asc'), 'id')).toEqual([1, 2])
	})

	test('mixed', () => {
		const items = [{ id: 'b' }, { id: 3 }, { id: 'a' }, { id: 2 }] as unknown as Array<{ id: string }>

		expect(() => sortBy(items, 'id')).toThrow(TypeError)
		expect(() => sortBy(items, 'id')).toThrow('Types are not equal')
	})

	test('not a string or number', () => {
		const items = [{ id: {} }, { id: {} }]

		// @ts-expect-error `id` is not a sortable key
		expect(sortBy(items, 'id')).toEqual(items)
	})
})
