import habitablePlanets from '../../models/planets.model.js';
export const getAllPlanets = (_req, res) => {
    return res.status(200).json(habitablePlanets);
};
