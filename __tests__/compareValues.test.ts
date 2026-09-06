import { describe, expect, test } from 'vitest'
import compareValues from '../src/compareValues'

describe('compareValues', () => {
	test('compares numbers', () => {
		expect(compareValues(1, 2, 'asc')).toBeLessThan(0)
		expect(compareValues(2, 1, 'asc')).toBeGreaterThan(0)
		expect(compareValues(1, 2, 'desc')).toBeGreaterThan(0)
		expect(compareValues(2, 1, 'desc')).toBeLessThan(0)
		expect(compareValues(1, 1)).toBe(0)
	})

	test('compares strings', () => {
		expect(compareValues('a', 'b', 'asc')).toBeLessThan(0)
		expect(compareValues('b', 'a', 'asc')).toBeGreaterThan(0)
		expect(compareValues('a', 'b', 'desc')).toBeGreaterThan(0)
		expect(compareValues('b', 'a', 'desc')).toBeLessThan(0)
		expect(compareValues('a', 'a')).toBe(0)
	})

	test('defaults to descending order', () => {
		expect(compareValues(1, 2)).toBe(compareValues(1, 2, 'desc'))
		expect([1, 3, 2].sort(compareValues)).toEqual([3, 2, 1])
	})

	test('works as an Array.prototype.sort comparator', () => {
		expect(['b', 'c', 'a'].sort((a, b) => compareValues(a, b, 'asc'))).toEqual(['a', 'b', 'c'])
		expect([2, 3, 1].sort((a, b) => compareValues(a, b, 'desc'))).toEqual([3, 2, 1])
	})

	test('treats unsupported types as equal', () => {
		const a = {} as unknown as number
		const b = {} as unknown as number

		expect(compareValues(a, b)).toBe(0)
		expect(compareValues(true as unknown as number, false as unknown as number, 'asc')).toBe(0)
	})
})
