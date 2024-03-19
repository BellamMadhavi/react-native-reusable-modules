# React Native Google Maps 

## Description 
Configure and load Google Maps into the React Native app, allowing users to access their current location, set a source and destination, and navigate through the map interface.
 
## Getting Started
 
Follow these steps to get your project start and running:
### Prerequisites for android

Make sure you have the following installed:
- react-native Environment setUp (https://reactnative.dev/docs/environment-setup)
- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm comes with Node.js

Note : Please follow the React Native installation documentation located in the Documents directory.


### Installation
To install the application, follow these steps:
 
- Clone the repository  
  git clone https://mlmvps@dev.azure.com/mlmvps/MobileApp%20Common%20Features/_git/MCF-IC-All-Mobile

Navigate to the reactnative folder and select required project
- Install dependencies: npm install
- start metro: npx react-native start
- Run the application: npx react-native run-android

### Overview

The MapScreen component integrates various functionalities related to maps, location services, and Google Places Autocomplete. It displays a map with markers for the source and destination locations, allows users to set these locations using Google Places Autocomplete, and provides a button to get directions between the selected points using Google Maps.

## Features

- Display a map with user's current location (if granted permission).
- Set source and destination locations using Google Places Autocomplete.
- Get directions between the selected points using Google Maps Directions API.
- Option to use current location as the source.

## dependencies

1. Install the required dependencies:
   - `react-native-maps`: For displaying maps in React Native.
   - `react-native-geolocation-service`: For accessing device's geolocation.
   - `react-native-google-places-autocomplete`: For implementing Google Places Autocomplete.
   - `react-native-maps-directions`: For fetching directions between two points on the map.

Note :
Add the below components in AndroidManifes.xml file
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>

### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.