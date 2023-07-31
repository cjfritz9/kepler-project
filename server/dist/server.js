import http from 'http';
import app from './app.js';
import mongoConnect from './services/mongo.js';
import { loadPlanetsData } from './models/planets.model.js';
import { loadLaunchesData } from './models/launches.model.js';
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
await mongoConnect();
await loadPlanetsData();
await loadLaunchesData();
server.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
});
