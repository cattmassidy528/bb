FROM node:16.20.1-slim AS client-build

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN cd client && npm run build

FROM node:16.20.1-slim AS server

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY --from=client-build /app/client/build /app/client/build
COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "server.js"]
