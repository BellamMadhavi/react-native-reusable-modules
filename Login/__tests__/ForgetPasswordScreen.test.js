import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgetPasswordScreen from '../src/screens/forgetpassword';
import ForgetPasswordAPICall from './ForgetPasswordAPICall';
jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
  }));

describe('ForgetPasswordScreen', () => {
  /*
  it('should render without crashing', () => {
    const { getByPlaceholderText, getByText } = render(<ForgetPasswordScreen />);
    
    // Check if the input and submit button are rendered
    expect(getByPlaceholderText('Email/PhoneNumber')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('should show validation error for empty input', async () => {
    const { getByText } = render(<ForgetPasswordScreen />);
    const submitButton = getByText('Submit');

    fireEvent.press(submitButton);

    // Wait for the Alert to be displayed
    await waitFor(() => {
      expect(getByText('Validation Error')).toBeTruthy();
      expect(getByText('All Fields Are Required')).toBeTruthy();
    });
  });

  // Add more test cases based on your requirements
  // ...

  // Example: Test case for entering a valid email
  it('should handle forgot password for a valid email', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgetPasswordScreen />);
    const emailInput = getByPlaceholderText('Email/PhoneNumber');
    const submitButton = getByText('Submit');

    // Type a valid email address
    fireEvent.changeText(emailInput, 'test@example.com');

    // Press the submit button
    fireEvent.press(submitButton);

    // Wait for the API call to complete (useful if the component makes async calls)
    await waitFor(() => {
        // expect(Alert.alert).toHaveBeenCalledWith('Validation Error', 'All Fields Are Required');
    });
  }); */

  it('should handle forgot password for a valid email', async () => {
    const encodedLoginId = encodeURIComponent('madhavibellam666@gmail.com');

    const rep = await ForgetPasswordAPICall.apiTest(encodedLoginId);
    console.log("test",rep);
  console.warn(rep)
  expect(rep).toBe(200)
  });

  // Add more test cases based on your requirements
  // ...
});

