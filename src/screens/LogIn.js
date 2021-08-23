/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import Toast from 'react-native-simple-toast';
import APIKit, {setClientToken} from '../helpers/apiKit';

import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const passwordInputRef = createRef();
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      navigation.navigate('Home');
    } catch (e) {
      // saving error
    }
  };
  const onPressLogin = () => {
    const username = userEmail;
    const password = userPassword;
    const payload = {username, password};
    console.log('send data', payload);

    const onSuccess = ({data}) => {
      setLoading(false);
      storeData(data);
      console.log('suc', data);
    };

    const onFailure = error => {
      console.log('error', error);
      setLoading(false);

      // this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made
    setLoading(true);

    APIKit.post('/auth/signin', payload).then(onSuccess).catch(onFailure);
  };
  return (
    <ImageBackground
      style={styles.mainBody}
      source={require('../assets/images/valeria-andersson-0IGhARplNzY-unsplash.jpg')}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          width: SIZES.width,

          // alignItems: 'flex-end',
          // alignContent: 'center',
        }}>
        <View style={styles.centerFlex}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: SIZES.width * 0.56,
              height: SIZES.width * 0.56,
              // marginBottom: SIZES.height * 0.1,
              // tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.rowFlex}>
            {/* <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            /> */}
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  userNameError ? styles.inputStyleError : '',
                ]}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Username"
                placeholderTextColor={COLORS.white}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
          </View>
          <View style={styles.rowFlex}>
            {/* <Image
              source={icons.lock}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            /> */}
            <View style={styles.SectionStyle}>
              <TextInput
                style={[
                  styles.inputStyle,
                  passwordError ? styles.inputStyleError : '',
                ]}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Password" //12345
                placeholderTextColor={COLORS.white}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
          </View>
          <View style={styles.centerFlex}>
            <View style={styles.centerFlex}>
              <TouchableOpacity
                // style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonTextStyle2}>
                  Don't have an account? register here.
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => onPressLogin()}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SIZES.width * 0.1,
    alignContent: 'center',
  },
  mainBody: {
    // backgroundColor: '#FAFAFA',
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  SectionStyle: {
    // backgroundColor: COLORS.secondary,
    borderRadius: 30,
    borderColor: COLORS.white,
    borderWidth: 1,
    height: 40,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.secondary,
    borderWidth: 0,
    color: COLORS.white,
    height: 40,
    width: 130,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
  buttonStyle2: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: COLORS.white,
    height: 30,
    width: 130,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextStyle2: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    width: SIZES.width,
    paddingTop: 10,
    paddingRight: 70,
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.white,
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
