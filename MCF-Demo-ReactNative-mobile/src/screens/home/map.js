import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,Button,PermissionsAndroid,Linking, Alert, FlatListComponent } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FullRoundButtonComp from '../../components/FullRoundButtonComp';
import { useFontSize } from '../settingsContent/FontSizeContent';
import { useLanguage } from '../settingsContent/LanguageContent';
import { useTheme } from '../settingsContent/ThemeContext';
import AnalyticsScreen from '../analyticsCode/AnalyticsScreen';
const MapScreen = () => {
  const { fontSize } = useFontSize();
  const { getTextForSelectedLanguage } = useLanguage();
  const { isDarkMode } = useTheme();
  const [source, setSource] = useState({latitude:17.3850,longitude:78.4867});
  const [destination, setDestination] = useState({ latitude: 17.3850, longitude: 78.4867 });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [checkFlg,setcheckFlg] = useState(false)
  const [PERMISSIONS,setPERMISSIONS] = useState(true);
  const [isSourceValid,setIsSourceValid]=useState(false);
  const [isDestinationValid,setIsDestinationValid]=useState(false);

  const handleSourcePress = (data, details) => {
    setcheckFlg(false)
    setIsSourceValid(true)

    setSource({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const handleDestinationPress = (data, details) => {

    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setcheckFlg(false)
    setIsDestinationValid(true);
  };
  const getCurrentLocation=async()=>{
    if (PERMISSIONS) {
      setcheckFlg(true)
    }else{
      console.log("Permission Denied22",PERMISSIONS);

      requestLocationPermission()

    }
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setCurrentLocation(PERMISSIONS ? currentLocation:true) 
          setPERMISSIONS(true)
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ latitude, longitude });
            },
            (error) => {
              console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          setPERMISSIONS(false)
          Alert.alert(getTextForSelectedLanguage('locationDenied'))
          console.log('Location permission denied');
        }
      } catch (err) {
        
        console.warn(err);
      }
    };
    requestLocationPermission(); 
  }, []);

  const openGoogleMaps = () => {
    if (!isSourceValid && !isDestinationValid) {
      setIsSourceValid(true);
      Alert.alert(getTextForSelectedLanguage('invalidInput'), getTextForSelectedLanguage('sourceAndDestinationAlert'));
      return;
    }else if (!isSourceValid){
      Alert.alert(getTextForSelectedLanguage('invalidInput'), getTextForSelectedLanguage('sourceAlert'));

    }else if (!isDestinationValid){
      Alert.alert(getTextForSelectedLanguage('invalidInput'), getTextForSelectedLanguage('destinationAlert'));

    }else{
      if (
        source.latitude === destination.latitude &&
        source.longitude === destination.longitude
      ) {
        Alert.alert(getTextForSelectedLanguage('invalidInput'),getTextForSelectedLanguage('sourceDestinationSameAlert'));
        return;
      }
      
      const sourceStr = `${source.latitude},${source.longitude}`;
      const destinationStr = `${destination.latitude},${destination.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceStr}&destination=${destinationStr}`;
      Linking.openURL(url);
    }
  
    
  };
return (
  <View style={[styles.container,{backgroundColor:isDarkMode?'#333':'white'}]}>
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: checkFlg ? currentLocation?.latitude : source.latitude,
        longitude: checkFlg ? currentLocation?.longitude : source.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      zoomEnabled
      zoomControlEnabled
    >
      <Marker coordinate={source} title="Source" />
      <Marker coordinate={destination} title="Destination" />
      <MapViewDirections
        origin={source}
        destination={destination}
        apikey="AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M"
        strokeWidth={3}
        strokeColor="hotpink"
      />
    </MapView>
    <View style={[styles.inputsContainer]}>
      <GooglePlacesAutocomplete
        placeholder={getTextForSelectedLanguage('source')}
        onPress={handleSourcePress}
        query={{ key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M" }}
        fetchDetails={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log('no results')}

      />
      <GooglePlacesAutocomplete
        placeholder={getTextForSelectedLanguage('destination')}
        onPress={handleDestinationPress}
        query={{ key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M" }}
        fetchDetails={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log('no results')}
      />
    </View>
    <View style={styles.buttonsContainer}>
      <FullRoundButtonComp image={require('../../asserts/location.png')} onPress={getCurrentLocation} />
      <FullRoundButtonComp image={require('../../asserts/directions.png')} onPress={()=>openGoogleMaps()} />
    </View>
    <AnalyticsScreen screenName='MapScreen' screenClass='MapScreen'/>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  inputsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
});
export default MapScreen;
