FROM node:18-alpine3.14 as builder

WORKDIR /app

COPY . .

ARG github_token
ENV GITHUB_TOKEN=$github_token

RUN echo registry=https://registry.npmjs.org/ >> ~/.npmrc
RUN echo @github_user:registry=https://npm.pkg.github.com/ >> ~/.npmrc
RUN echo //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN >> ~/.npmrc

RUN npm install && npm run build

FROM httpd

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
