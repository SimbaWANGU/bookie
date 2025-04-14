import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'


export default [
  {
    files: ['**/*.{ts,tsx}']
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'never'], // Disallow semicolons
      // Additional rules can go here
    }
  }
]