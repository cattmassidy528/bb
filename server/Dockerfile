FROM node:20.11.0

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./ ./

RUN npm ci --silent

COPY generateSecKey.js ./

RUN node generateSecKey.js

ENV SECRET_KEY=$SECRET_KEY

COPY ./ ./

CMD ["node", "server.js"]
