# React Native Forgot Passward and Reset Password

## Description 
Forgot and Reset Password with service integration

## Features 
 ** Forgot Password and Reset Password **
users can able to rate the app,write reviews
 
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



### ForgetPasswordScreen Component

This is a React Native component responsible for handling the process of resetting the user's password.

## Overview

The ForgetPasswordScreen component allows users to input their email or phone number to request a password reset. It validates the input and sends a reset link to the provided email or an OTP to the provided phone number. Users are then navigated to the OTP verification screen or the reset password screen based on the method chosen.

## Features

- Input field for email or phone number.
- Validation of email or phone number input.
- Request password reset link or OTP.
- Navigation to OTP verification screen or reset password screen.

# ResetPasswordScreen Component

This is a React Native component responsible for resetting the user's password after receiving an OTP.

## Overview

The ResetPasswordScreen component allows users to input the OTP sent to their email or phone number, along with their new password and confirmation password. It validates the input fields and sends a request to reset the password using the provided OTP and new password.

## Features

- Input fields for OTP, new password, and confirmation password.
- Validation of OTP, new password, and confirmation password.
- Request password reset with OTP verification.

### Usage
When an email is entered, an OTP is sent to that email or phone number. Based on the OTP, users can reset their password.

### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.
