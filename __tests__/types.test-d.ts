import { describe, expectTypeOf, test } from 'vitest'
import type { SortableKey, SortableOrder } from '../src/index'
import { getKeyValue, getUniqueValues, isSortedBy, sortBy, splitByKeyValue } from '../src/index'

interface Person {
	id: number
	name: string
	createdAt: () => number
	tags: string[]
	optional?: string
}

describe('types', () => {
	test('SortableKey keeps only keys with sortable values', () => {
		expectTypeOf<SortableKey<Person>>().toEqualTypeOf<'id' | 'name' | 'createdAt'>()
		expectTypeOf<SortableKey<{ nested: { id: number } }>>().toEqualTypeOf<never>()
	})

	test('SortableOrder is a union of the two directions', () => {
		expectTypeOf<SortableOrder>().toEqualTypeOf<'asc' | 'desc'>()
	})

	test('sortBy and isSortedBy accept only sortable keys', () => {
		const people: Person[] = []

		expectTypeOf(sortBy(people, 'id')).toEqualTypeOf<Person[]>()
		expectTypeOf(sortBy(people, 'createdAt', 'asc')).toEqualTypeOf<Person[]>()
		expectTypeOf(isSortedBy(people, 'name')).toEqualTypeOf<boolean>()

		// @ts-expect-error `tags` is an array and cannot be sorted by
		sortBy(people, 'tags')
		// @ts-expect-error `optional` may be undefined and cannot be sorted by
		isSortedBy(people, 'optional')
		// @ts-expect-error unknown key
		sortBy(people, 'missing')
	})

	test('value readers infer the value type of the key', () => {
		const people: Person[] = []

		expectTypeOf(getKeyValue(people, 'id')).toEqualTypeOf<number[]>()
		expectTypeOf(getKeyValue(people, 'tags')).toEqualTypeOf<string[][]>()
		expectTypeOf(getUniqueValues(people, 'name')).toEqualTypeOf<string[]>()
		expectTypeOf(splitByKeyValue(people, 'name')).toEqualTypeOf<Person[][]>()
	})

	test('functions accept readonly arrays', () => {
		const people: readonly Person[] = []

		expectTypeOf(sortBy(people, 'id')).toEqualTypeOf<Person[]>()
		expectTypeOf(getKeyValue(people, 'id')).toEqualTypeOf<number[]>()
	})
})
