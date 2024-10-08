# Use the official Node.js image as a base
FROM node

# Create and change to the app directory
WORKDIR /

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the source files
COPY . .

# Expose the port your Node.js app runs on
EXPOSE 3000

# Run the application
CMD [ "node", "index.js" ]
