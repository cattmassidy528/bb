FROM node:lts

WORKDIR /usr/src/app

ENV PORT=5000

COPY package*.json ./

RUN npm ci --silent

COPY generateSecKey.js ./

RUN node generateSecKey.js

ENV SECRET_KEY=$SECRET_KEY

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
