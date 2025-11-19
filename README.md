# Task Management Frontend

A React + TypeScript frontend application for the task management system.

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This will install all required dependencies including:
- React & React DOM
- Axios (HTTP client)
- React Router DOM (routing)
- React Hook Form (form handling)
- Zod (validation)
- Tailwind CSS v4 (styling)
- Vitest & Testing Library (testing)
- fast-check (property-based testing)

### 2. Environment Variables

The `.env` file is already configured with:
```
VITE_API_URL=http://localhost:3000
```

Update this if your backend API runs on a different port.

### 3. Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build

Create a production build:
```bash
npm run build
```

### 5. Testing

Run tests:
```bash
npm test
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context providers
│   ├── services/       # API service layer
│   ├── types/          # TypeScript type definitions
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── pages/          # Page components
│   ├── test/           # Test setup
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── .env                # Environment variables
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Utility-first CSS framework (latest version)
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Vitest** - Unit testing
- **Testing Library** - React component testing
- **fast-check** - Property-based testing

## API Integration

The frontend communicates with the backend API at `http://localhost:3000` (configurable via `VITE_API_URL`).

### API Endpoints

- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /` - Get all tasks
- `POST /` - Create a new task
- `PUT /:id` - Update a task
- `DELETE /:id` - Delete a task
- `PATCH /complete/:id` - Mark task as completed
- `PATCH /in-progress/:id` - Mark task as in-progress
- `PATCH /pending/:id` - Mark task as pending

## Next Steps

Follow the implementation plan in `.kiro/specs/task-management-frontend/tasks.md` to build out the application features.
