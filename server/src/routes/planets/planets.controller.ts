import { Request, Response } from 'express';
import fetchHabitablePlanets from '../../models/planets.model.js';

export const getAllPlanets = (_req: Request, res: Response) => {
  return res.status(200).json(fetchHabitablePlanets());
};
