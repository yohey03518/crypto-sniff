# Crypto-Sniff

A real-time cryptocurrency price monitoring application that connects to multiple crypto exchanges via WebSocket to track latest prices.

## Tech Stack

### Core Technologies
- **TypeScript** - Primary programming language for type-safe development
- **Node.js** - Runtime environment for executing JavaScript/TypeScript code

### Development Tools
- **pnpm** (v10.6.5) - Fast, disk space efficient package manager
- **ts-node** - TypeScript execution and REPL for Node.js
- **ESLint** & **TypeScript ESLint** - Code linting and style enforcement

### Project Structure
```
crypto-sniff/
├── src/           # Source code directory
│   └── main.ts    # Application entry point
├── dist/          # Compiled JavaScript output
├── package.json   # Project configuration and dependencies
└── tsconfig.json  # TypeScript configuration
```

### Build and Run Scripts
- `pnpm dev` - Run in development mode with hot-reload
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm start` - Run the compiled application
- `pnpm test` - Run tests (to be implemented)

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run in development mode:
   ```bash
   pnpm dev
   ```