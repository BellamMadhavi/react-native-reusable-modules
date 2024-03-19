// /**
//  * @format
//  */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: import explicitly to use the types shiped with jest.
// import {it} from '@jest/globals';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });


// App.test.js
import 'react-native';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';
import SignInScreen from '../src/screens/signIn';

// Mock the navigation components
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    // NavigationContainer: ({ children }) => <>{children}</>,
    createNativeStackNavigator: jest.fn(),
  };
});

// Mock the stack navigator
jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn(),
  };
});

describe('App', () => {
  test('renders SignInScreen', async () => {
    // Mock the stack navigator's `Screen` component
    const MockScreen = jest.fn(() => null);
    jest.doMock('@react-navigation/native-stack', () => ({
      ...jest.requireActual('@react-navigation/native-stack'),
      Screen: MockScreen,
    }));

    // Render the component
    render(<App />);

    // Wait for the rendering to complete
    await waitFor(() => expect(MockScreen).toBeCalledWith('SignInScreen', SignInScreen));
  });
});

