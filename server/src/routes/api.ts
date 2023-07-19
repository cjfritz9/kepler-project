import express from 'express';

const api = express.Router();

import planetsRouter from './planets/planets.router.js';
api.use('/planets', planetsRouter);

import launchesRouter from './launches/launches.router.js';
api.use('/launches', launchesRouter);

export default api;