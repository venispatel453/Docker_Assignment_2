FROM node:20.11.1
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8000
ENV MONGODB_URI=mongodb://mongo:27017
CMD ["node", "app.js"]
