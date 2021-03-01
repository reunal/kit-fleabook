import axios from 'axios';
import ip from "./ip";

const getBooks = ({text, start, len}) => {
  return axios.get(!start || !len ? `${ip}/books` : `${ip}/books?text=${text}start=${start}&len=${len}`)
}

const searchReserve = (stdId) => {
  return axios.get(`${ip}/users/:${stdId}/reservations`);
}

const checkReservePassword = ({userId, password}) => {
  return axios.get(`${ip}/reservations/${userId}/password?password=${password}`);
}

export {getBooks, searchReserve, checkReservePassword}