import filterBySameKeyValue from '../src/filterBySameKeyValue'

describe('filterBySameValue', () => {
	test('should filter by same value', () => {
		function filterBySameId<T extends { id: string }>(item: T, index: number, array: T[]) {
			return filterBySameKeyValue<T>(item, index, array, 'id')
		}

		const items = [
			{ id: 'a' },
			{ id: 'b' },
			{ id: 'c' },
			{ id: 'a' },
			{ id: 'b' },
			{ id: 'c' },
		]

		const filtered = items.filter(filterBySameId)

		expect(filtered).toHaveLength(3)
		expect(filtered).toContain(items[0])
		expect(filtered).toContain(items[1])
		expect(filtered).toContain(items[2])
		expect(filtered).not.toContain(items[3])
		expect(filtered).not.toContain(items[4])
		expect(filtered).not.toContain(items[5])
	})
})
