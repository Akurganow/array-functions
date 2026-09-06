/**
 * Runtime smoke test for the built package.
 *
 * Loads both the ESM and the CommonJS build from `dist/` and exercises every export.
 * Runs unchanged on Node.js and Bun so the same script verifies the package on every runtime:
 *
 *   node scripts/smoke.mjs
 *   bun scripts/smoke.mjs
 */
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const runtime = globalThis.Bun ? `Bun ${globalThis.Bun.version}` : `Node.js ${process.version}`

const builds = {
	esm: await import('../dist/index.js'),
	cjs: require('../dist/index.cjs'),
}

const people = [
	{ id: 2, name: 'Bob' },
	{ id: 3, name: 'Alice' },
	{ id: 1, name: 'Alice' },
]

for (const [format, lib] of Object.entries(builds)) {
	assert.deepEqual(
		lib.sortBy(people, 'id', 'asc').map(person => person.id),
		[1, 2, 3],
		`${format}: sortBy`,
	)
	assert.deepEqual(
		people.map(person => person.id),
		[2, 3, 1],
		`${format}: sortBy must not mutate its input`,
	)
	assert.equal(lib.isSortedBy(people, 'id'), false, `${format}: isSortedBy`)
	assert.equal(lib.isSortedValues([3, 2, 1]), true, `${format}: isSortedValues`)
	assert.equal(lib.compareValues('a', 'b', 'asc') < 0, true, `${format}: compareValues`)
	assert.deepEqual(lib.getKeyValue(people, 'name'), ['Bob', 'Alice', 'Alice'], `${format}: getKeyValue`)
	assert.deepEqual(lib.getUniqueValues(people, 'name'), ['Bob', 'Alice'], `${format}: getUniqueValues`)
	assert.deepEqual(
		lib.splitByKeyValue(people, 'name'),
		[[people[0]], [people[1], people[2]]],
		`${format}: splitByKeyValue`,
	)
	assert.deepEqual(
		people.filter((person, index, all) => lib.filterBySameKeyValue(person, index, all, 'name')),
		[people[0], people[1]],
		`${format}: filterBySameKeyValue`,
	)
	assert.deepEqual(lib.createBalancedArray(3, 10), [4, 3, 3], `${format}: createBalancedArray`)
	assert.equal(lib.DEFAULT_ORDER, 'desc', `${format}: DEFAULT_ORDER`)
}

console.log(`Smoke test passed on ${runtime} (esm, cjs)`)
