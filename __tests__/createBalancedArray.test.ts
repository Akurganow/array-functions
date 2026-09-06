import { describe, expect, test } from 'vitest'
import createBalancedArray from '../src/createBalancedArray'

describe('createBalancedArray', () => {
	test('returns an array of the requested length', () => {
		expect(createBalancedArray(1, 1)).toEqual([1])
		expect(createBalancedArray(4, 10)).toHaveLength(4)
	})

	test('distributes the sum evenly', () => {
		expect(createBalancedArray(5, 10)).toEqual([2, 2, 2, 2, 2])
		expect(createBalancedArray(3, 10)).toEqual([4, 3, 3])
	})

	test('spreads the remainder from the start, one unit at a time', () => {
		const array = createBalancedArray(4, 10)

		expect(array).toEqual([3, 3, 2, 2])
		expect(Math.max(...array) - Math.min(...array)).toBeLessThanOrEqual(1)
	})

	test('handles a negative sum', () => {
		expect(createBalancedArray(3, -5)).toEqual([-2, -2, -1])
		expect(createBalancedArray(3, -2)).toEqual([-1, -1, 0])
		expect(createBalancedArray(4, -4)).toEqual([-1, -1, -1, -1])
		expect(createBalancedArray(1, -5)).toEqual([-5])
	})

	test('handles a sum of zero', () => {
		expect(createBalancedArray(3, 0)).toEqual([0, 0, 0])
	})

	test('never produces negative zero', () => {
		const array = createBalancedArray(5, -3)

		expect(array).toEqual([-1, -1, -1, 0, 0])
		expect(Object.is(array[3], 0)).toBe(true)
		expect(Object.is(array[4], 0)).toBe(true)
	})

	test('handles a sum smaller than the length', () => {
		expect(createBalancedArray(5, 3)).toEqual([1, 1, 1, 0, 0])
	})

	test('returns an empty array for a zero or negative length', () => {
		expect(createBalancedArray(0, 10)).toEqual([])
		expect(createBalancedArray(-4, 4)).toEqual([])
	})

	test('throws for a non-integer length', () => {
		expect(() => createBalancedArray(2.5, 10)).toThrow(RangeError)
		expect(() => createBalancedArray(Number.NaN, 10)).toThrow('Length must be an integer, received NaN.')
		expect(() => createBalancedArray(Number.POSITIVE_INFINITY, 10)).toThrow(RangeError)
	})

	test('throws for a non-integer sum', () => {
		expect(() => createBalancedArray(2, 1.5)).toThrow(RangeError)
		expect(() => createBalancedArray(3, Number.NaN)).toThrow('Sum must be an integer, received NaN.')
		expect(() => createBalancedArray(3, Number.POSITIVE_INFINITY)).toThrow(RangeError)
	})

	test('keeps the empty-array result for a non-positive length regardless of sum', () => {
		expect(createBalancedArray(0, 1.5)).toEqual([])
		expect(createBalancedArray(-1, Number.NaN)).toEqual([])
	})

	test('handles large differences between length and sum', () => {
		expect(createBalancedArray(13, 144)).toEqual([12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11])
		expect(createBalancedArray(3, 487)).toEqual([163, 162, 162])
	})

	test('keeps the sum for large inputs', () => {
		const length = 1000
		const sum = 1_000_000
		const array = createBalancedArray(length, sum)

		expect(array).toHaveLength(length)
		expect(array.reduce((total, value) => total + value, 0)).toBe(sum)
	})
})
