# Profile Company (Frontend)

This is a React + TypeScript frontend application (Vite) to manage simple company records (list, create, edit, view details).

## 🔧 Tech stack

- React 19 + Vite
- TypeScript
- React Router
- Redux Toolkit Query (RTK Query)
- Formik for forms
- CSS Modules
- Axios for HTTP
- ESLint + Prettier

## Available scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server (Vite)              |
| `npm run build`   | Typecheck + build production bundles |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Run Prettier                         |

## Run locally

1. Clone the repo
2. Install dependencies
   npm install
3. Start dev server
   npm run dev
4. Open http://localhost:5173

## Project structure (high level)

- `src/` - application source
  - `pages/` - route pages (login, home, companies)
  - `components/` - shared UI components (table, drawer, spinner, etc.)
  - `api/` - RTK Query services and models
  - `layouts/` - app layouts
  - `utils/` - helper utilities

## Data / API

This project expects a backend API for companies. During development a mock API (MockAPI) is used. Example endpoint used in the project:

`https://68ec5bc1eff9ad3b1401d709.mockapi.io/api/companies`
