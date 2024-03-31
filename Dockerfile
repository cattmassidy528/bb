FROM node:16.20.1-slim

WORKDIR /app

RUN mkdir -p /app/client /app/server 

COPY package*.json ./
COPY ./client/package*.json ./client/
COPY ./server/package*.json ./server/

RUN npm i --silent --unsafe-perm
RUN npm --prefix /app/client i --silent --unsafe-perm
RUN npm --prefix /app/server i --silent --unsafe-perm

COPY . .


EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
