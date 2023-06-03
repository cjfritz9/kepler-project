const launches = new Map();

let latestFlightNumber = 100;

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: typeof Date;
  target: string;
  customer: string[];
  upcoming: boolean;
  success: boolean;
}

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
};

launches.set(launch.flightNumber, launch);

export const fetchAllLaunches = () => {
  return Array.from(launches.values());
};

export const addNewLaunch = (launch: Launch) => {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      customers: ['ZTM', 'NASA'],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true
    })
  );
};

export const destroyLaunch = (flightNumber: number) => {
  launches.delete(flightNumber);
};
