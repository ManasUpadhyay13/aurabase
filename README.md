# Aurabase

Build agentic workflows visually. Aurabase is a no-code, visual workflow builder for creating, managing, and executing AI-powered automation workflows using a drag-and-drop node-based canvas.

> **Work in Progress** — Core features are implemented and actively being developed.

## Features

- **Visual Workflow Editor** — Infinite canvas with drag-and-drop node creation, connections, grid snapping, mini-map, and pan/zoom controls powered by React Flow
- **Node-Based Execution** — Extensible node system with Initial, Manual Trigger, and HTTP Request nodes (more coming)
- **Workflow Execution Engine** — Topological sort-based execution with context passing between nodes and cycle detection
- **Real-Time Updates** — Live execution status via Inngest Realtime with WebSocket-based monitoring
- **HTTP Request Nodes** — Dynamic endpoint and body generation with Handlebars templating and variable interpolation
- **Authentication** — Email/password auth via Better Auth with session management
- **Subscription Management** — Polar.sh integration for payments and subscriptions
- **Error Monitoring** — Sentry integration for error tracking across server and edge

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org) 16 | React framework with App Router and Turbopack |
| [React](https://react.dev) 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) 5 | Type safety |
| [React Flow (XYFlow)](https://reactflow.dev) | Visual node editor |
| [TailwindCSS](https://tailwindcss.com) 4 | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com) | Component library |
| [Framer Motion](https://www.framer.com/motion) | Animations |
| [Recharts](https://recharts.org) | Data visualization |
| [Lucide React](https://lucide.dev) | Icons |

### State Management & Data Fetching

| Technology | Purpose |
|---|---|
| [tRPC](https://trpc.io) | Type-safe API layer |
| [TanStack React Query](https://tanstack.com/query) | Async state management |
| [Jotai](https://jotai.org) | Atomic state management |
| [Nuqs](https://nuqs.47ng.com) | URL state management |
| [React Hook Form](https://react-hook-form.com) | Form handling |
| [Zod](https://zod.dev) | Schema validation |

### Backend & Database

| Technology | Purpose |
|---|---|
| [Prisma](https://www.prisma.io) 6 | ORM |
| [PostgreSQL](https://www.postgresql.org) | Primary database |
| [Better Auth](https://www.better-auth.com) | Authentication |
| [Polar.sh](https://polar.sh) | Payments & subscriptions |
| [Inngest](https://www.inngest.com) | Workflow orchestration & real-time events |

### AI Integrations

| Technology | Purpose |
|---|---|
| [Vercel AI SDK](https://sdk.vercel.ai) | Universal AI SDK |
| [@ai-sdk/anthropic](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic) | Claude integration |
| [@ai-sdk/openai](https://sdk.vercel.ai/providers/ai-sdk-providers/openai) | OpenAI integration |
| [@ai-sdk/google](https://sdk.vercel.ai/providers/ai-sdk-providers/google) | Google AI integration |

### Developer Tools

| Technology | Purpose |
|---|---|
| [Biome](https://biomejs.dev) | Linting & formatting |
| [Sentry](https://sentry.io) | Error tracking |
| [Docker](https://www.docker.com) | Containerization |
| [mprocs](https://github.com/pvolok/mprocs) | Multi-process runner |

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Login & signup routes
│   ├── (dashboard)/            # Protected routes
│   │   ├── (rest)/             # Workflows, executions, credentials
│   │   └── (editor)/           # Visual workflow editor
│   └── api/                    # API routes (auth, tRPC, Inngest)
├── features/                   # Feature modules
│   ├── auth/                   # Auth UI
│   ├── editor/                 # Workflow editor & Jotai store
│   ├── workflows/              # Workflow CRUD & tRPC routers
│   ├── triggers/               # Trigger node components
│   ├── executions/             # Execution nodes & executor registry
│   └── subscriptions/          # Subscription management
├── components/                 # Shared UI (shadcn, base nodes, sidebar)
├── lib/                        # Auth, DB, Polar config
├── config/                     # Node type registry
├── trpc/                       # tRPC client, server, routers
├── inngest/                    # Inngest client, functions, channels
└── hooks/                      # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL
- Inngest CLI (for local development)

### Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

### Development Scripts

```bash
npm run dev           # Start Next.js with Turbopack
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run Biome linting
npm run format        # Format code with Biome
npm run inngest:dev   # Start Inngest dev server
npm run dev:all       # Run Next.js + Inngest together (mprocs)
```

### Docker

```bash
docker build -t aurabase .
docker run -p 3002:3002 aurabase
```

## Architecture

- **Node Executor Pattern** — Extensible registry for node types with a standardized executor interface
- **Topological Sort** — Ensures nodes execute in correct dependency order
- **Context Passing** — Workflow context flows between nodes for data sharing
- **Real-Time Publishing** — Inngest Realtime for live UI updates during execution
- **Template Rendering** — Handlebars for dynamic HTTP request generation
- **Feature-Based Organization** — Modular feature folders with co-located components, hooks, and server logic

## License

All rights reserved.
