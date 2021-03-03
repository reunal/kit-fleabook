import axios from 'axios';
import ip from "./ip";

/* Home */
const getBooks = ({start, len}) => {
  return axios.get(`${ip}/books?start=${start}&len=${len}`)
}
const searchReserve = (stdId) => {
  return axios.get(`${ip}/users/${stdId}/reservations`);
}

/* My Reserve */
const checkReservePassword = ({stdId, password}) => {
  return axios.get(`${ip}/reservations/${stdId}/password?password=${password}`);
}
const editReserve = ({reservationId, password}) => {
//   {
//     "time":"2021-02-12-15",
//     "isCancle":"dfs",
//     "password":"fds",
//     "studentId":"fds",
//     "name":"fds",
//     "title":"fds",
//     "bookId":"fdsfds"
// }
  return axios.put(`${ip}/reservations/${reservationId}?password=${password}`)
}
const cancelReserve = ({bookId, reserveId, password, data}) => {
  return axios.delete(`${ip}/books/${bookId}/reservations/:${reserveId}?password=${password}`, data);
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

export {getBooks, searchReserve, checkReservePassword, editReserve, cancelReserve, addBookRsv, getBookStock, getBookRsv}