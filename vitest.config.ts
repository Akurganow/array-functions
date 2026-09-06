import { defineConfig, type ViteUserConfig } from 'vitest/config'

const config: ViteUserConfig = defineConfig({
	test: {
		include: ['__tests__/**/*.test.ts'],
		isolate: false,
		typecheck: {
			enabled: true,
			include: ['__tests__/**/*.test-d.ts'],
		},
		coverage: {
			provider: 'v8',
			include: ['src/**/*.ts'],
			reporter: ['text'],
			thresholds: {
				statements: 100,
				branches: 100,
				functions: 100,
				lines: 100,
			},
		},
	},
})

export default config
