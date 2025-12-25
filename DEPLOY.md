# DetailQuote Deployment Guide

## Quick Deploy to Vercel

### 1. Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repo: `vinvuk/detailquote`
3. Vercel will auto-detect Next.js settings

### 2. Add Neon Database

**Option A: Use Vercel's Neon Integration**
1. In your Vercel project, go to **Storage** tab
2. Click **Create Database** → **Neon Postgres**
3. This automatically adds `DATABASE_URL` to your environment

**Option B: Use Existing Neon Project**
1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project called "detailquote"
3. Copy the connection string
4. In Vercel, go to **Settings** → **Environment Variables**
5. Add `DATABASE_URL` with your Neon connection string

### 3. Push Database Schema

After deployment, run:

```bash
DATABASE_URL="your-neon-connection-string" npx prisma db push
```

Or use the Vercel CLI:

```bash
vercel env pull .env.local
npx prisma db push
```

### 4. Verify Deployment

1. Visit your Vercel URL
2. Test the waitlist form with a test email
3. Check Neon dashboard to confirm data is stored

## Local Development

```bash
# Clone repo
git clone https://github.com/vinvuk/detailquote
cd detailquote

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push schema to database
npm run db:push

# Run dev server
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
