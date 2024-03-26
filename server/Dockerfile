FROM node:14.17.6-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY generateSecKey.js ./

RUN node generateSecKey.js

ENV SECRET_KEY=$SECRET_KEY

COPY . .

CMD ["node", "server.js"]
