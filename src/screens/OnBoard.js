import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';

export default function OnBoard({navigation}) {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/valeria-andersson-0IGhARplNzY-unsplash.jpg')}>
      <Text style={styles.title}>Work save</Text>
      <Text style={styles.title2}>Travel Repeat</Text>
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Home');
            navigation.navigate('LogIn');
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Let's Tour</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  container2: {
    width: SIZES.width,
    alignItems: 'flex-end',
  },
  btn: {
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
  btnText: {
    color: COLORS.white,
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 40,
    marginLeft: SIZES.width * 0.5,
    marginTop: SIZES.height * 0.6,
  },
  title2: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 60,
    textAlign: 'center',
  },
});
