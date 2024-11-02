# Use Node.js 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the server port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]