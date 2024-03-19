# React Native Bottom Navigation Bar

## Description 
As a user navigating the mobile app, users can easily access main sections and additional options through a well-designed interface.

## Features 
 ** Bottom Navigation **
 users able to see the bottom tab icons and when click on that icon they will navigate to the screens
 
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

### Usage
if bottomtabs icons not shown, you can add  (android/app/src/main/java/MainActivity.java)
import android.os.Bundle;

public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
}

Note: add below file in build.gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

### dependencies:
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
react-native-vector-icons


### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.
