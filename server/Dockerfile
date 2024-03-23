FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY generateSecKey.js ./

RUN node generateSecKey.js

ENV SECRET_KEY=$SECRET_KEY

COPY . .

CMD ["node", "server.js"]
