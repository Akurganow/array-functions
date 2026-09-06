import { defineConfig, type UserConfig } from 'tsdown'

const config: UserConfig = defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	platform: 'neutral',
	target: 'es2022',
	dts: true,
	sourcemap: true,
	clean: true,
	outDir: 'dist',
})

export default config
