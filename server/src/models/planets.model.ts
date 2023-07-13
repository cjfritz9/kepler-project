import fs from 'fs';
import { parse } from 'csv-parse';
import PlanetsModel from './planets.mongo.js';

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
      .on('data', async (data: Planet) => {
        if (isHabitablePlanet(data)) {
          await savePlanetData(data);
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

const fetchHabitablePlanets = async () => {
  return await PlanetsModel.find(
    {},
    {
      _id: 0,
      __v: 0
    }
  );
};

const savePlanetData = async (planetData: Planet) => {
  try {
    await PlanetsModel.updateOne(
      {
        kepler_name: planetData.kepler_name
      },
      {
        kepler_name: planetData.kepler_name
      },
      {
        upsert: true
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default fetchHabitablePlanets;
