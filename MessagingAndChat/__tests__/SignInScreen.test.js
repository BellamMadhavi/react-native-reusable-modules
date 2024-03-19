// import React from 'react';
// import 'react-native';
// import SignInScreen from '../src/screens/signIn';
// import {fireEvent, render} from '@testing-library/react-native';

// jest.mock('../src/screens/signIn', () => ({
//     __esModule: true,
//     default: jest.fn(),
//   }));
  
//   jest.mock('../src/screens/signup', () => ({
//     __esModule: true,
//     default: jest.fn(),
//   }));
  
//   jest.mock('../src/screens/forgetpassword', () => ({
//     __esModule: true,
//     default: jest.fn(),
//   }));
// describe('SignInScreen',() => {
//     it('should go to home page on login',()=>{
//       const navigation = { navigate: jest.fn() }; // Use jest.fn() to create a mock function
//       jest.spyOn(navigation, 'navigate'); // Use jest.spyOn to spy on the 'navigate' method
    
//       const page = render(<SignInScreen navigation={navigation} />);
//       const loginButton = page.getByTestId('loginButton');
//       fireEvent.press(loginButton);
    
//       expect(navigation.navigate).toHaveBeenCalledWith('HomeScreen');
//     })
// })

// SignInScreen.test.js

