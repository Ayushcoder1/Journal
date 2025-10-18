FROM node:20-slim

# Set working directory inside the container
WORKDIR /app

# Install deps first (leveraging Docker layer caching)
COPY package.json ./
COPY prisma ./prisma

# Install all deps so Prisma can generate its client on install
RUN npm install

# Copy built server code (TS compiled output)
COPY dist ./dist

# Prune dev deps for a smaller runtime image
ENV NODE_ENV=production
RUN npm prune --omit=dev

# Expose the backend port
EXPOSE 3002

# Run the server
CMD ["node", "dist/index.js"]

