import express from 'express';
import { getAllPlanets } from './planets.controller.js';

const planetsRouter = express.Router();

planetsRouter.get('/', getAllPlanets);

export default planetsRouter;
