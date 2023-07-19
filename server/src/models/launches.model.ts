import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import launchesDatabase from './launches.mongo.js';
import planetsDatabase from './planets.mongo.js';

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: typeof Date;
  target?: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');

  if (!latestLaunch) {
    return 100;
  }

  return latestLaunch.flightNumber;
};

export const fetchAllLaunches = async (skip: number, limit: number) => {
  return await launchesDatabase
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

const saveLaunch = async (launch: Launch) => {
  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber
    },
    launch,
    {
      upsert: true
    }
  );
};

const SPACEX_API_URL = process.env.SPACEX_API_URL;

const latestLaunchExistsInDB = async () => {
  const response = await axios.get(`${SPACEX_API_URL}/launches/upcoming`);
  const upcomingLaunchesCount = response.data.length;
  const latestSpaceXLaunch = response.data[upcomingLaunchesCount - 1];
  const existsInDatabase = await findLaunch({
    flightNumber: latestSpaceXLaunch.flight_number,
    launchDate: latestSpaceXLaunch.date_local,
    mission: latestSpaceXLaunch.name
  });
  if (response.status !== 200) {
    console.log('Problem downloading SpaceX Launch Data');
    throw new Error('Launch Data Download Failed');
  }
  return existsInDatabase;
};

const populateLaunchesDB = async () => {
  console.log('SpaceX Data Updating...');
  const response = await axios.post(`${SPACEX_API_URL}/launches/query`, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        }
      ]
    }
  });

  if (response.status !== 200) {
    console.log('Problem downloading SpaceX Launch Data');
    throw new Error('Launch Data Download Failed');
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc.payloads;
    const customers: string[] = payloads.flatMap((payload: any) => {
      return payload.customers;
    });

    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers
    };
    await saveLaunch(launch);
  }
};

export const loadLaunchesData = async () => {
  console.log('Loading launches data...');
  const existsInDatabase = await latestLaunchExistsInDB();
  if (existsInDatabase) {
    console.log('SpaceX data up to date');
  } else {
    await populateLaunchesDB();
  }
};

export const scheduleNewLaunch = async (launch: Launch) => {
  const planetExists = await planetsDatabase.findOne({
    kepler_name: launch.target
  });

  if (!planetExists) {
    throw new Error('No matching planet found');
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(
    {
      success: true,
      upcoming: true,
      customers: ['ZTM', 'NASA'],
      flightNumber: newFlightNumber
    },
    launch
  );

  await saveLaunch(newLaunch);
  //@ts-ignore
  delete newLaunch.$setOnInsert;
  return newLaunch;
};

const findLaunch = async (filter: any) => {
  return await launchesDatabase.findOne(filter);
};

export const launchExistsWithId = async (flightNumber: number) => {
  return await findLaunch({ flightNumber });
};

export const abortLaunch = async (flightNumber: number) => {
  const document = await launchesDatabase.updateOne(
    {
      flightNumber
    },
    {
      upcoming: false,
      success: false
    }
  );
  return (
    document.acknowledged &&
    document.matchedCount === 1 &&
    document.modifiedCount === 1
  );
};
