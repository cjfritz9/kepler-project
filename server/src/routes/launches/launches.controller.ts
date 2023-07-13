import { Request, Response } from 'express';
import {
  scheduleNewLaunch,
  abortLaunch,
  fetchAllLaunches,
  launchExistsWithId
} from '../../models/launches.model.js';

export const getAllLaunches = async (_req: Request, res: Response) => {
  return res.status(200).json(await fetchAllLaunches());
};

export const postNewLaunch = async (req: Request, res: Response) => {
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
  const newLaunch = await scheduleNewLaunch(launch);
  return res.status(201).send(newLaunch);
};

export const deleteLaunch = async (req: Request, res: Response) => {
  const { id } = req.params;

  const launchExists = await launchExistsWithId(+id);
  if (!launchExists) {
    return res.status(404).send({
      error: `No launch found by Flight Number ${id}`
    });
  } else {
    const aborted = await abortLaunch(+id);

    if (!aborted) {
      return res.status(400).send({
        error: 'Launch not aborted'
      });
    } else {
      return res.status(202).send({
        success: `Removed flight number ${id} from launches.`
      });
    }
  }
};
