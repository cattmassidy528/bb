FROM node:lts

ENV CI=true

ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]