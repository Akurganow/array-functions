import { describe, expect, test } from 'vitest'
import * as lib from '../src/index'

describe('package entry point', () => {
	test('exports every function', () => {
		expect(Object.keys(lib).sort()).toEqual([
			'DEFAULT_ORDER',
			'compareValues',
			'createBalancedArray',
			'filterBySameKeyValue',
			'getKeyValue',
			'getUniqueValues',
			'isSortedBy',
			'isSortedValues',
			'sortBy',
			'splitByKeyValue',
		])
	})

	test('exports the default order', () => {
		expect(lib.DEFAULT_ORDER).toBe('desc')
	})
})
