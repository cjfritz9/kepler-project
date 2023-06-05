const launches = new Map();
let latestFlightNumber = 100;
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
export const addNewLaunch = (launch) => {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        customer: ['ZTM', 'NASA'],
        flightNumber: latestFlightNumber,
        upcoming: true,
        success: true
    }));
};
export const launchExistsWithId = (flightNumber) => {
    return launches.has(flightNumber);
};
export const destroyLaunch = (flightNumber) => {
    const aborted = launches.get(flightNumber);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};
