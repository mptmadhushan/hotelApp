import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'https://hotelapp-backend.herokuapp.com/api/',
  // baseURL: 'http://192.168.8.102:8088/api/',
  timeout: 10000,
});

export default APIKit;
