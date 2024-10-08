# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production  # Use --production to avoid installing dev dependencies

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "run", "start"]
