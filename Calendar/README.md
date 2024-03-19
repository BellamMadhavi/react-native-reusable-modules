# React Native Calendar

## Description 
The app will allow users to schedule appointments, set reminders, and manage their calendars seamlessly(Create Events,Delete Events,Display Events).

## Features 
 ** Calendar **
 users able to create events,delete events and see events
 
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


### SignInScreen Component
This is a React Native component responsible for handling user sign-in functionality.

## Overview

The SignInScreen component allows users to input their email and password for authentication. It validates the input fields and displays appropriate error messages if the input is invalid. Upon successful validation, it calls an API to authenticate the user.

## Features

- Input fields for email and password.
- Validation of email and password input.
- Display of error messages for invalid input.
- Authentication using an API upon successful validation.

Note: After UserLogin it generates token based on the token we can create,delete events

### Calender Component

## Overview

The CalendarScreen component integrates the `react-native-calendars` library to display a calendar. Users can select a date to view any events scheduled for that day. Additionally, users can add events for selected dates and delete events.

## Features

- Display a calendar with selectable dates.
- View events for selected dates.
- Add events for selected dates.
- Delete events.(by using id we can delete events)

### Usage
- login user with valid credentials,if login successfull it will navigate to the calendar screen,
users can select a date to view events or create new events,based on event id we can delete events

### dependencies
npm i react-native-calendars
npm i @react-native-community/datetimepicker
npm i @react-navigation/bottom-tabs
npm i @react-navigation/native
npm i @react-navigation/native-stack
npm i axios
npm i react-native-safe-area-context"
npm i react-native-screens
npm i react-native-vector-icons

### Contact Information:
If any issues arise during integration or if additional assistance is needed, please contact 
madhavi.bellam@motivitylabs.com.