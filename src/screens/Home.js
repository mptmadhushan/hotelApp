/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import APIKit from '../helpers/apiKit';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default function Home({navigation}) {
  useEffect(() => {
    getPackages();
    getLocation();
  }, []);
  const initialCurrentLocation = {
    streetName: 'Colombo',
    //near race co
    // gps: {
    //   latitude: 6.9057696676889115,
    //   longitude: 79.86027893592619,
    // },

    // vihara
    // gps: {
    //   latitude: 6.914376,
    //   longitude: 79.864088,
    // },

    // ccc
    gps: {
      latitude: 6.924152501842479,
      longitude: 79.85221046796326,
    },
  };
  function getLocation() {
    const lat = initialCurrentLocation.gps.latitude;
    const lng = initialCurrentLocation.gps.longitude;
    console.log('lat, latlng');
    console.log(lat, lng);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBtHq3XrOo46QVQ5aCrxp-upRjiKxzKfpQ`,
      )
      .then(function (response) {
        // console.log('lca', response.data.results[0].formatted_address);
        // console.log('response 🧑‍🚀🍀', response.data);
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
  const [packages, setData] = useState('');
  const [streetName, setStreetName] = React.useState('');

  const data = [
    {
      pkgName: 'pkg1',
      pkgPrice: '0 - 5000',
      src: require('../assets/p1.jpeg'),
      package: 5000,
    },
    {
      pkgName: 'pkg2',
      pkgPrice: '15000 - 30000',
      src: require('../assets/p2.jpeg'),
      package: 15000,
    },
    {
      pkgName: 'pkg3',
      pkgPrice: '30000 - 50000',
      src: require('../assets/p3.jpeg'),
      package: 30000,
    },
    {
      pkgName: 'pkg4',
      pkgPrice: '50000+',
      src: require('../assets/p4.jpeg'),
      package: 50000,
    },
  ];

  const toLocation = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@package', jsonValue);
      console.log(value);
      navigation.navigate('Location');
    } catch (e) {
      // saving error
    }
  };
  const getPackages = () => {
    const onSuccess = ({data}) => {
      // setLoading(false);
      console.log(data);
      setData(data);
    };

    const onFailure = error => {
      console.log('error', error);
      // setLoading(false);

      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made

    APIKit.get('/hotels/findAllPackages').then(onSuccess).catch(onFailure);
  };
  let Image_Http_URL = {
    uri: 'https://images.unsplash.com/photo-1613429547334-553cddaa781f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80',
  };
  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('OnBoard');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowNorm}>
        <Icon name="location-sharp" size={20} color={COLORS.secondary} />
        <Text style={styles.title2}>{streetName}</Text>
        <TouchableOpacity onPress={() => logOut()} style={styles.btnLog}>
          <Text style={styles.text001}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title1}>Explore</Text>
        <Text style={styles.title1}>Colombo</Text>
      </View>
      <Text style={styles.text001}>Select Package</Text>
      {data ? (
        <Swiper style={styles.wrapper} showsButtons={false}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => toLocation(item.package)}
              key={item.package}
              style={styles.slide1}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 30,
                  padding: 20,
                }}>
                <Image
                  source={item.src}
                  resizeMode="contain"
                  style={{
                    resizeMode: 'cover',
                    borderRadius: 50,
                    width: SIZES.width * 0.6,
                    height: SIZES.width * 0.5,
                  }}
                />
                <Text style={styles.title1}>Package - {index}</Text>
                <Text style={styles.text}>
                  Qui cupidatat enim aliqua excepteur do consequat.
                </Text>
              </View>
              <Text style={[styles.text, {padding: 10}]}>
                LKR.{item.pkgPrice}
              </Text>
            </TouchableOpacity>
          ))}
        </Swiper>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 50,
    margin: 40,
    // width: SIZES.width * 0.8,
  },
  btnLog: {
    backgroundColor: COLORS.secondary,
    height: 40,
    width: 100,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    margin: 10,
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
  },
  title2: {
    color: COLORS.back,
    fontSize: 20,
  },
  text001: {
    color: COLORS.primary,
    fontSize: 15,
  },
  title1: {
    color: COLORS.back,
    fontWeight: 'bold',
    fontSize: 40,
  },
  rowNorm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
