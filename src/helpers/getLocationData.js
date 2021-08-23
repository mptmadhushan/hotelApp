import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode',
  timeout: 10000,
});

export const setClientToken = token => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTA1Y2VhNmQ5YzdhMDcyMDkxZThkYiIsInVzZXJuYW1lIjoidGVzdERyaXZlciIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2MjU3MjY0MzcsImV4cCI6MTYyNTczMDAzN30.-qwUeF4BFcfEVcRTFi1OwIeTdQxiW6O7KU7CJqGd8tk';
    return config;
  });
};

export default APIKit;
// https://maps.googleapis.com/maps/api/geocode/json?components=locality:santa+cruz|country:ES
// &key=AIzaSyDXTRQhecUFLgS4BNzLhsP-Mp-9CCdwVKg
