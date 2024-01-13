# 1. Use an official Node.js as a parent image
FROM node:latest

# 2. Set work directory
WORKDIR /usr/src/app

# 3. Install pnpm
RUN npm install -g pnpm@8.7.0

# 4. Copy the current directory contents into the container at the working directory
COPY . .

# 5. Install dependencies
RUN pnpm install

# # 6. Build the application
# RUN pnpm run build

# 7. Expose API port to the outside
EXPOSE 3200

# # 8. Define the command to run the application
# CMD [ "pnpm", "run", "dev" ]