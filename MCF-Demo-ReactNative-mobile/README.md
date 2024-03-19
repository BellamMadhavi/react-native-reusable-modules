mvpmobilefeatures

## Prerequisites for ios

Make sure you have the following installed:

- Node.js: [Download](https://nodejs.org/)
- npm (Node Package Manager): [Download](https://www.npmjs.com/get-npm)
- CocoaPods: [Download](https://cocoapods.org/)
- Homebrew and Watchman: [Download](https://reactnative.dev/docs/environment-setup)
- Xcode: [Download on the Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)


### Prerequisites for android

Make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm comes with Node.js


1.Installation 
i.Installation Process in android
    ZIP the Project: 
        Navigate to your Flutter project's parent directory in the terminal. Create a ZIP archive of your react native project using the command: zip -r your_project_name.zip your_project_name. 
    Share ZIP Archive: 
        Send the ZIP archive to the other team via email, Slack, or a cloud storage service. 
    Include Dependencies: 
        Ensure the packege.json file is included in the ZIP archive. 
        The other team can run "npm install" get in the project directory to fetch dependencies. 
        Platform-Specific Files: 
        Include the android/ and ios/ directories if your reactnative project includes native code. 
    Documentation: 
        Mention Reactnative SDK version and any specific steps needed to run the project  

ii. Installation process in ios

    1. Clone the repository:
     git clone 'https://dev.azure.com/mlmvps/MobileApp%20Common%20Features/_git/MCF-UserMgmt-ReactNative-mobile'

    2.navigate to the project directory 
        cd yourproject  

    3.install dependencies
        npm install

    4.cd ios
        pod install

    5.open project
        ios/yourProjectName.xworkspace

    6.run in terminal
         npx react-native run-ios

    Dependencies : 
        1.Firebase along with Facebook and google providers needs to enabled in ios platform
        2.Fusion auth has been integrated for the REST API's

    Reference and Benchmarking:
        1. We have used Firebase OAuth login components like (Facebook,google) we need to add these SDK's to the Project.
        2.Updated Google.info.plist file need to be added to the project
        3.We need to add URL scheme to the project while registering the project in the firebase console we will get we need to add this to the project settings


2.Sprint Wise Task Process

## USER MANAGEMENT

This re-usable project module contains UserManagement Feature along with OAuth-login(Facebook,Google). 

UserManagement Module contains:
  
  i. Login feature consuming our Fusion Auth service
  ii. Registration 
  iii. ForgotPassword(Reset Password)
  iv. OAuth Login (Facebook,Google) 
 
Note:Firebase dependency along with Facebook and google developer console we need to register an app in the portals

## GOOGLEMAP AND TWO-FACTORAUTHENTICATION
GoogleMap module contains:
i. CurrentLocation and googlemap navigation
    usage:
        user able see current location and google map navigation
    dependencies:
        Make sure you have the necessary dependencies installed in your React Native project:

        react-native-maps: React Native Maps library for rendering maps.
        react-native-geolocation-service: React Native Geolocation service for accessing device location.
        react-native-google-places-autocomplete: React Native component for Google Places Autocomplete.

    Note: Add the below Permissions in AndroidManifest.xml file
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

ii. 2FA forget and reset password implementation
    user can able to send otp's through Email and Mobile Number(91XXXXXXXXXX)


## BOTTOMTABS AND GDPRRULES
BottomTabs Module Contains:
i. Access the data from app without internet connectivity and Search Page
    Usage:
        The Home Screen in the Motivity App allows users to search and view a list of organizations. It provides a search functionality to filter organizations based on their name, ID, department, designation, and phone number.
        The screen displays a search input field that users can interact with to search for organizations.
        Users can click on the search icon to initiate the search.
        The organizations are fetched either from the network or from local storage (offline data) based on network connectivity.
        If there is no network connectivity and no offline data is available, an error message is displayed.
        Users can cancel the search by clicking the cancel icon or by blurring the search input.

    dependencies:
        @react-native-async-storage/async-storage
        @react-native-community/netinfo
        react-native-vector-icons/EvilIcons

ii. Encript and maintain user data with the GDPR rules
    Usage:
        user can able to Accept or Ignore the GDPR Rules
    dependencies:
        @react-native-community/checkbox

iii.Bottom Navigation Bar
    Usage:
        user able to see the bottom tabs
    dependencies:
        @react-navigation/bottom-tabs

iv.Notifications
Notifications send through Firebase console
    dependencies:
        @react-native-firebase/messaging

v.Analytics
    Analytics shown in firebase console
    dependencies:
        @react-native-firebase/analytics
    Note: In code we are using is as follows:
          <AnalyticsScreen screenName='SignInScreen' screenClass='SignInScreen'/> screenclass is a component name
 

vi.Payment-GateWay
    Usage:
        Payment Input:
            Enter the payment amount in the specified currency.
            Provide user details including name, contact number, email, and a payment link ID.
        Payment Handling:
            Initiate a payment transaction with the entered details.
            Open the payment link in the user's browser after a successful transaction.

vii.Settings
    Features:
        Theme Selection:
            Toggle between light and dark themes for better visual experience.
        Data Synchronization:
            Sync data from the server to update the local storage.
            Displays a message if the data is already up to date.
        Font Size Adjustment:
            Adjust the font size dynamically for better readability.
            Input validation to ensure a font size between 12 and 24.
        Language Preference:
            Choose preferred language from the available options (English, German, Chinese).

    dependencies:
        react-native-vector-icons
        @react-native-picker/picker
        @react-native-async-storage/async-storage

viii. userprofile
    Usage:
        View Mode:
            Display user's first name, last name, email address, and contact number.
            Option to switch to Edit Mode.
        Edit Mode:
            Allows users to update their first name, last name, and contact number.
            Input fields with validation for contact number.
            Save and Cancel buttons to update or discard changes.  

## MEDIAINTEGRATION AND MESSAGINGCHAT
This module contains:
    Dependencies
        i. Calendar and Scheduling
                react-native-calendars: A customizable calendar component for React Native.
                @react-native-community/datetimepicker: A date and time picker component.
        ii. Feedback and Ratings
                react-native-ratings: A component for collecting ratings and feedback from users.
        iii. Sharing and Collaboration
                 react-native-image-picker: A library for selecting images and videos from the device's media library or taking new pictures with the camera.
                react-native-fs: A file system API for React Native.
                react-native-share: A library for sharing content via social media, email, etc.
        iv. Messaging and Chat
                @react-native-firebase/storage: Firebase storage for storing media files.
        v. Media Integration
                react-native-image-picker: For selecting images and videos.
        vi. Onboarding and Tutorials
                react-native-app-intro-slider: An onboarding/tutorial component for introducing users to your app.
    Usage
        Calendar and Scheduling
            To use the calendar and scheduling functionalities, import the necessary components from react-native-calendars and @react-native-community/datetimepicker and integrate them into your application.
            user able to create Event,Delete Event and View Events

        Feedback and Ratings
            Use the react-native-ratings component to collect feedback and ratings from users.

        Sharing and Collaboration
            Utilize react-native-image-picker, react-native-fs, and react-native-share for sharing and collaborating on media content.

        Messaging and Chat
            For messaging and chat features, integrate @react-native-firebase/storage for storing media files associated with chat messages.
            user can able to share messages,emojis,Images

        Media Integration
            Integrate react-native-image-picker for selecting and handling images and videos within your application.
            user can able to play,pause,and move forward and backward video

        Onboarding and Tutorials
            Use react-native-app-intro-slider to create onboarding tutorials and introduce users to your app's features.



3.Usage:
    1.Developers can integrate this UserManagement and other features into their project with minimal effort 


4.Contact Information:  

     If any integration issues comes please contact my mail id :madhavi.bellam@motivitylabs.com 


5.Reusable Components:

We have created this UserManagement and other features as Re-usable component please check the installation steps as mentioned above


              