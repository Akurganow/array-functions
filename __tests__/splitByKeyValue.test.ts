import { describe, expect, test } from 'vitest'
import splitByKeyValue from '../src/splitByKeyValue'

describe('splitByKeyValue', () => {
	test('groups objects by the value of the key', () => {
		const array = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Alice' },
		]

		expect(splitByKeyValue(array, 'name')).toEqual([
			[
				{ id: 1, name: 'Alice' },
				{ id: 3, name: 'Alice' },
			],
			[{ id: 2, name: 'Bob' }],
		])
	})

	test('orders groups by first appearance', () => {
		const array = [{ kind: 'b' }, { kind: 'a' }, { kind: 'b' }, { kind: 'c' }, { kind: 'a' }]

		expect(splitByKeyValue(array, 'kind').map(group => group[0]?.kind)).toEqual(['b', 'a', 'c'])
	})

	test('keeps values of different types apart', () => {
		const array = [{ id: 1 }, { id: '1' }, { id: 1 }, { id: null }, { id: 'null' }]

		expect(splitByKeyValue(array, 'id')).toEqual([
			[{ id: 1 }, { id: 1 }],
			[{ id: '1' }],
			[{ id: null }],
			[{ id: 'null' }],
		])
	})

	test('groups objects by reference', () => {
		const shared = { value: 1 }
		const array = [{ ref: shared }, { ref: { value: 1 } }, { ref: shared }]

		expect(splitByKeyValue(array, 'ref')).toEqual([[{ ref: shared }, { ref: shared }], [{ ref: { value: 1 } }]])
	})

	test('returns an empty array for an empty input', () => {
		expect(splitByKeyValue([] as Array<{ id: number }>, 'id')).toEqual([])
	})

	test('does not modify the input', () => {
		const array = [{ id: 1 }, { id: 2 }, { id: 1 }]
		const snapshot = array.map(item => ({ ...item }))

		splitByKeyValue(array, 'id')

		expect(array).toEqual(snapshot)
	})
})
