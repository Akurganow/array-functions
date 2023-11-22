/**
 * Creates an array of a specified length where the sum of all elements equals a given sum.
 * The function distributes the sum evenly across the array elements.
 * - If the sum is negative, the function creates an array of negative numbers.
 * - If the sum cannot be evenly distributed, the function distributes the remainder as evenly as possible.
 * - If the length is zero or negative, the function returns an empty array.
 *
 * @param {number} length - The length of the array to be created.
 * @param {number} sum - The sum of all elements in the array.
 * @returns {number[]} An array of numbers.
 *
 * @example
 * createBalancedArray(5, 10); // Output: [2, 2, 2, 2, 2]
 * createBalancedArray(3, -5); // Output: [-2, -2, -1]
 */
export default function createBalancedArray(length: number, sum: number): number[] {
	if (length <= 0) {
		return []
	}

	const isNegativeSum = sum < 0
	const absoluteSum = Math.abs(sum)
	const baseValue = Math.floor(absoluteSum / length)
	const remainder = absoluteSum % length
	const array = new Array<number>(length)

	for (let i = 0; i < length; i++) {
		array[i] = baseValue + (i < remainder ? 1 : 0)

		if (isNegativeSum && array[i] > 0) {
			array[i] *= -1
		}
	}

	return array
}

