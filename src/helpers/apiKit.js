import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'https://hotelapp-backend.herokuapp.com/api/',
  timeout: 10000,
});

export default APIKit;
