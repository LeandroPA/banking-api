# develop stage
FROM swaggerapi/swagger-ui as develop-stage
WORKDIR /usr/app
COPY --chown=nginx:nginx --chmod=0666 nginx.conf /etc/nginx/nginx.conf
COPY . .

FROM develop-stage as build-stage


# production stage
FROM build-stage as production-stage
WORKDIR /
EXPOSE 3000:3000