import { Request, Response } from 'express';
import { fetchAllLaunches } from '../../models/launches.model.js';

export const getAllLaunches = (_req: Request, res: Response) => {
  return res.status(200).json(fetchAllLaunches());
};
