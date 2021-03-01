import axios from 'axios';
import ip from "./ip";

/* Home */
const getBooks = ({text, start, len}) => {
  console.log(text, start, len)
  return axios.get(`${ip}/books?start=${text}&len=${len}`)
}
const searchReserve = (stdId) => {
  return axios.get(`${ip}/users/:${stdId}/reservations`);
}

/* My Reserve */
const checkReservePassword = ({userId, password}) => {
  return axios.get(`${ip}/reservations/${userId}/password?password=${password}`);
}

/* BOOK DETAIL */
const addBookRsv = ({bookId, data}) => {
  return axios.post(`${ip}/books/${bookId}/reservation`, data)
}
const getBookStock = ({bookId}) => {
  return axios.get(`${ip}/books/${bookId}/stocks`)
}
const getBookRsv = ({bookId}) => {
  return axios.get(`${ip}/books/${bookId}/reservations`)
}

export {getBooks, searchReserve, checkReservePassword, addBookRsv, getBookStock, getBookRsv}