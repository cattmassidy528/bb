FROM node:16.20.1-slim

WORKDIR /app

COPY package*.json ./
COPY ./server/package*.json ./server/
COPY ./client/package*.json ./client/

RUN npm install --silent

RUN npm install --prefix ./client react-scripts --silent

COPY . .

RUN chown -R node:node /app

USER node

CMD ["npm", "start"]
