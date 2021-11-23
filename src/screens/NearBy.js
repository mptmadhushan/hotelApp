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
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../helpers';
import AsyncStorage from '@react-native-community/async-storage';
import APIKitGoogle from '../helpers/getLocationData';
import APIKit from '../helpers/apiKit';
import GetLocation from 'react-native-get-location';

const NearByScreen = ({route, navigation}) => {
  const mapView = React.useRef();
  const initialCurrentLocation = {
    streetName: 'Colombo',
    gps: {
      latitude: 6.919358,
      longitude: 79.854344,
    },
  };
  const {bHotel} = route.params;
  const [packages, setPackage] = React.useState('');
  const [booked, setBookHotel] = React.useState([]);
  const [rData, setRdata] = React.useState(bHotel);
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(
    initialCurrentLocation.gps,
  );
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [angle, setAngle] = React.useState(0);

  const nearbyLocation = {
    location: {
      latitude: 6.90762293818244,
      longitude: 79.86422714747269,
    },
  };

  const toNearBy = nearByPlace => {
    console.log(':sad', nearByPlace);
    getHotelAddress2(nearByPlace);
  };
  const getNearBy = () => {
    const onSuccess = ({data}) => {
      console.log(data);
      setBookHotel(data);
      // navigation.navigate('Location', {data, hotel});
    };

    const onFailure = error => {
      console.log('error', error);
    };

    // Show spinner when call is made

    APIKit.get(`/nearBy/find/${bHotel.place}`).then(onSuccess).catch(onFailure);
  };
  const getHotelAddress2 = nearByPlace => {
    console.log(':sad', nearByPlace.near_by_place);
    setRdata(nearByPlace);
    const onSuccess = ({data}) => {
      console.log(data.results[0].geometry.location);
      const nearbyLocation2 = {
        location: {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        },
        // setBookHotel(data);
      };
      setToLocation(nearbyLocation2.location);
    };

    const onFailure = error => {
      console.log('error', error);
      // setLoading(false);

      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made

    APIKitGoogle.get(
      `/json?components=locality:${nearByPlace.near_by_place}|country:LK&key=AIzaSyBtHq3XrOo46QVQ5aCrxp-upRjiKxzKfpQ`,
    )
      .then(onSuccess)
      .catch(onFailure);
  };
  const getHotelAddress = () => {
    console.log(':sad', bHotel.near_by_place);

    const onSuccess = ({data}) => {
      console.log(data.results[0].geometry.location);
      const nearbyLocation = {
        location: {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        },
        // setBookHotel(data);
      };
      setToLocation(nearbyLocation.location);
    };

    const onFailure = error => {
      console.log('error', error);
      // setLoading(false);

      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made

    APIKitGoogle.get(
      `/json?components=locality:${bHotel.near_by_place}|country:LK&key=AIzaSyBtHq3XrOo46QVQ5aCrxp-upRjiKxzKfpQ`,
    )
      .then(onSuccess)
      .catch(onFailure);
  };

  React.useEffect(() => {
    // getDire();
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        const currGps = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setFromLocation(currGps);
        getLocation(currGps);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn('location error-->', code, message);
      });
    console.log(bHotel);
    getHotelAddress();
    getNearBy();
    // console.log('toLocation', toLocation);
    let fromLoc = initialCurrentLocation.gps;
    let toLoc = nearbyLocation.location;
    let street = initialCurrentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    // setStreetName(street);
    // setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, [packages]);
  function getLocation(currGps) {
    const lat = currGps.latitude;
    const lng = currGps.longitude;
    console.log('lat, latlng');
    console.log(lat, lng);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBtHq3XrOo46QVQ5aCrxp-upRjiKxzKfpQ`,
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
            width: SIZES.width * 0.7,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
            margin: 10,
            marginLeft: SIZES.width * 0.3,
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
          <Text style={{...FONTS.h4, color: COLORS.white}}>
            {rData.near_by_place}
          </Text>
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
            source={icons.pin}
            style={{
              width: 30,
              height: 30,
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
      uri: 'https://images.unsplash.com/photo-1555992457-b8fefdd09069?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3300&q=80',
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
          {booked
            ? booked.map((nearByPlace, index) => (
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
                    source={{uri: nearByPlace.image}}
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
                      {nearByPlace.near_by_place}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: SIZES.width * 0.1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <Icon
                        name="box-tissue"
                        size={15}
                        color={COLORS.secondary}
                      />
                      <Icon
                        name="utensils"
                        size={15}
                        color={COLORS.secondary}
                      />
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
                      toNearBy(nearByPlace);
                    }}>
                    <Text style={{...FONTS.b4, color: COLORS.white}}>
                      Visit Now
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

export default NearByScreen;
