import fetchHabitablePlanets from '../../models/planets.model.js';
export const getAllPlanets = async (_req, res) => {
    return res.status(200).send(await fetchHabitablePlanets());
};
