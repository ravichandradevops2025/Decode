# Decode — Learning & Career Acceleration Platform

A next-generation full-stack learning & career acceleration platform built with Next.js 15, NestJS, MongoDB, and Redis.

## 🚀 Tech Stack

### Frontend
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Redux Toolkit + React Query
- NextAuth.js + Shadcn UI

### Backend
- NestJS + TypeScript
- MongoDB + Mongoose
- Redis + IORedis
- JWT + Passport.js

## 📦 Project Structure
```
decode/
├── frontend/           # Next.js app
├── backend/           # NestJS app
├── shared/            # Shared types & utilities
└── .github/           # GitHub Actions workflows
```

## 🛠 Quick Start

1. Clone the repository:
```bash
git clone <repo-url>
cd decode
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Add your OAuth credentials to `.env`:
- Get Google OAuth credentials from Google Cloud Console
- Get LinkedIn OAuth credentials from LinkedIn Developers
- Generate JWT_SECRET and NEXTAUTH_SECRET (min 32 chars each)

4. Start the development stack:
```bash
docker compose up --build
```

Your apps will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- API Docs: http://localhost:4000/api/docs

## 💻 Development

### Install Dependencies
```bash
# Frontend deps
cd frontend && npm install

# Backend deps
cd backend && npm install
```

### Available Scripts

Frontend:
```bash
npm run dev         # Start Next.js dev server
npm run build      # Production build
npm run lint       # Run ESLint
npm run format     # Format with Prettier
```

Backend:
```bash
npm run start:dev   # Start NestJS in watch mode
npm run start:prod  # Start production server
npm run lint        # Run ESLint
npm run seed        # Seed the database
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test
```

## 📚 Documentation

- Frontend: Next.js app with TypeScript, Tailwind CSS, and NextAuth.js
- Backend: NestJS with MongoDB, Redis, and Swagger
- API Docs: Available at `/api/docs` when running the backend
- Environment Variables: See `.env.example` for all required variables

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## 📝 License

This project is MIT licensed.
