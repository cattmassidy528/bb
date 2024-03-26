FROM node:16.20.1

ENV CI=true

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --silent

COPY . .

CMD ["npm", "start"]
