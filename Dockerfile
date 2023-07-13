FROM node:16

WORKDIR /

COPY package*.json .
COPY client/package*.json client/
COPY server/package*.json server/
COPY client/ client/

RUN npm run install-all
RUN npm run client:build

COPY . .

WORKDIR /server/dist

CMD ["npm", "run", "server"]