# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm globally in the container
RUN npm install -g pnpm@8.7.0

# Copy package*.json and pnpm-lock.yaml into the container
COPY package.json pnpm-lock.yaml .

# Install any needed packages specified in package.json
RUN pnpm install

# Bundle the rest of the frontend source code into the Docker image
COPY . .

# Expose port 3100 on the container so it can be accessed
EXPOSE 3100