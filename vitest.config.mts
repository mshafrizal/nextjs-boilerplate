/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        server: {
            deps: {
                inline: ['next-intl'], // https://next-intl.dev/docs/environments/testing#vitest
            },
        },
        exclude: [
            ...configDefaults.exclude,
            'messages/*',
            'docs/*',
            'e2e/*',
            'playwright-report/**/*',
            'public/**/*',
            '.scannerwork/**/*',
        ],
    },
});
