# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port your server listens on
EXPOSE 5001

# Start the application
CMD ["npx", "nodemon", "index.js"]

