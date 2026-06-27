# Taskor Deployment

Taskor is split into a Vite React frontend and an Express/MongoDB backend.

## Recommended hosting

- Frontend: Vercel or Netlify
- Backend API: Render, Railway, or Fly.io
- Database: MongoDB Atlas

The simplest path is Vercel for the frontend, Render for the backend, and MongoDB Atlas for the database.

## Backend deploy

Deploy the `server` folder as a Node web service.

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Environment variables:

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=use_a_long_random_secret_at_least_32_characters
CLIENT_URL=https://your-frontend-domain.vercel.app
```

After deploy, verify:

```text
https://your-backend-domain.onrender.com/api/health
```

## Frontend deploy

Deploy the project root as a Vite app.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Environment variables:

```bash
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

## Local development

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
npm install
npm run dev
```

Use `server/.env.example` and `.env.example` as templates.
