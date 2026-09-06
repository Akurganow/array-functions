import { describe, expect, test } from 'vitest'
import getUniqueValues from '../src/getUniqueValues'

describe('getUniqueValues', () => {
	test('strings', () => {
		const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'a' }]

		expect(getUniqueValues(items, 'id')).toEqual(['a', 'b', 'c'])
	})

	test('numbers', () => {
		const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }]

		expect(getUniqueValues(items, 'id')).toEqual([1, 2, 3])
	})

	test('mixed types are distinct', () => {
		const items = [{ id: 'a' }, { id: 2 }, { id: 'c' }, { id: 1 }, { id: '1' }]

		expect(getUniqueValues(items, 'id')).toEqual(['a', 2, 'c', 1, '1'])
	})

	test('empty', () => {
		expect(getUniqueValues([] as Array<{ id: string }>, 'id')).toEqual([])
	})

	test('undefined and null', () => {
		expect(getUniqueValues([{ id: undefined }, { id: undefined }], 'id')).toEqual([undefined])
		expect(getUniqueValues([{ id: null }, { id: null }], 'id')).toEqual([null])
	})

	test('booleans', () => {
		const items = [{ id: true }, { id: false }, { id: true }]

		expect(getUniqueValues(items, 'id')).toEqual([true, false])
	})

	test('objects are distinct by reference', () => {
		const shared = { value: 1 }
		const items = [{ ref: shared }, { ref: { value: 1 } }, { ref: shared }]

		expect(getUniqueValues(items, 'ref')).toEqual([shared, { value: 1 }])
	})

	test('NaN is equal to NaN', () => {
		const items = [{ id: Number.NaN }, { id: Number.NaN }]

		expect(getUniqueValues(items, 'id')).toEqual([Number.NaN])
	})
})
