FROM node:16.20.1-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules \
  && npm ci --only=production

COPY . .
RUN npm ci \
  && npm run build

EXPOSE 3000

FROM node:16.20.1-slim
WORKDIR /app
COPY --from=builder /app /app

ENV SECRET_KEY=${SECRET_KEY:-generated_key}
RUN echo "$SECRET_KEY" > /app/.secret_key

USER node
CMD ["npm", "start"]
