# develop stage
FROM node:13.14-alpine as develop-stage
WORKDIR /usr/app
COPY package*.json ./
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm install

# production stage
FROM build-stage as production-stage
EXPOSE 3002
CMD ["npm", "start"]