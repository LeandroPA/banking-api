# develop stage
FROM node:13.14-alpine as develop-stage
WORKDIR /usr/app
COPY package*.json ./

# build stage
FROM develop-stage as build-stage
RUN npm install
COPY . .
RUN npm run swagger-autogen

# production stage
FROM build-stage as production-stage
EXPOSE 3001
CMD ["npm", "start"]