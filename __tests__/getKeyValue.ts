import getKeyValue from '../src/getKeyValue'

describe('getKeyValue', () => {
	test('getKeyValue', () => {
		const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
		const values = getKeyValue(items, 'id')

		expect(values).toEqual(['a', 'b', 'c'])
	})
})
