# Set the base image to Node.js 14 Alpine version
FROM node:14-alpine

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the .env file to the working directory
COPY .env ./

# Copy the rest of the backend source code to the working directory
COPY . .

# Expose the backend port (change it to the actual port your backend listens on)
EXPOSE 5000

RUN node /usr/src/app/utils/others/generate_keys.js

# Command to start the backend server
CMD ["npm", "start"]
