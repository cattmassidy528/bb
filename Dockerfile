

# Base image
FROM node:16.20.1-slim

# Set the working directory
WORKDIR /app

# Install the dependencies
COPY package*.json ./
RUN npm install --silent

# Copy the application code
COPY . .

# Change ownership of the /app directory
RUN chown -R node:node /app

# Switch to the node user
USER node

# Build the frontend
RUN cd client && npm run build

# Expose the appropriate port
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]
