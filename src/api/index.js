import axios from 'axios';
import ip from "./ip";

const getBooks = ({text, start, len}) => {
  console.log(text, start, len)
  return axios.get(`${ip}/books?start=${text}&len=${len}`)
}

const searchReserve = (stdId) => {
  return axios.get(`${ip}/users/:${stdId}/reservations`);
}

const checkReservePassword = ({userId, password}) => {
  return axios.get(`${ip}/reservations/${userId}/password?password=${password}`);
}

export {getBooks, searchReserve, checkReservePassword}