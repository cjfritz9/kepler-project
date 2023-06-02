import fs from 'fs';
import { parse } from 'csv-parse';

interface Planet {
  kepler_name: string;
  koi_disposition: string;
  koi_insol: number;
  koi_prad: number;
}

const habitablePlanets: Planet[] = [];

function isHabitablePlanet(planet: Planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

export const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream('../database/kepler_data.csv')
      .pipe(
        //@ts-ignore
        parse({
          comment: '#',
          columns: true
        })
      )
      .on('data', (data: Planet) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (err: any) => {
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
}

export default fetchHabitablePlanets;
