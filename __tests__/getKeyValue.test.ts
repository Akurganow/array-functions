import { describe, expect, test } from 'vitest'
import getKeyValue from '../src/getKeyValue'

describe('getKeyValue', () => {
	test('returns the values of the key in order', () => {
		const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]

		expect(getKeyValue(items, 'id')).toEqual(['a', 'b', 'c'])
	})

	test('keeps duplicates', () => {
		const items = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Alice' },
		]

		expect(getKeyValue(items, 'name')).toEqual(['Alice', 'Bob', 'Alice'])
	})

	test('returns an empty array for an empty input', () => {
		expect(getKeyValue([] as Array<{ id: number }>, 'id')).toEqual([])
	})

	test('does not modify the input', () => {
		const items = [{ id: 1 }, { id: 2 }]
		const snapshot = items.map(item => ({ ...item }))

		getKeyValue(items, 'id')

		expect(items).toEqual(snapshot)
	})
})
