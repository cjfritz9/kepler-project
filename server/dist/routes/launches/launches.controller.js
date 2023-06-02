import { fetchAllLaunches } from '../../models/launches.model.js';
export const getAllLaunches = (_req, res) => {
    return res.status(200).json(fetchAllLaunches());
};
