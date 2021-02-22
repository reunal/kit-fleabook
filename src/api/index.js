import axios from 'axios';
import ip from "./ip";

const getBooks = () => {
  return axios.get(`${ip}/books`)
}

export {getBooks}