/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import APIKit from '../helpers/apiKit';
import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../helpers';
import Loader from '../components/Loader';
import Toast from 'react-native-simple-toast';

const AdminHotels = () => {
  const [hotels, setHotels] = React.useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = () => {
    setLoading(true);
    const onSuccess = ({data}) => {
      setHotels(data);
      setLoading(false);
    };
    const onFailure = error => {
      console.log('error', error);
      setLoading(false);
    };

    APIKit.get('/hotels/findall').then(onSuccess).catch(onFailure);
  };
  const deleteHotels = id => {
    setLoading(true);
    console.log('delete', id);
    const onSuccess = ({data}) => {
      console.log(data);
      setLoading(false);
      setHotels(hotels.filter(item => item.id !== id));
      Toast.showWithGravity('Successfully Deleted', Toast.LONG, Toast.TOP);
    };

    const onFailure = error => {
      console.log('error', error);
      setLoading(false);

      Toast.showWithGravity('Try Again', Toast.LONG, Toast.TOP);
    };

    APIKit.delete(`hotels/${id}`).then(onSuccess).catch(onFailure);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <FlatList
        data={hotels}
        // renderItem={renderItem}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Image
              source={{uri: item.image}}
              resizeMode="contain"
              style={{
                resizeMode: 'cover',
                borderRadius: 5,
                width: SIZES.width * 0.2,
                height: SIZES.width * 0.2,
              }}
            />
            <View>
              <Text style={styles.title}>Hotel Name :{item.title}</Text>
              <Text style={styles.title}>Place :{item.place}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteHotels(item.id)}>
              <Image
                source={icons.deleteIcon}
                resizeMode="contain"
                style={{
                  resizeMode: 'cover',
                  borderRadius: 5,
                  width: SIZES.width * 0.1,
                  height: SIZES.width * 0.1,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderRadius: 5,
    backgroundColor: '#4792f1',
    padding: 20,
    flexDirection: 'row',
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    marginLeft: 16,
    width: SIZES.width * 0.5,
    color: COLORS.white,
  },
});

export default AdminHotels;
