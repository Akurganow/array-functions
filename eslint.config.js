import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'

export default [
	js.configs.recommended,
	...tseslint.configs['flat/recommended'],
	{
		files: ['src/**/*.ts'],
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'no-tabs': 'off',
			'@stylistic/block-spacing': ['error', 'always'],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/indent': ['error', 'tab'],
			'@typescript-eslint/ban-types': 'off'
		}
	},
	{
		files: ['__tests__/**/*.ts'],
		plugins: {
			'@stylistic': stylistic,
		},
		languageOptions: {
			globals: {
				describe: 'readonly',
				it: 'readonly',
				test: 'readonly',
				expect: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
				jest: 'readonly'
			}
		},
		rules: {
			'no-tabs': 'off',
			'@stylistic/block-spacing': ['error', 'always'],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/indent': ['error', 'tab'],
			'@typescript-eslint/ban-types': 'off'
		}
	}
]