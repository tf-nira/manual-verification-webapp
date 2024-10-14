# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app for production
RUN npm run build

# Use a lightweight web server to serve the production build
FROM nginx:alpine

# Copy the production build from the previous stage to the web server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]