# Padma Web Booking - Project Folder Structure

This document outlines the folder structure of the Padma Web Booking project, a Next.js application with internationalization support.

## Root Directory

- `.env.example` - Example environment variables
- `.env.local` - Local environment variables
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Git ignore rules
- `.prettierignore` - Prettier ignore rules
- `.prettierrc` - Prettier configuration
- `README.md` - Project documentation
- `components.json` - Component configuration
- `eslint.config.mjs` - ESLint configuration
- `middleware.ts` - Next.js middleware (likely for i18n)
- `next-env.d.ts` - Next.js TypeScript declarations
- `next.config.ts` - Next.js configuration
- `package.json` - Project dependencies and scripts
- `playwright.config.ts` - Playwright (E2E testing) configuration
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `vitest.config.mts` - Vitest (unit testing) configuration

## Main Directories

### `/app`

Contains the application pages and routes using Next.js App Router.

- `/app/[locale]` - Dynamic route for internationalization
    - `/app/[locale]/layout.tsx` - Layout component for all pages under this locale
    - `/app/[locale]/page.tsx` - Main page component for the locale's root route
    - `/app/[locale]/profile` - Profile-related pages
        - `/app/[locale]/profile/page.tsx` - Profile page component
- `/app/globals.css` - Global CSS styles
- `/app/favicon.ico` - Website favicon

### `/components`

Contains reusable UI components.

- `/components/ui` - UI components
    - `button.tsx` - Button component
    - `card.tsx` - Card component
    - `dialog.tsx` - Dialog/modal component
    - `input.tsx` - Input field component
    - `label.tsx` - Label component
    - `locale-switcher-select.tsx` - Language selector dropdown
    - `locale-switcher.tsx` - Language switcher component

### `/i18n`

Contains internationalization configuration and utilities.

- `navigation.ts` - Internationalized navigation utilities
- `request.ts` - Internationalized API request utilities
- `routing.ts` - Internationalized routing utilities

### `/lib`

Contains utility functions and libraries.

- `auth.ts` - Authentication utilities
- `utils.ts` - General utility functions

### `/messages`

Contains translation files for different languages.

- `de.json` - German translations
- `en.json` - English translations
- `id.json` - Indonesian translations

### `/public`

Contains static assets accessible via the web.

- `file.svg` - File icon
- `globe.svg` - Globe icon
- `next.svg` - Next.js logo
- `vercel.svg` - Vercel logo
- `window.svg` - Window icon

### `/store`

Contains state management logic.

- `auth.ts` - Authentication state management

### `/__tests__`

Contains test files for unit testing.

### `/e2e`

Contains end-to-end test files using Playwright.

## Project Structure Overview

This project follows a typical Next.js application structure with App Router and internationalization support. The code is organized by feature and type, with clear separation of concerns:

- **Pages and Routes**: Located in the `/app` directory, following Next.js App Router conventions
- **UI Components**: Located in the `/components` directory, separated by type
- **Internationalization**: Configuration in `/i18n` and translations in `/messages`
- **Utilities and Services**: Located in the `/lib` directory
- **State Management**: Located in the `/store` directory
- **Static Assets**: Located in the `/public` directory
- **Testing**: Unit tests in `/__tests__` and E2E tests in `/e2e`

The project uses TypeScript for type safety and follows modern React patterns with a focus on component reusability and internationalization.
