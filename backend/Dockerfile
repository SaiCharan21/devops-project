# Use the official Node.js version 20 image with Alpine Linux (a lightweight base image).
# This gives us Node + npm in a very small, fast image.
FROM node:20-alpine

# Set the working directory inside the container to /app.
# All following commands (COPY, RUN, etc.) will be executed in this folder.
WORKDIR /app

# Copy only the package.json and package-lock.json files first.
# This allows Docker to cache "npm install" unless dependencies change (faster rebuilds).
COPY package*.json ./

# Install the project dependencies defined in package.json.
RUN npm install

# Copy the rest of the application code from your computer into the container.
COPY . .

# Expose port 5000 so the container can communicate with the outside world.
# (This does NOT actually publish the port; you do that with `docker run -p` or in docker-compose.)
EXPOSE 5000

# Define the command to start your app.
# Here we run: "node server.js"
CMD ["node", "server.js"]
