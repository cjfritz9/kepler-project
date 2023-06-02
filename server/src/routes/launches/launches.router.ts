import express from 'express';
import { getAllLaunches } from './launches.controller.js';

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);

export default launchesRouter;
