import React from 'react';
import {Text,View,StyleSheet,Dimensions} from 'react-native'
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './src/screens/google/Map';
// import CurrentLocation from './src/screens/google/currentLocation';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name={'MapScreen'} component={MapScreen} options={{headerShown:false
          // headerTitle: 'GoogleMaps',
          // headerTitleAlign: 'center',
          // headerStyle:{
          // backgroundColor:'orange'        
        //}
      }}
        ></Stack.Screen>
      </Stack.Navigator>
        </NavigationContainer>
  )
}
export default App;
