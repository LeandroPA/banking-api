# develop stage
FROM swaggerapi/swagger-ui as develop-stage
WORKDIR /usr/app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --chmod=0666 nginx.conf /etc/nginx/nginx.conf
COPY swagger-outputs swagger-outputs

FROM develop-stage as build-stage
RUN apk update && apk add --no-cache jq
RUN jq -s 'reduce .[] as $item ({}; . * $item)' swagger-outputs/*.json > swagger-output.json

# production stage
FROM build-stage as production-stage
WORKDIR /
EXPOSE 3000:3000