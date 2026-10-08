FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# A GTM-azonosító build-időben kerül a kliens kódba (NEXT_PUBLIC_).
ARG NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID

# Build Next.js with standalone output
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# A .next mappa a futtató felhasználóé, hogy a Next.js írhassa a
# képoptimalizáló gyorsítótárát (.next/cache). Enélkül EACCES hiba.
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone server
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]