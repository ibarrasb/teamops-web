# TeamOps Web (Frontend)

A modern **projects + tasks** dashboard for the TeamOps platform. Built with **React (Vite) + TypeScript**, **Tailwind + shadcn/ui**, and **TanStack Query**. Auth is **JWT-based**: the app stores a token locally and sends `Authorization: Bearer <token>` for protected API routes.

> Backend: Spring Boot API running on AWS (EC2 + Docker) with Postgres on RDS and optional Redis.

---

## Features (current)
- ✅ Auth: register + login (JWT)
- ✅ Projects: list / create / update / delete
- ✅ Tasks: list / create / update / delete (per project)
- ✅ Protected routes (redirects to login when unauthenticated)
- ✅ Modern UI layout (TopBar + Sidebar + content)
- ✅ Typed API layer + React Query caching

---

## Tech Stack
- **React 18** + **Vite**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router**
- **@tanstack/react-query**
- **lucide-react**
- **sonner** (toasts)

---

## Requirements
- Node.js **18+** (recommended)
- npm **9+**

---

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Create a local env file:

```bash
cp .env.example .env.local
```

Set your API base URL (local or EC2).

**Local backend**
```bash
VITE_API_BASE_URL=http://localhost:8080
```

### 3) Run the dev server
```bash
npm run dev
```

App runs at:
- http://localhost:5173

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for the TeamOps API | `http://localhost:8080` |

---

## Scripts
```bash
npm run dev        # start local dev server
npm run build      # production build
npm run preview    # preview production build locally
npm run lint       # eslint
```

---

## API Overview

### Auth
- `POST /auth/register` → `{ email, password, displayName }`
- `POST /auth/login` → `{ token }`

### Projects
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:projectId`
- `PATCH /api/projects/:projectId`
- `DELETE /api/projects/:projectId`

### Tasks (per project)
- `GET /api/projects/:projectId/tasks`
- `POST /api/projects/:projectId/tasks`
- `GET /api/projects/:projectId/tasks/:taskId`
- `PATCH /api/projects/:projectId/tasks/:taskId`
- `DELETE /api/projects/:projectId/tasks/:taskId`

---

## Project Structure (high level)

```txt
src/
  app/                # AppShell, layout, router
  components/         # shared UI components (shadcn)
  features/
    auth/             # auth pages + auth provider/routes + api
    projects/         # projects pages/hooks/api + UI dialogs
    tasks/            # tasks page/hooks/api + status pill
  lib/                # api client, auth helpers, env, query keys, utils
  types/              # shared API types (DTOs)
```

---

## How Auth Works (frontend)
- On login, the API returns a JWT token.
- The token is saved locally (see `src/lib/auth.ts`).
- API calls automatically attach:
  - `Authorization: Bearer <token>`
- Protected routes redirect to `/login` if no token is present.

---

## Deploy (S3 + CloudFront) – Notes
This is a standard static SPA deploy:

### Build
```bash
npm run build
```

Output folder:
- `dist/`

### S3
- Upload `dist/` contents to an S3 bucket configured for static hosting (or as an origin behind CloudFront).

### CloudFront (SPA routing)
For React Router to work, configure CloudFront to serve `index.html` for unknown routes (custom error response 404 → `/index.html` with 200).

### CORS (backend)
When serving the UI from CloudFront, the backend must allow the CloudFront origin:
- Allow origins: `https://<cloudfront-domain>` (and custom domain if you add one)
- Allow headers: `Authorization`, `Content-Type`
- Allow methods: `GET,POST,PATCH,DELETE,OPTIONS`

---

## Troubleshooting

### Tailwind warning: “content option missing”
Ensure your Tailwind config includes:
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

### Styles missing / bg-background not found
The `bg-background` and `text-foreground` utilities rely on CSS variables (shadcn theme). Confirm:
- Tailwind config extends `colors.background` and `colors.foreground`
- `src/index.css` includes the `:root` theme variables (and `.dark` variables if using dark mode)

### API calls failing (401)
- Ensure you’re logged in
- Confirm `VITE_API_BASE_URL` is correct
- Check the token exists in storage
- Verify backend CORS allows your frontend origin

---

## Roadmap (nice next steps)
- Task status toggle: TODO → IN_PROGRESS → DONE (instead of TODO/DONE only)
- Task due date UI + sorting/filtering
- Project edit dialog (name/description)
- Better empty states + skeleton loaders per view
- Add HTTPS for API (ALB or cert + reverse proxy)

---

## License
MIT (or replace with your preferred license)
