import launchesDatabase from './launches.mongo.js';
import planetsDatabase from './planets.mongo.js';
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
const getLatestFlightNumber = async () => {
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return 100;
    }
    return latestLaunch.flightNumber;
};
export const fetchAllLaunches = async () => {
    return await launchesDatabase.find({}, { _id: 0, __v: 0 });
};
const saveLaunch = async (launch) => {
    const planetExists = await planetsDatabase.findOne({
        kepler_name: launch.target
    });
    if (!planetExists) {
        throw new Error('No matching planet found');
    }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
};
// @ts-ignore
saveLaunch(launch);
export const scheduleNewLaunch = async (launch) => {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign({
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: newFlightNumber
    }, launch);
    await saveLaunch(newLaunch);
    //@ts-ignore
    delete newLaunch.$setOnInsert;
    return newLaunch;
};
export const launchExistsWithId = async (flightNumber) => {
    return await launchesDatabase.findOne({ flightNumber });
};
export const abortLaunch = async (flightNumber) => {
    const document = await launchesDatabase.updateOne({
        flightNumber
    }, {
        upcoming: false,
        success: false
    });
    return (document.acknowledged &&
        document.matchedCount === 1 &&
        document.modifiedCount === 1);
};
