import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoard from '../screens/OnBoard';
import LogIn from '../screens/LogIn';
import Home from '../screens/Home';
import Location from '../screens/Location';
import Hotel from '../screens/Hotel';
import NearBy from '../screens/NearBy';
import Register from '../screens/Register';
import AdminHotels from '../screens/AdminHotels';
import AdminNearBy from '../screens/AdminNearBy';
import AdminDash from '../screens/AdminDash';
import AddHotel from '../screens/AddHotel';
import AddNearBy from '../screens/AddNearBy';
import {TapGestureHandler} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoard"
        screenOptions={{
          headerShown: TapGestureHandler,
        }}>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="AddHotel"
          options={{headerShown: false}}
          component={AddHotel}
        />
        <Stack.Screen
          name="AdminNearBy"
          options={{headerShown: false}}
          component={AdminNearBy}
        />
        <Stack.Screen
          name="AdminHotels"
          options={{headerShown: false}}
          component={AdminHotels}
        />
        <Stack.Screen
          name="OnBoard"
          options={{headerShown: false}}
          component={OnBoard}
        />
        <Stack.Screen
          name="AddNearBy"
          options={{headerShown: false}}
          component={AddNearBy}
        />
        <Stack.Screen
          name="LogIn"
          options={{headerShown: false}}
          component={LogIn}
        />
        <Stack.Screen
          name="AdminDash"
          options={{headerShown: false}}
          component={AdminDash}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={Register}
        />
        <Stack.Screen
          name="Location"
          options={{headerShown: false}}
          component={Location}
        />
        <Stack.Screen
          name="Hotel"
          options={{headerShown: false}}
          component={Hotel}
        />
        <Stack.Screen
          name="NearBy"
          options={{headerShown: false}}
          component={NearBy}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
