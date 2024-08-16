# Use Node.js 18.20.4 as the base image
FROM node:18.20.4

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies listed in package.json
RUN npm install

# Copy all the project files into the container
COPY . .

# Expose the port your application will run on
EXPOSE 3000
