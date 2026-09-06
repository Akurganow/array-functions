/**
 * Creates an array of `length` integers whose sum equals `sum`, distributing the sum as evenly as possible.
 *
 * - The remainder that cannot be split evenly is spread one unit at a time from the start of the array.
 * - A negative `sum` produces non-positive elements.
 * - A zero or negative `length` produces an empty array.
 *
 * @param length The number of elements. Must be an integer.
 * @param sum The sum of all elements. Must be an integer.
 * @returns The balanced array.
 * @throws {RangeError} If `length` or `sum` is not an integer.
 *
 * @example
 * createBalancedArray(5, 10) // [2, 2, 2, 2, 2]
 * createBalancedArray(3, 10) // [4, 3, 3]
 * createBalancedArray(3, -5) // [-2, -2, -1]
 * createBalancedArray(0, 10) // []
 */
export default function createBalancedArray(length: number, sum: number): number[] {
	if (!Number.isInteger(length)) {
		throw new RangeError(`Length must be an integer, received ${String(length)}.`)
	}

	if (length <= 0) {
		return []
	}

	if (!Number.isInteger(sum)) {
		throw new RangeError(`Sum must be an integer, received ${String(sum)}.`)
	}

	const sign = sum < 0 ? -1 : 1
	const absoluteSum = Math.abs(sum)
	const baseValue = Math.floor(absoluteSum / length)
	const remainder = absoluteSum % length

	return Array.from({ length }, (_, index) => {
		const value = baseValue + (index < remainder ? 1 : 0)

		// Multiplying keeps zero as `0` rather than `-0`.
		return value === 0 ? 0 : value * sign
	})
}
