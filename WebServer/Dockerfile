FROM node:20.7-alpine

WORKDIR /app

COPY . .

RUN npm ci

CMD ["npm", "run", "dev"]