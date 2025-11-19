# Tailwind CSS v4 Configuration

## What Changed

The project has been updated to use **Tailwind CSS v4** instead of v3. This is the latest version with a simplified configuration approach.

## Key Differences from v3

### 1. No Config Files Needed ✅
- ❌ Removed `tailwind.config.js`
- ❌ Removed `postcss.config.js`
- ✅ Tailwind v4 uses a zero-config approach

### 2. Vite Plugin
- Uses `@tailwindcss/vite` plugin directly in `vite.config.ts`
- No need for PostCSS configuration

### 3. CSS Import
**Old (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**New (v4):**
```css
@import 'tailwindcss';
```

## Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // Tailwind v4 plugin
  ],
  // ... rest of config
})
```

### src/index.css
```css
@import 'tailwindcss';

/* Your custom styles */
```

## Dependencies

**package.json:**
```json
{
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
```

## Installation

After running `npm install`, Tailwind v4 will be ready to use with no additional configuration needed.

```bash
npm install
```

## Usage

All Tailwind utility classes work exactly the same as v3:

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind v4!
</div>
```

## Benefits of v4

1. **Simpler Setup** - No config files needed
2. **Faster Build Times** - Optimized engine
3. **Better DX** - Integrated with Vite
4. **Automatic Content Detection** - No need to specify content paths

## Customization (Optional)

If you need custom configuration, you can create a `tailwind.config.ts` file, but it's optional in v4.

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 with Vite](https://tailwindcss.com/docs/installation/using-vite)

---

**Status:** ✅ Configured and ready to use after `npm install`
