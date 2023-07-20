# Set the base image to Node.js 14 Alpine version
FROM node:14-alpine AS build

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the .env file to the working directory
COPY .env ./

# Copy the rest of the frontend source code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Create the Nginx server to serve the built React app
FROM nginx:1.21-alpine

# Copy the Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage to the Nginx root directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the frontend port (change it to the actual port your frontend listens on)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
