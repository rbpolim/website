# website

Site pessoal (rbpolim). Next.js, Payload CMS, Postgres (Neon) e Tailwind. A galeria de fotos fica em `/shooting`; o admin do Payload em `/admin`.

## Requisitos

- Node `24.x`
- Um banco Postgres (`DATABASE_URL`)

## Setup

```bash
npm install
cp .env.example .env
```

Preencha no `.env`:

| Variável | Uso |
| --- | --- |
| `DATABASE_URL` | Conexão Postgres |
| `PAYLOAD_SECRET` | Segredo do Payload |
| `BLOB_READ_WRITE_TOKEN` | Upload das fotos (Vercel Blob) |

## Comandos

```bash
npm run dev                  # servidor local
npm run build                # build de produção
npm run start                # serve o build
npm run lint                 # eslint
npm run generate:types       # gera src/payload-types.ts
npm run generate:importmap   # atualiza o import map do admin
npm run payload              # CLI do Payload
```
