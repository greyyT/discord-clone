FROM node:19-alpine AS deps

RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM node:19-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Production Image
FROM node:19-alpine AS production
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

COPY './.env' './.env'

RUN chown -R node:node /app/node_modules/.prisma

ENV PORT 3000

USER node

CMD npx prisma db push && npm run start