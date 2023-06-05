import { Request, Response } from 'express';
import {
  addNewLaunch,
  destroyLaunch,
  fetchAllLaunches,
  launchExistsWithId
} from '../../models/launches.model.js';

export const getAllLaunches = (_req: Request, res: Response) => {
  return res.status(200).json(fetchAllLaunches());
};

export const postNewLaunch = (req: Request, res: Response) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).send({
      error: 'Missing required launch property.'
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).send({
      error: 'Invalid launch date'
    });
  }
  addNewLaunch(launch);
  return res.status(201).send(launch);
};

export const deleteLaunch = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!launchExistsWithId(+id)) {
    return res.status(404).send({
      error: `No launch found by Flight Number ${id}`
    });
  } else {
    const aborted = destroyLaunch(+id);
    return res.status(202).send({
      success: `Removed flight number ${id} from launches.`,
      launchData: aborted
    });
  }
};
