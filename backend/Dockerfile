FROM node:20-alpine AS base

# Set working directory inside the container
WORKDIR /app

# Install deps first (leveraging Docker layer caching)
COPY package.json ./
# Install all deps so Prisma can generate its client on install
RUN npm install

COPY prisma ./prisma
ENV DATABASE_URL=${DATABASE_URL}
RUN npx prisma generate

# Copy built server code (TS compiled output)
COPY dist ./dist

# Prune dev deps for a smaller runtime image
ENV NODE_ENV=production
RUN npm prune --omit=dev

# Expose the backend port
EXPOSE 3002

# Run the server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]

