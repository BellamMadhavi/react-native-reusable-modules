# React Native Sharing and collaboration

## Description 
The application should allow users to collaborate on projects by facilitating the sharing of files.
 
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

The ChoosingScreen component is a React Native screen that allows users to navigate to different screens based on their selection.

## Overview

The ChoosingScreen component displays three buttons: Image, Video, and File. When users click on any of these buttons, they are navigated to the corresponding screen: ImageScreen, VideoScreen, or FileScreen.


### ImageScreen Component

The ImageScreen component is a React Native screen that allows users to choose images from the device's gallery or capture images using the device's camera. It also provides an option to share the selected image.

## Overview

The ImageScreen component displays an image along with three buttons: Choose Image, Open Camera, and Share. Users can click on these buttons to select images from the device's gallery, capture images using the device's camera, and share the selected image, respectively.

## dependencies

Before using the ImageScreen component, ensure that you have installed the necessary dependencies and configured your project environment appropriately.
react-native-image-picker
react-native-fs
react-native-share


### VideoScreen Component

The VideoScreen component is a React Native screen that allows users to choose videos from the device's gallery or record videos using the device's camera. It also provides an option to share the selected video.

## Overview

The VideoScreen component displays a video player along with three buttons: Choose Video, Record Video, and Share. Users can click on these buttons to select videos from the device's gallery, record videos using the device's camera, and share the selected video, respectively.

## Installation

Before using the VideoScreen component, ensure that you have installed the necessary dependencies and configured your project environment appropriately.

## Dependencies

The VideoScreen component relies on the following external dependencies:

- `react-native-image-picker`: Allows users to select videos from the device's gallery and record videos using the device's camera.
- `react-native-fs`: Provides file system access for saving the selected video.
- `react-native-share`: Enables sharing the selected video using the device's share functionality.
- `react-native-video`: Renders the video player for displaying the selected video.

Ensure that these dependencies are installed and configured properly in your project.

### FileScreen Component
install react-native-image-picker react-native-fs react-native-share react-native-video


The FileScreen component is a React Native screen that allows users to choose files from the device's storage and share them using the device's share functionality.

## Overview

The FileScreen component provides functionality to select files from the device's storage and view information about the selected file, such as name, type, and size. It also allows users to share the selected file via various applications installed on the device.

## Installation

Before using the FileScreen component, ensure that you have installed the necessary dependencies and configured your project environment appropriately.

## Dependencies

The FileScreen component relies on the following external dependencies:

- `react-native-document-picker`: Allows users to choose files from the device's storage.
- `react-native-share`: Enables sharing the selected file using the device's share functionality.

Ensure that these dependencies are installed and configured properly in your project.

You can install these dependencies using npm or yarn:

npm install react-native-document-picker react-native-share

### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.

