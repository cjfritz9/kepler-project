FROM node:16

WORKDIR /server/dist

COPY . .

RUN npm run install-all

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "deploy"]