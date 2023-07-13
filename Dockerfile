FROM node:16

WORKDIR /server/dist

COPY . .

RUN npm run install-all && npm install typescript -g && tsc && npm run client:build

COPY . .

CMD ["npm", "run", "server"]