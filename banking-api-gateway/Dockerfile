# develop stage
FROM swaggerapi/swagger-ui as develop-stage
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --chmod=0666 nginx.conf /etc/nginx/nginx.conf
COPY swagger_output.json /app/swagger_output.json

FROM develop-stage as build-stage
RUN apk update && apk add --no-cache jq
# RUN ls /app > /app/out.txt
RUN jq -s 'reduce .[] as $item ({}; . * $item)' /app/swagger_output.json > swagger_outputs.json
# TODO: build all swagger_outputs together

# production stage
FROM build-stage as production-stage
EXPOSE 3000:3000