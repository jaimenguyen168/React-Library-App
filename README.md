# Cool Library

A modern library management web application built with Next.js 15. Users can browse books, borrow them, and manage their reading history. Admins can manage the catalog, users, and monitor borrowing activity through a dedicated dashboard.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Auth**: NextAuth v5
- **Database**: Neon (Postgres) + Drizzle ORM
- **Storage**: ImageKit
- **Rate Limiting**: Upstash Redis + Ratelimit
- **Workflows**: Upstash Workflow
- **UI**: Tailwind CSS, Radix UI, shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+
- A Neon database
- Upstash Redis instance
- ImageKit account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
QSTASH_TOKEN=
QSTASH_URL=
```

### Database Setup

```bash
npm run db:generate
npm run db:migrate
npm run seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run seed` | Seed the database |