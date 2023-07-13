import http from 'http';
import mongoConnect from './services/mongo.js';
import app from './app.js';
import { loadPlanetsData } from './models/planets.model.js';

const PORT = process.env.PORT || 8080;

console.log("PORTS: ", process.env.PORT, PORT)

const server = http.createServer(app);

await mongoConnect();
await loadPlanetsData();
server.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});
