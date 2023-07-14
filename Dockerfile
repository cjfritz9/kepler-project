FROM node:16

WORKDIR /

COPY . .

RUN npm run install-all
RUN npm run client:build

WORKDIR /server

ENV PORT=8080
ENV MONGO_URI='mongodb+srv://nasa-api:Vk2Ctzt2Xkd8bHh6@nasa-cluster.rqgtwab.mongodb.net/nasa-db?retryWrites=true&w=majority'

CMD ["npm", "start"]