import { Request, Response } from 'express';
import fetchHabitablePlanets from '../../models/planets.model.js';

export const getAllPlanets = async (_req: Request, res: Response) => {
  return res.status(200).send(await fetchHabitablePlanets());
};
