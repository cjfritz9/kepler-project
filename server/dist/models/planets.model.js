import fs from 'fs';
import { parse } from 'csv-parse';
const habitablePlanets = [];
function isHabitablePlanet(planet) {
    return (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6);
}
export const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream('../database/kepler_data.csv')
            .pipe(
        //@ts-ignore
        parse({
            comment: '#',
            columns: true
        }))
            .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
            .on('error', (err) => {
            console.log(err);
            reject(err);
        })
            .on('end', () => {
            resolve(null);
        });
    });
};
const fetchHabitablePlanets = () => {
    return habitablePlanets;
};
export default fetchHabitablePlanets;
