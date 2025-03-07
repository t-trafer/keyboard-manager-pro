````markdown:README.md
# Keyboard Manager Pro

A React package for managing keyboard shortcuts and sequences, with TypeScript support and Next.js compatibility.

## Installation

```bash
npm install keyboard-manager-pro
````

## Features

- 🎯 Zero dependencies (except React)
- 📦 Fully typed with TypeScript
- 🔄 Compatible with Next.js
- ✅ Comprehensive test suite

## Usage

```tsx
import { useKeyboard } from 'keyboard-manager-pro';

function App() {
  // TODO: Add an example
}
```

## Development

This project uses:

- TypeScript for type safety
- Vitest for testing
- ESLint for linting
- Prettier for code formatting
- Changesets for version management
- Husky for git hooks
- Conventional Commits for commit messages

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/keyboard-manager-pro.git
cd keyboard-manager-pro
```

2. Install dependencies:

```bash
npm install
```

3. Start development:

```bash
npm run dev
```

### Available Scripts

- `npm run build` - Build the package
- `npm run dev` - Watch mode with tsup
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Contributing

1. Fork the repository
2. Create your feature branch:

```bash
git checkout -b feature/amazing-feature
```

3. Make your changes following our coding standards:

   - Write tests for new features
   - Follow the conventional commits specification
   - Run tests and linting before committing

4. Create a changeset to document your changes:

```bash
npx changeset
```

5. Commit your changes:

```bash
git commit -m "feat: add amazing feature"
```

6. Push to the branch:

```bash
git push origin feature/amazing-feature
```

7. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Examples:

- `feat: add new keyboard hook`
- `fix: resolve event listener memory leak`
- `docs: update API documentation`
- `chore: update dependencies`
- `refactor: improve hook performance`
- `test: add more test cases`

### Release Process

1. Changes are documented using Changesets
2. GitHub Actions automatically creates release PRs
3. Merging to main triggers automatic publishing
4. Versions follow semantic versioning

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

## License

MIT © [Nilesh]

---

<div align="center">
Made with ❤️ by [Nilesh]
</div>
```

This README:

1. Describes the package and its features
2. Provides installation and usage instructions
3. Details the development setup and workflow
4. Explains the contribution process
5. Documents the commit convention
6. Describes the release process
7. Includes testing and documentation information
