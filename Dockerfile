FROM node:18-alpine

WORKDIR /app

# Install OpenSSL and other dependencies
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
