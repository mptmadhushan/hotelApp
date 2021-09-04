/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../helpers';
import AsyncStorage from '@react-native-community/async-storage';
import APIKit from '../helpers/apiKit';

const Location = ({route, navigation}) => {
  const mapView = React.useRef();

  const [packages, setPackage] = React.useState('');
  const [user, setUser] = React.useState('');
  const [hotels, setHotels] = React.useState([]);
  // const [location, setLocation] = React.useState('');
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [angle, setAngle] = React.useState(0);

  const initialCurrentLocation = {
    streetName: 'Colombo',
    // near race co
    // gps: {
    //   latitude: 6.9057696676889115,
    //   longitude: 79.86027893592619,
    // },

    // // vihara
    gps: {
      latitude: 6.914376,
      longitude: 79.864088,
    },

    // // ccc
    // gps: {
    //   latitude: 6.924152501842479,
    //   longitude: 79.85221046796326,
    // },
  };
  const nearbyLocation = {
    location: {
      latitude: 6.90762293818244,
      longitude: 79.86422714747269,
    },
  };
  const getData = async () => {
    console.log('cis');
    try {
      const jsonValue = await AsyncStorage.getItem('@package');
      const packageName = JSON.parse(jsonValue);
      console.log('packageName 😷', packageName);
      setPackage(packageName);
    } catch (e) {
      console.log('ee', e);
    }
  };
  const getUserData = async () => {
    console.log('cis');
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const packageName = JSON.parse(jsonValue);
      console.log('packageName 😷', packageName);
      setUser(packageName);
    } catch (e) {
      console.log('ee', e);
    }
  };

  const toHotel = hotel => {
    console.log(':sad', hotel);
    console.log(':setUser', user);
    const payload = {hotel, user};
    const onSuccess = ({data}) => {
      console.log(data);
      navigation.navigate('Hotel', {hotel});
    };

    const onFailure = error => {
      console.log('error', error);
      // setLoading(false);

      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made

    APIKit.post(`/book`, payload).then(onSuccess).catch(onFailure);
  };
  const getHotels = smallest => {
    const newLocation = smallest.location.name;
    console.log(':sad', packages);
    console.log(newLocation);
    const onSuccess = ({data}) => {
      console.log(data);
      setHotels(data);
    };

    const onFailure = error => {
      console.log('error', error);
      // setLoading(false);

      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made

    APIKit.get(`/hotels/find/${packages}/${newLocation}`)
      .then(onSuccess)
      .catch(onFailure);
  };
  const getDirection = (lat1, lon1, lat2, lon2, unit) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    // console.log('disat', dist);

    return dist;
  };
  const getDire = () => {
    var poslat = initialCurrentLocation.gps.latitude;
    var poslng = initialCurrentLocation.gps.longitude;
    var smallest = {
      location: {
        latitude: 6.913660659567421,
        longitude: 79.86175634588763,
        name: '',
        dist: 1,
      },
    };

    for (var i = 0; i < data.length; i++) {
      // console.log(
      //   getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K'),
      //   data[i].location,
      // );
      if (
        getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K') <
        smallest.location.dist
      ) {
        smallest = getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K');
        smallest = {
          location: {
            latitude: parseFloat(data[i].lat),
            longitude: parseFloat(data[i].lng),
            name: data[i].location,
            dist: getDirection(poslat, poslng, data[i].lat, data[i].lng, 'K'),
          },
        };
      }
    }
    console.log('smallest', smallest);
    // console.log('get pack', packages);
    setToLocation(smallest.location);
    test;
    const test = setTimeout(function () {
      console.log('call');
      getHotels(smallest, packages);
    }, 3000);
  };
  var data = [
    {
      code: '0001',
      lat: '6.905141258229491',
      lng: ' 79.86350831547918',
      location: 'Race Course',
    },
    {
      code: '0002',
      lat: '6.917638298275269',
      lng: '79.85516576032148',
      location: 'CCC',
    },
    {
      code: '0003',
      lat: '6.914976444483723',
      lng: '79.86291069755504',
      location: 'Viharamaha devi park',
    },
  ];
  function getLocation() {
    const lat = initialCurrentLocation.gps.latitude;
    const lng = initialCurrentLocation.gps.longitude;
    console.log('lat, latlng');
    console.log(lat, lng);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBw9KFdObw6LqsJJR0Mln1acv4nqjVk7sg`,
      )
      .then(function (response) {
        // console.log('lca', response.data.results[0].formatted_address);
        console.log('response 🧑‍🚀🍀', response.data);
        const locationName = response.data.results[0].formatted_address;
        var myArray = locationName.split(',');
        console.log('myArray[0] 🚂🚂');
        console.log(myArray[0]);
        setStreetName(myArray[0]);
      })
      .catch(function (error) {
        console.log('error ', error);
      });
  }
  React.useEffect(() => {
    getLocation();
    getData();
    getUserData();
    getDire();
    console.log('toLocation', toLocation);
    let fromLoc = initialCurrentLocation.gps;
    let toLoc = nearbyLocation.location;
    let street = initialCurrentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    // setRestaurant(restaurant);
    // setStreetName(street);
    setFromLocation(fromLoc);
    // setToLocation(toLoc);
    setRegion(mapRegion);
  }, [packages]);

  function calculateAngle(coordinates) {
    let startLat = coordinates[0]['latitude'];
    let startLng = coordinates[0]['longitude'];
    let endLat = coordinates[1]['latitude'];
    let endLng = coordinates[1]['longitude'];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function renderMap() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: COLORS.secondary,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.pin}
              style={{
                width: 25,
                height: 25,
                // tintColor: COLORS.primary,
              }}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}>
        <Image
          source={icons.car}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );

    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{flex: 1}}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={result => {
              setDuration(result.duration);

              if (!isReady) {
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });

                // Reposition the car
                let nextLoc = {
                  latitude: result.coordinates[0]['latitude'],
                  longitude: result.coordinates[0]['longitude'],
                };

                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }

                setFromLocation(nextLoc);
                setIsReady(true);
              }
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }

  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          // height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.secondary,
            height: 40,
            width: SIZES.width * 0.5,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
            margin: 10,
            marginLeft: SIZES.width * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'red',
            shadowOffset: {
              width: 12,
              height: 12,
            },
            shadowOpacity: 0.98,
            shadowRadius: 16.0,
            elevation: 24,
            paddingHorizontal: 10,
          }}>
          <Text style={{...FONTS.h4, color: COLORS.white}}>Nearby Hotels</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            shadowOffset: {
              width: 12,
              height: 12,
            },
            elevation: 24,
            shadowOpacity: 0.98,
            shadowRadius: 16.0,
          }}>
          <Image
            source={icons.loc}
            style={{
              width: 20,
              height: 20,
              marginRight: SIZES.padding,
            }}
          />

          <View style={{flex: 1}}>
            <Text style={{...FONTS.body3}}>{streetName}</Text>
          </View>

          <Text style={{...FONTS.body3, color: COLORS.primary}}>
            {Math.ceil(duration)} mins
          </Text>
        </View>
      </View>
    );
  }

  function renderInfo() {
    let Image_Http_URL = {
      uri: 'https://images.unsplash.com/photo-1602661200615-bbaf890d3f72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3300&q=80',
    };
    return (
      <View
        style={{
          position: 'absolute',
          top: SIZES.height * 0.6,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={150}
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 90 : 80,
            paddingHorizontal: 10,
            flex: 1,
          }}
          contentInset={{
            // iOS only
            top: 0,
            left: 0,
            bottom: 0,
            right: 20,
          }}
          contentContainerStyle={{
            paddingRight: Platform.OS === 'android' ? 20 : 0,
          }}>
          {hotels
            ? hotels.map((hotel, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    padding: 8,
                    // paddingHorizontal: 20,
                    marginHorizontal: 10,
                    shadowColor: '#ccc',
                    shadowOffset: {width: 0, height: 3},
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    elevation: 10,
                  }}>
                  {/* {category.hotel_name} */}

                  <Image
                    source={Image_Http_URL}
                    resizeMode="contain"
                    style={{
                      resizeMode: 'cover',
                      borderRadius: 5,
                      width: SIZES.width * 0.6,
                      height: SIZES.width * 0.2,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: SIZES.width * 0.6,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{...FONTS.body4, color: COLORS.black}}>
                      {hotel.hotel_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: SIZES.width * 0.2,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <Icon
                        name="swimming-pool"
                        size={15}
                        color={COLORS.secondary}
                      />
                      <Icon name="hot-tub" size={15} color={COLORS.secondary} />
                      <Icon name="bed" size={15} color={COLORS.secondary} />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      maxHeight: 40,
                      margin: 4,
                      backgroundColor: COLORS.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      width: SIZES.width * 0.3,
                    }}
                    onPress={() => {
                      toHotel(hotel);
                    }}>
                    <Text style={{...FONTS.b4, color: COLORS.white}}>
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}>
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomIn()}>
          <Text style={{...FONTS.body1}}>+</Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => zoomOut()}>
          <Text style={{...FONTS.body1}}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderInfo()}
      {renderButtons()}
    </View>
  );
};

export default Location;
