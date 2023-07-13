FROM node:16

WORKDIR /server/dist

COPY . .

RUN npm run install-all && npm install typescript -g

RUN tsc

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "deploy"]