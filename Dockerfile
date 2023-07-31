FROM node:16-alpine

WORKDIR /

COPY package*.json ./
COPY ./database ./database
COPY ./server ./server

RUN npm run docker:install

CMD ["npm", "run", "server"]