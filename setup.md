# Frontend Setup Instructions

## Step 1: Install Dependencies

Run the following command in the `frontend` directory:

```bash
npm install
```

This will install all required packages:
- react, react-dom
- axios
- react-router-dom  
- react-hook-form
- zod
- tailwindcss, postcss, autoprefixer
- vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- fast-check

## Step 2: Enable Vitest Configuration

After npm install completes, uncomment the test configuration in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  test: {  // Uncomment these lines
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

## Step 3: Verify Setup

Run the development server to verify everything works:

```bash
npm run dev
```

You should see the Task Management System welcome page at `http://localhost:5173`

## Troubleshooting

If you encounter any issues:

1. **Module not found errors**: Make sure `npm install` completed successfully
2. **Port already in use**: Change the port in `vite.config.ts`
3. **Tailwind not working**: Verify `@tailwindcss/vite` plugin is configured in `vite.config.ts`
4. **Environment variables**: Check that `.env` file exists with `VITE_API_URL=http://localhost:3000`

## What's Been Configured

✅ Vite + React + TypeScript project structure  
✅ All required dependencies in package.json  
✅ Tailwind CSS v4 with Vite plugin  
✅ Environment variables (.env)  
✅ Vitest test configuration  
✅ Test setup file  
✅ Base application with Tailwind styling  
✅ TypeScript configuration  

## Next Steps

Once setup is complete, you can proceed with implementing the tasks from `.kiro/specs/task-management-frontend/tasks.md`
