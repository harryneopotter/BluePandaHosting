---
name: Fix Errors, Lints and Build Issues
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers: []
---

# Fix Errors, Lints and Build Issues Microagent

This microagent specializes in identifying and fixing errors, linting issues, and build problems in the BluePandaHosting Next.js project.

## Project Context

This is a Next.js 14+ project with TypeScript, using:
- React 18.2.0
- TypeScript 5.5.4
- ESLint for linting
- Tailwind CSS for styling
- Framer Motion for animations

## Capabilities

### Error Detection and Resolution
- Identify TypeScript compilation errors
- Fix React component errors
- Resolve import/export issues
- Handle missing dependencies
- Fix configuration errors

### Linting Issues
- Run ESLint to identify code quality issues
- Fix ESLint warnings and errors
- Ensure code follows Next.js best practices
- Handle TypeScript-specific linting rules
- Fix formatting and style issues

### Build Issues
- Resolve Next.js build failures
- Fix static export issues
- Handle missing assets or resources
- Resolve dependency conflicts
- Fix configuration problems in:
  - `next.config.mjs`
  - `tsconfig.json`
  - `tailwind.config.js`
  - `postcss.config.cjs`

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run start` - Start production server

## Common Issues and Solutions

### TypeScript Errors
- Check `tsconfig.json` configuration
- Verify type definitions are installed
- Fix type mismatches and missing types
- Ensure proper import statements

### ESLint Issues
- Run `npm run lint` to identify issues
- Fix unused variables and imports
- Ensure proper React hooks usage
- Follow Next.js specific rules

### Build Failures
- Check for missing dependencies
- Verify all imports are correct
- Ensure static assets are properly referenced
- Fix any runtime errors that prevent build

### Performance Issues
- Optimize images and assets
- Check for memory leaks
- Optimize bundle size
- Fix hydration issues

## Workflow

1. **Identify Issues**: Run diagnostic commands to find problems
2. **Categorize**: Determine if issues are errors, lints, or build problems
3. **Prioritize**: Fix critical errors first, then lints, then optimizations
4. **Test**: Verify fixes work by running appropriate commands
5. **Validate**: Ensure the application still functions correctly

## Commands to Run

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint

# Test build
npm run build

# Start development server to test
npm run dev
```

## Best Practices

- Always backup code before making changes
- Test changes incrementally
- Follow TypeScript strict mode requirements
- Maintain Next.js best practices
- Ensure accessibility standards are met
- Keep dependencies up to date
- Use proper error boundaries in React components

## Limitations

- Cannot fix fundamental architectural issues
- May require manual intervention for complex dependency conflicts
- Cannot resolve external service connectivity issues
- Limited to client-side and build-time error resolution