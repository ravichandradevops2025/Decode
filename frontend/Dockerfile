# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
RUN npm ci

# Copy app files
COPY . .

# Copy shared types
COPY ../shared ./shared

# Set environment to development
ENV NODE_ENV=development

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]