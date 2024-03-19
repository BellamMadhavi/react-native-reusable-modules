# React Native Setings,Theme,language, sync, offline Access

## Description 
Users can swiftly change the app language, adjust font size or style, and switch between predefined or custom themes in the Settings.Changes are applied instantly across the entire app interface.

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

### HomeScreen Component

The HomeScreen component is a React Native screen that displays a list of organizations fetched from an API or stored offline. It allows users to search for specific organizations and toggle between search mode and normal mode.

## Overview

The HomeScreen component integrates various functionalities such as fetching data from an API, storing data offline using AsyncStorage, searching organizations, and toggling between search mode and normal mode.

## Features

- Display a list of organizations fetched from an API or stored offline.
- Search for specific organizations using a search input field.
- Toggle between search mode and normal mode.
- Handle network connectivity changes and fetch data accordingly.
- Support for multiple languages and dark mode themes.

## dependencies

1. Install the required dependencies:
   - `@react-native-async-storage/async-storage`: For storing data offline.
   - `@react-native-community/netinfo`: For handling network connectivity.
   - `react-native-vector-icons`: For rendering icons in the UI.


### SettingsScreen Component

The SettingsScreen component is a React Native screen that allows users to configure various settings such as theme, font size, language, and data synchronization.

## Overview

The SettingsScreen component provides a user-friendly interface for users to customize their app experience. It integrates functionalities such as toggling between light and dark themes, adjusting font size, selecting preferred language, and synchronizing data with a remote server.

## Features

- Toggle between light and dark themes.
- Adjust font size for better readability.
- Select preferred language from available options.
- Synchronize data with a remote server to update local data.
- Supports multiple languages and theme modes.

## dependencies

1. Install the required dependencies:
   - `@react-native-async-storage/async-storage`: For storing data offline.
   - `@react-native-community/netinfo`: For handling network connectivity.
   - `@react-native-picker/picker`: For rendering picker component.
   - `react-native-vector-icons`: For rendering icons in the UI.

### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.



