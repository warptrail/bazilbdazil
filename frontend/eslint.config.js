import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Lightweight enforcement for the styled-components-only contract.
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='style']",
          message: 'Inline styles are not allowed. Use styled-components and theme tokens.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/*.module.css', '**/*.module.scss', '**/*.module.sass'],
              message: 'CSS modules are not allowed in this project. Use styled-components.',
            },
            {
              group: ['tailwindcss', '**/tailwind.css', '**/tailwind*.css'],
              message: 'Tailwind is not allowed in this project. Use styled-components.',
            },
          ],
        },
      ],
    },
  },
])
