import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

import { fixupPluginRules } from '@eslint/compat';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			'@next/next': next,
			'react-hooks': fixupPluginRules(reactHooks),
			prettier: prettier,
			react: react,
		},
		rules: {
			// ...next.configs.recommended.rules,
			// ...next.configs['core-web-vitals'].rules,
			'prettier/prettier': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
		files: ['**/*.{js,cjs,mjs,jsx,ts,tsx}'],
	},
	{
		ignores: ['.next/*'],
	},
);
