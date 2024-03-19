
# React Native Media Integration

## Description 
Users can upload images, videos, and audio files to share with their friends or to showcase their creations.
The app will support popular media formats and provide basic editing features.
 
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


### ChoosingScreen Component

The ChoosingScreen component is a React Native screen that allows users to choose between video and audio options.

## Overview

The ChoosingScreen component provides a simple interface with buttons to navigate to the VideoScreen and AudioPlay screens.


### VideoScreen Component

The VideoScreen component is a React Native screen that allows users to record videos or choose existing videos from the device library.

## Overview

The VideoScreen component enables users to perform the following actions:

- Record a video using the device camera.
- Choose an existing video from the device library.
- Display the selected or recorded video on the screen with playback controls.

## dependencies

Ensure that you have installed the necessary dependencies for video recording and playback:

- `react-native-image-picker`: For capturing or selecting videos.
- `react-native-fs`: For file system operations.
- `react-native-video`: For video playback.


### AudioPlay Component

The AudioPlay component is a React Native screen that allows users to pick an audio file from their device and play it using the TrackPlayer library.

## Overview

The AudioPlay component enables users to perform the following actions:

- Pick an audio file from the device storage.
- Display information about the selected audio file, including its name, type, and size.
- Play the selected audio file.
- Pause the audio playback.

## dependencies

Ensure that you have installed the necessary dependencies for audio file handling and playback:

- `react-native-document-picker`: For picking audio files.
- `react-native-track-player`: For audio playback.


### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.




