import React from 'react';
import { render, fireEvent, waitFor, screen,alert } from '@testing-library/react-native';
import ForgetPasswordScreen from '../src/screens/forgetpassword';
import '@testing-library/jest-native/extend-expect';
import AuthAPIService from '../src/screens/AuthAPIService';
///import { Alert } from 'react-native';
 
describe('ForgetPasswordScreen', () => {
  it('should render the input field', () => {
    const page = render(<ForgetPasswordScreen />);
    expect(page.getByPlaceholderText('Email/PhoneNumber')).toBeTruthy();
  });
 
  //Test for isEmailValid function:
  it('should disable the Submit button when the email address is invalid', () => {
    const wrapper = render(<ForgetPasswordScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('Email/PhoneNumber'), 'test');
    expect(submitButton.disabled).toBeTruthy;
  });
 
  it('should enable the Submit button when the email address is valid', () => {
    const wrapper = render(<ForgetPasswordScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('Email/PhoneNumber'), 'test@gmail.com');
    expect(submitButton).toBeEnabled();
  });
  it('should enable the Submit button when the email address is empty', () => {
    const wrapper = render(<ForgetPasswordScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('Email/PhoneNumber'), '');
    expect(submitButton.disabled).toBeTruthy;
  });
 
  it('should disable the Submit button when the phone number is invalid', () => {
    const wrapper = render(<ForgetPasswordScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('Email/PhoneNumber'), '12345');
    expect(submitButton.disabled).toBeTruthy;
  });
  it('should enable the Submit button when the phone number is valid', () => {
    const wrapper = render(<ForgetPasswordScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('Email/PhoneNumber'), '8433837171');
    expect(submitButton.disabled).toBeFalsy;
  });
  it('should enable the Submit button when the phone number is empty', async () => {
    const wrapper = render(<ForgetPasswordScreen />);
    const submitButton = wrapper.getByText('Submit');
    fireEvent.changeText(wrapper.getByPlaceholderText('Email/PhoneNumber'), '');
    expect(submitButton.disabled).toBeTruthy;
  });
 
   it('should handle forgot password for a api sucess', async () => {
    const loginId = encodeURIComponent('madhavibellam666@gmail.com');
    const data = await AuthAPIService.forgetPassword(loginId);
    //console.log(data);
    expect(data["data"]).toEqual("FORGOT PASSWORD LINK SENT SUCCESSFULLY TO madhavibellam666@gmail.com")
  });
 
  it('should show error when login field is empty', async() => {
    const { getByText } = render(<ForgetPasswordScreen />);
    fireEvent.press(getByText('Submit'));
    await new Promise(resolve => setTimeout(resolve, 100)); // wait 100 milliseconds
    expect(getByText('alert')).toBeInTheDocument();
    expect(screen.getAllByLabelText('All Fields Are Required')).toBeInTheDocument();
  });
 
  it('should trigger the onClick callback when clicked', () => {
    const wrapper = render(<ForgetPasswordScreen />);
    fireEvent.press(screen.getByText('Submit'));
  });
  
});
 
 
 