FROM node:16.20.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "start"]
