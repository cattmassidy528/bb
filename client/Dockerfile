FROM node:16-alpine AS build

ENV CI=true

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY . .

CMD ["npm", "start"]
