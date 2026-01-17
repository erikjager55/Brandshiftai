# Zod Installation Instructions

## Installation

To add Zod validation to the project, run:

```bash
npm install zod
```

or

```bash
yarn add zod
```

or

```bash
pnpm add zod
```

## What is Zod?

Zod is a TypeScript-first schema declaration and validation library. It provides:

- Runtime type checking
- Type inference for TypeScript
- Composable schemas
- Detailed error messages
- Zero dependencies

## Usage in this Project

Zod schemas are located in `/schemas/` and provide:

1. **Runtime Validation** - Validate data from localStorage before using it
2. **Type Safety** - Automatically infer TypeScript types from schemas
3. **Data Sanitization** - Clean and normalize data
4. **Error Handling** - Detailed validation error messages

## Example

```typescript
import { z } from 'zod';

// Define schema
const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
});

// Parse data (throws on invalid data)
const user = UserSchema.parse({ name: 'John', age: 30 });

// Safe parse (returns result object)
const result = UserSchema.safeParse({ name: 'John', age: -5 });
if (!result.success) {
  console.error(result.error);
}
```

## Status

✅ Schemas created in `/schemas/`
✅ Integrated in context providers
⏳ Zod needs to be installed to enable validation

Once installed, validation will automatically work!
