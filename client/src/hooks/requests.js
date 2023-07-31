import axios from 'axios';
const API_URL = 'v1';

export const httpGetPlanets = async () => {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await axios.get(`${API_URL}/planets`);
  return response.data;
};

export const httpGetLaunches = async () => {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await axios.get(`${API_URL}/launches`);
  const fetchedLaunches = response.data;
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
};

export const httpSubmitLaunch = async (launch) => {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  // const response = await axios.post(`${API_URL}/launches`, launch);
  const response = await axios
    .post(`${API_URL}/launches`, launch)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log('response error: ', error);
      return { error: '404: Bad Request' };
    });
  return response;
};

export const httpAbortLaunch = async (id) => {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  const response = await axios
    .delete(`${API_URL}/launches/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log('response error: ', error);
      return { error: '404: Bad Request' };
    });
  return response;
};

