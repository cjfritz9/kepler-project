import { addNewLaunch, destroyLaunch, fetchAllLaunches } from '../../models/launches.model.js';
export const getAllLaunches = (_req, res) => {
    return res.status(200).json(fetchAllLaunches());
};
export const postNewLaunch = (req, res) => {
    const launch = req.body;
    console.log(launch);
    if (!launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target) {
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
export const deleteLaunch = (req, res) => {
    const { id } = req.params;
    destroyLaunch(+id);
    res
        .status(202)
        .send({ success: `Removed flight number ${id} from launches.` });
};