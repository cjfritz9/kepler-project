import axios from 'axios';
const API_URL = 'http://localhost:8080';

const httpGetPlanets = async () => {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await axios.get(`${API_URL}/planets`);
  return response.data;
};

const httpGetLaunches = async () => {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await axios.get(`${API_URL}/launches`);
  const fetchedLaunches = response.data;
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
};

const httpSubmitLaunch = async (launch) => {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
};

const httpAbortLaunch = async (id) => {
  // TODO: Once API is ready.
  // Delete launch with given ID.
};

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
