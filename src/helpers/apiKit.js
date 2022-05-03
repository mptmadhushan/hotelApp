import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'https://restaurant-ml-app.herokuapp.com/api/v1.0/',
  timeout: 10000,
});

export default APIKit;
