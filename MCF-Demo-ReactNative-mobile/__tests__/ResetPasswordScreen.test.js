 import React from 'react';
import { render, fireEvent, waitFor, screen,act,Alert } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ResetPasswordScreen from '../src/screens/forgetpassword/resetpassword';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import APIs from '../src/screens/api/api';
jest.mock('axios');
const mock = new MockAdapter(axios);
 
global.axios = axios;
global.mockAxios = mock;
//jest.spyOn(Alert, 'alert');
describe('ResetPasswordScreen', () => {
 
  const mockNavigation = {
    navigate: jest.fn(),
  };
 
  beforeEach(() => {
    axios.post.mockReset();
  });
 
    it('should render the enter otp field', () => {
        //const page = render(<OTPVerificationScreen />);
        render(<ResetPasswordScreen />);
        expect(screen.getByPlaceholderText('enter the Code')).toBeTruthy();
        //expect(getByText('Submit')).toBeTruthy();
      });
 
      it('should render the enter new password field', () => {
        //const page = render(<OTPVerificationScreen />);
        render(<ResetPasswordScreen />);
        expect(screen.getByPlaceholderText('enter the New Password')).toBeTruthy();
        //expect(getByText('Submit')).toBeTruthy();
      });
      it('should render the enter confirm password field', () => {
        //const page = render(<OTPVerificationScreen />);
        render(<ResetPasswordScreen />);
        expect(screen.getByPlaceholderText('enter the Confirm Password')).toBeTruthy();
        //expect(getByText('Submit')).toBeTruthy();
      });
 
    
// Test case: Handles reset password with valid input
it('handles reset password with valid input', async () => {
  const mockNavigation = { navigate: jest.fn() };
 
  render(<ResetPasswordScreen navigation={mockNavigation} />);
 
  // Mock the axios.post function
  mockAxios.onPost(APIs.resetpassword).reply(200, { status: 200 });//onPost(APIs.resetpassword).reply(200, { status: 200 });
 
  // Fill in the input fields
  fireEvent.changeText(screen.getByPlaceholderText('enter the Code'), 's');
  fireEvent.changeText(screen.getByPlaceholderText('enter the New Password'), 'ValidPassword123!');
  fireEvent.changeText(screen.getByPlaceholderText('enter the Confirm Password'), 'ValidPassword123!');
 
});
 
});