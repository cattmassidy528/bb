FROM node:14.17.6-slim

ENV CI=true

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY . .

CMD ["npm", "start"]
