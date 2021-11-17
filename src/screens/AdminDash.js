/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import APIKit from '../helpers/apiKit';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default function AdminDash({navigation}) {
  useEffect(() => {}, []);

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

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('OnBoard');
    } catch (e) {
      console.log(e);
    }
  };

  const addHotel = item => {
    console.log(item);
    navigation.navigate('AddHotel', {item});
  };
  const addNearBy = item => {
    console.log(item);
    navigation.navigate('AddNearBy', {item});
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowNorm}>
        <Text style={styles.title1}></Text>
        <TouchableOpacity onPress={() => logOut()} style={styles.btnLog}>
          <Text style={styles.text002}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowNorm}>
        <Text style={styles.title1}>Add Hotels</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminHotels')}
          style={styles.btn}>
          <Text style={styles.text002}>View Hotels</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text001}>Select Package</Text>
      {data ? (
        <Swiper style={styles.wrapper} showsButtons={false}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => addHotel(item.package)}
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
                    height: SIZES.width * 0.3,
                  }}
                />
                <Text style={styles.title1}>Package - {index}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Swiper>
      ) : null}
      <View style={styles.rowNorm}>
        <Text style={styles.title1}>Add NearBy Location</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminNearBy')}
          style={styles.btn}>
          <Text style={styles.text002}>View NearBy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text001}>Select Package</Text>
      {data ? (
        <Swiper style={styles.wrapper} showsButtons={false}>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => addNearBy(item.package)}
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
                    height: SIZES.width * 0.3,
                  }}
                />
                <Text style={styles.title1}>Package - {index}</Text>
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 50,
    margin: 49,
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
  btn: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 100,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
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
    color: COLORS.secondary,
    fontSize: 15,
  },
  text002: {
    color: COLORS.white,
    fontSize: 15,
  },
  title1: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowNorm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
  },
});
