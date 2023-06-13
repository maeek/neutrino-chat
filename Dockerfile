FROM node:18-alpine3.14 as builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM httpd

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
