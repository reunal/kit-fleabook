import axios from 'axios';
import ip from "./ip";

/* Home */
const getBooks = () => {
  return axios.get(`${ip}/books`)
}
const searchReserve = (stdId) => {
  return axios.get(`${ip}/users/${stdId}/reservations`);
}

/* My Reserve */
const checkReservePassword = ({reserveId, password}) => {
  return axios.get(`${ip}/reservations/${reserveId}/password?password=${password}`);
}
const editReserve = ({reserveId, password, body}) => {
  return axios.put(`${ip}/reservations/${reserveId}?password=${password}`, body)
}
const cancelReserve = ({bookId, reserveId, password}) => {
  return axios.delete(`${ip}/books/${bookId}/reservations/${reserveId}?password=${password}`);
}

/* BOOK DETAIL */
const addBookRsv = ({ bookId, data }) => {
  return axios.post(`${ip}/books/${bookId}/reservations`, data)
}
const getBookInfo = ({ bookId }) => {
  return axios.get(`${ip}/books/${bookId}`)
}
const getBookStock = ({ bookId }) => {
  return axios.get(`${ip}/books/${bookId}/stocks`)
}
const getBookRsv = ({ bookId }) => {
  return axios.get(`${ip}/books/${bookId}/reservations`)
}


export {getBooks, searchReserve, checkReservePassword, editReserve, cancelReserve, addBookRsv, getBookInfo, getBookStock, getBookRsv}