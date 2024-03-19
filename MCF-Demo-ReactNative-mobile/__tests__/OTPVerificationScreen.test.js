import React from 'react';
import { render, fireEvent, waitFor, screen ,shallow} from '@testing-library/react-native';
///import '@testing-library/jest-native/extend-expect';
import OTPVerificationScreen from '../src/screens/forgetpassword/otpverification';
 
describe('OTPVerificationScreen', () => {
  it('should render the input field', () => {
    const page = render(<OTPVerificationScreen />);
        expect(page.getByPlaceholderText('enter the OTP(6 digits)')).toBeTruthy();
  })
  it('should enable the Submit button when the email address is valid', () => {
    const wrapper = render(<OTPVerificationScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.press(submitButton)
    //expect(1).toHaveBeenCalledTimes(1);
  });
  it('should enable the Submit button when the otp  is empty', () => {
    const wrapper = render(<OTPVerificationScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('enter the OTP(6 digits)'), '');
    expect(submitButton.disabled).toBeTruthy;
  });
 
  it('should enable the Submit button when the otp  is filled', () => {
    const wrapper = render(<OTPVerificationScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('enter the OTP(6 digits)'), '123456');
    expect(submitButton.disabled).toBeFalsy;
  });
 
  it('should enable the Submit button when the otp  is count check', () => {
    const wrapper = render(<OTPVerificationScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('enter the OTP(6 digits)'), '');
    expect(submitButton.disabled).toBeTruthy;
  });
  it('should enable the Submit button when the otp  is count check', () => {
    const wrapper = render(<OTPVerificationScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('enter the OTP(6 digits)'), '123456');
    expect(submitButton.disabled).toBeFalsy;
  });
  it('should show error when both fields are empty', async () => {
    const { getByText } = render(<OTPVerificationScreen />);
    fireEvent.press(getByText('Submit'));
    await new Promise(resolve => setTimeout(resolve, 100)); // wait 100 milliseconds
  });
    
});
 