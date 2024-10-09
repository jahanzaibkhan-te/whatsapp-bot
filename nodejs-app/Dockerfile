# Use the official Node.js image as a base
FROM node

# Create and change to the app directory
WORKDIR /

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install -f

# Copy the rest of the source files
COPY . .

# Run the application in production
ENV NODE_ENV=production
CMD [ "node", "app.js" ]
