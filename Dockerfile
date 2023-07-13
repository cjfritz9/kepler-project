FROM node:16

WORKDIR /server/dist

COPY . .

RUN npm run install-all && npm install typescript -g && tsc

CMD ["npm", "run", "deploy"]