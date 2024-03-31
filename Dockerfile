FROM node:16.20.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm i --silent

COPY . .
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
