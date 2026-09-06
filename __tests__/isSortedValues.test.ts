import { describe, expect, test } from 'vitest'
import isSortedValues from '../src/isSortedValues'

describe('isSortedValues', () => {
	test('empty', () => {
		expect(isSortedValues([])).toBe(true)
	})

	test('single', () => {
		expect(isSortedValues([1])).toBe(true)
	})

	test('same', () => {
		expect(isSortedValues([1, 1, 1])).toBe(true)
		expect(isSortedValues(['a', 'a'], 'asc')).toBe(true)
	})

	test('string', () => {
		expect(isSortedValues(['a', 'b', 'c'], 'asc')).toBe(true)
		expect(isSortedValues(['a', 'b', 'c'])).toBe(false)
		expect(isSortedValues(['c', 'b', 'a'], 'desc')).toBe(true)
		expect(isSortedValues(['a', 'c', 'b'])).toBe(false)
		expect(isSortedValues(['a', 'c', 'b'], 'asc')).toBe(false)
	})

	test('number', () => {
		expect(isSortedValues([1, 2, 3], 'asc')).toBe(true)
		expect(isSortedValues([1, 2, 3])).toBe(false)
		expect(isSortedValues([3, 2, 1], 'desc')).toBe(true)
		expect(isSortedValues([1, 3, 2])).toBe(false)
		expect(isSortedValues([1, 1, 2, 2, 3], 'asc')).toBe(true)
	})

	test('NaN is never sorted', () => {
		expect(isSortedValues([NaN, 1], 'asc')).toBe(false)
		expect(isSortedValues([1, NaN, 0], 'asc')).toBe(false)
		expect(isSortedValues([3, NaN, 5], 'desc')).toBe(false)
		expect(isSortedValues([1, 2, NaN], 'asc')).toBe(false)
		expect(isSortedValues([NaN, NaN])).toBe(false)
	})

	test('a single NaN is sorted like any single element', () => {
		expect(isSortedValues([NaN])).toBe(true)
	})

	test('infinities are ordered normally', () => {
		expect(isSortedValues([-Infinity, 0, Infinity], 'asc')).toBe(true)
		expect(isSortedValues([Infinity, Infinity])).toBe(true)
		expect(isSortedValues([Infinity, 1], 'desc')).toBe(true)
		expect(isSortedValues([1, Infinity], 'desc')).toBe(false)
	})

	test('mixed types', () => {
		const values = [1, 'a'] as unknown as number[]

		expect(() => isSortedValues(values)).toThrow(TypeError)
		expect(() => isSortedValues(values)).toThrow('Types are not equal (1: number, a: string)')
	})

	test('sparse arrays and undefined elements fail the type check', () => {
		const leadingHole = [undefined, 1, 2] as unknown as number[]
		const trailingHole = [1, 2, undefined] as unknown as number[]

		expect(() => isSortedValues(leadingHole, 'asc')).toThrow('Types are not equal (undefined: undefined, 1: number)')
		expect(() => isSortedValues(trailingHole, 'asc')).toThrow('Types are not equal (2: number, undefined: undefined)')
	})

	test('does not modify the input', () => {
		const values = [3, 1, 2]

		isSortedValues(values)

		expect(values).toEqual([3, 1, 2])
	})
})
