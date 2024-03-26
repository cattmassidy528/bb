FROM node:16.20.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --silent

COPY generateSecKey.js ./

RUN node generateSecKey.js

ENV SECRET_KEY=$SECRET_KEY

COPY . .

CMD ["node", "server.js"]
