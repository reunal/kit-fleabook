import axios from 'axios';
import ip from "./ip";

const getBooks = () => {
  return axios.get(`${ip}/books`)
}

const searchReserve = (stdId) => {
  return axios.get(`${ip}/users/:${stdId}/reservations`);
}

export {getBooks, searchReserve}