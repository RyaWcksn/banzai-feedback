FROM node:20-alpine  
# Set environment variable (only accessible during build)
ENV DATABASE_URL=${DATABASE_URL}  
# Set working directory
WORKDIR /app  
# Install pnpm globally
RUN npm install -g pnpm  
# Copy dependency files first (for better caching)
COPY package.json pnpm-lock.yaml ./  
COPY prisma ./prisma/  
# Install dependencies and generate Prisma client
RUN pnpm install --frozen-lockfile  
RUN npx prisma generate  
# Copy all project files
COPY . .  
# Build the application
RUN pnpm build  
# Expose port 3000
EXPOSE 3000  
# Start the application
CMD ["pnpm", "start"]
