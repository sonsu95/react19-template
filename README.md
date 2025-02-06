# React 19 Template

A modern web application template using the latest React 19 and TypeScript.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast build tool and development server
- ⚛️ [React 19](https://react.dev/) - Latest version of React
- 🎯 [TypeScript](https://www.typescriptlang.org/) - Type safety
- 🛣️ [@tanstack/react-router](https://tanstack.com/router) - Type-safe routing
- 🎨 [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- 📏 [ESLint](https://eslint.org/) - Code linting
- 💅 [Prettier](https://prettier.io/) - Code formatting
- 📦 [PNPM](https://pnpm.io/) - Fast and disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- PNPM 10.2.0 or higher

### Installation

```bash
# Install dependencies
pnpm install
```

### Development Server

```bash
# Start development server (http://localhost:5173)
pnpm dev
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Check code with ESLint
- `pnpm lint:fix` - Check and fix code with ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting with Prettier
- `pnpm fix` - Automatically fix lint and format issues

## Project Structure

```
react19-template/
├── src/               # Source code
├── public/            # Static files
├── index.html         # Entry point HTML
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json       # Project metadata and dependencies
```

## Expanding ESLint Configuration

For production applications, it's recommended to enable type-aware lint rules:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## License

This project is licensed under the MIT License.
