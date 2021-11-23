/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import Toast from 'react-native-simple-toast';
import APIKit from '../helpers/apiKit';
import Loader from '../components/Loader';
const AddNearBy = ({navigation, route}) => {
  const {item} = route.params;

  const [place, setPlace] = useState('');
  const [near_by_place, setNearBy] = useState('');
  const [branches, setBranches] = useState('');
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState('');

  const onPressLogin = () => {
    setLoading(true);
    const payload = {
      place: place,
      near_by_place: near_by_place,
      distance: distance,
      branches: branches,
    };
    console.log('send data', payload);
    const onSuccess = ({data}) => {
      setLoading(false);
      Toast.showWithGravity('Successfully Added', Toast.LONG, Toast.TOP);
      console.log('suc', data);
      setPlace('');
      setNearBy('');
      setDistance('');
      setBranches('');
    };

    const onFailure = error => {
      console.log('error', error);
      setLoading(false);
      Toast.showWithGravity(error.response.data.message, Toast.LONG, Toast.TOP);
      setLoading(true);
    };
    APIKit.post('nearBy', payload).then(onSuccess).catch(onFailure);
  };
  return (
    <ImageBackground
      style={styles.mainBody}
      source={require('../assets/images/reg.jpg')}>
      <KeyboardAvoidingView
        style={styles.mainBody}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Loader loading={loading} />

        <View style={styles.centerFlex}>
          <Text style={styles.text002}>Add NearBy</Text>
        </View>
        <View style={styles.centerFlex}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: SIZES.width * 0.56,
              height: SIZES.width * 0.56,
              marginBottom: SIZES.height * 0.05,
            }}
          />
        </View>

        <View style={styles.rowFlex}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[styles.inputStyle]}
              onChangeText={text => setPlace(text)}
              placeholder="Place"
              placeholderTextColor={COLORS.black}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              value={place}
            />
          </View>
        </View>
        <View style={styles.rowFlex}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[styles.inputStyle]}
              onChangeText={Hotel => setNearBy(Hotel)}
              placeholder="NearBy Place Name"
              placeholderTextColor={COLORS.black}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              value={near_by_place}
            />
          </View>
        </View>
        <View style={styles.rowFlex}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[styles.inputStyle]}
              onChangeText={text => setBranches(text)}
              placeholder="Branches"
              placeholderTextColor={COLORS.black}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              value={branches}
            />
          </View>
        </View>
        <View style={styles.rowFlex}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={[styles.inputStyle]}
              onChangeText={text => setDistance(text)}
              placeholder="Distance"
              placeholderTextColor={COLORS.black}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              value={distance}
            />
          </View>
        </View>
        <View style={styles.centerFlex}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => onPressLogin()}>
            <Text style={styles.buttonTextStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default AddNearBy;

const styles = StyleSheet.create({
  centerFlex: {
    alignItems: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SIZES.width * 0.1,
    alignContent: 'center',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
  },
  SectionStyle: {
    borderRadius: 30,
    borderColor: COLORS.black,
    borderWidth: 1,
    height: 40,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.secondary,
    borderWidth: 0,
    color: COLORS.black,
    height: 40,
    width: 130,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: SIZES.height * 0.1,
  },
  text002: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 35,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: COLORS.black,
    paddingLeft: 15,
    paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  inputStyleError: {
    flex: 1,
    color: COLORS.third,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    width: SIZES.width * 0.7,
  },
  registerTextStyle: {
    color: '#4c5a5b',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
