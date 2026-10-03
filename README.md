# Flowly

From idea to execution.

Flowly is an AI workspace where you give a goal and it figures out the steps, uses the right tools, and hands back finished work. Built for the Orbio hackathon — Orbio is the inference and tools layer (models, web search, social reads, onchain data).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Orbio

Copy `.env.example` to `.env.local`:

```
ORBIO_API_KEY=sk-orb-...
ORBIO_MODEL=anthropic/claude-sonnet-4.5
```

The gateway is OpenAI-compatible at `https://api.orbio.so/api/v1`. Model ids come from `GET /models`. Without a key, Flowly still plans and delivers using its built-in engine so the product is usable in a demo.

## Product

- `/` brand and how it works
- `/workspace` goal in, workflow out
- `POST /api/run` streams the run (plan, steps, deliverable)
- `GET /api/status` checks the Orbio model catalogue and whether a key is configured
