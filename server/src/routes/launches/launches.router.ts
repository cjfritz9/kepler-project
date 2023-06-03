import express from 'express';
import { deleteLaunch, getAllLaunches, postNewLaunch } from './launches.controller.js';

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);

launchesRouter.post('/', postNewLaunch);

launchesRouter.delete('/:id', deleteLaunch);

export default launchesRouter;
