# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code into the container
COPY . .

# Expose the application port
EXPOSE 8082

# Run the backend server
CMD ["node", "src/server.js"]
