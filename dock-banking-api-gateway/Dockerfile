# FROM nginx
# RUN cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bkp
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80:80

# develop stage
FROM nginx as develop-stage
WORKDIR /usr/app
COPY nginx.conf /etc/nginx/nginx.conf

# build stage
# FROM develop-stage as build-stage
# RUN npm install

# production stage
FROM develop-stage as production-stage
EXPOSE 3000:3000
# CMD ["npm", "start"]