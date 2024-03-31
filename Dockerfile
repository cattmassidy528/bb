FROM node:16.20.1-slim

WORKDIR /app

RUN mkdir -p client server

COPY package*.json ./
COPY ./client/package*.json ./client/
COPY ./server/package*.json ./server/

RUN npm i --silent --unsafe-perm

COPY . .
RUN cd client && npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["react-scripts", "start"]
