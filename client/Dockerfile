FROM node:16.20.1

ENV CI=true

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm i --silent

COPY . ./usr/src/app/client

CMD ["npm", "start"]
