FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY ./database ./database
COPY ./server ./server

RUN npm run docker:install

USER node

CMD ["npm", "run", "server"]