# React Native Login Feature

## Description 
Users can view application analytics, receive push notifications, and engage in messaging and chat functionalities.
 
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


### SignInScreen Component:

Overview:
The SignInScreen component is a React Native component responsible for displaying a sign-in form where users can enter their email and password to log in. It also provides options for logging in with Google and Facebook accounts.

Functionality:
- Users can enter their email and password in the provided input fields.
- Users can log in by pressing the "Login" button after entering valid credentials.
- Email and password validation are performed before attempting to log in.
- Users can log in with their Google account by pressing the Google sign-in button.
- Users can log in with their Facebook account by pressing the Facebook sign-in button.

dependencies:
- @react-native-firebase/auth: For handling authentication with Firebase.
- react-native-fbsdk-next: For handling Facebook authentication.
- AuthAPIService and Validations: Custom services for user authentication and input validations.
- useUser: Custom hook for managing user data.

Setup Instructions:
1. Import the SignInScreen component into your project.
2. Render the SignInScreen component within your application, typically as part of your authentication flow.

### Usage:
- Developers can integrate the components into their React Native applications to provide user authentication functionality, including email/password login and social media login options.

Note: without social login we cannot message and chat


### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.

