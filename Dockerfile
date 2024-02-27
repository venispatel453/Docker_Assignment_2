FROM node:20.11.1

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8000 to the outside world (not 3000)
EXPOSE 8000

# Define environment variables
ENV MONGODB_URI=mongodb://mongo:27017

# Command to run the application
CMD ["node", "app.js"]
