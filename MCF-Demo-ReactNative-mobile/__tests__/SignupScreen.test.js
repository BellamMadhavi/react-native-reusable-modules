import React from "react";
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import Back from "../src/screens/signup";
 
describe('SignupScreen', () => {
        //expect(page.getByPlaceholderText('First Name')).toBeTruthy();
    it('should render the first name input field', () => {
        const page = render(<Back />);
        expect(page.getByPlaceholderText('First Name')).toBeTruthy();
      });
 
      it('should render the last name input field', () => {
        const page = render(<Back />);
        expect(page.getByPlaceholderText('Last Name')).toBeTruthy();
      });
 
      it('should render the email id input field', () => {
        const page = render(<Back />);
        expect(page.getByPlaceholderText('Email Id')).toBeTruthy();
      });
 
      it('should render the password input field', () => {
        const page = render(<Back />);
        expect(page.getByPlaceholderText('Password')).toBeTruthy();
      });
 
      it('should render the phone number input field', () => {
        const page = render(<Back />);
        expect(page.getByPlaceholderText('Phone Number')).toBeTruthy();
      });
 
      it('should render the country code input field', () => {
        const page = render(<Back />);
        expect(page.getByPlaceholderText('Country Code')).toBeTruthy();
      });
 
      //Test for isEmailValid function:
      // Simulate user input and submit the form.
    //const emailInput = screen.getByLabelText('Email');
    //emailInput.value = encodedLoginId;
 
    it('should enable the Submit button when the phone number is valid', () => {
      const wrapper = render(<Back />);
      const submitButton = wrapper.getByText('Submit');
      fireEvent.changeText(wrapper.getByPlaceholderText('Phone Number'), '8433837171');
      expect(submitButton.disabled).toBeFalsy;
    });
    it('should disable the Submit button when the phone number is invalid', () => {
      const wrapper = render(<Back />);
      const submitButton = wrapper.getByText('Submit');
      fireEvent.changeText(wrapper.getByPlaceholderText('Phone Number'), '12345');
      expect(submitButton.disabled).toBeTruthy;
    });
    it('should enable the Submit button when the email address is valid', () => {
      const wrapper = render(<Back />);
      const submitButton = wrapper.getByText('Submit');
      fireEvent.changeText(wrapper.getByPlaceholderText('Email Id'), 'test@gmail.com');
      expect(submitButton.disabled).toBeFalsy;
    });
    it('should enable the Submit button when the email address is empty', () => {
      const wrapper = render(<Back />);
      const submitButton = wrapper.getByText('Submit');
      fireEvent.changeText(wrapper.getByPlaceholderText('Email Id'), '');
      expect(submitButton.disabled).toBeTruthy;
    });
     
    it('should return true for valid passwords', () => {
      const wrapper = render(<Back />);
      const submitButton = wrapper.getByText('Submit');
      fireEvent.changeText(wrapper.getByPlaceholderText('Password'), 'Test123@');
      expect(submitButton.disabled).toBeFalsy;
       // expect(isPasswordValid('Test123@')).toBeTruthy();
        ///expect(isPasswordValid('password123@')).toBeTruthy();
        //expect(isPasswordValid('12345678@')).toBeTruthy();
      });
      
      it('should return false for invalid passwords', () => {
        const wrapper = render(<Back />);
      const submitButton = wrapper.getByText('Submit');
      fireEvent.changeText(wrapper.getByPlaceholderText('Password'), '12345678');
      expect(submitButton.disabled).toBeTruthy;
 
        // expect(isPasswordValid('password')).toBeFalsy();
        // expect(isPasswordValid('12345678')).toBeFalsy();
        // expect(isPasswordValid('test123')).toBeFalsy();
      });
 
      it('should enable the Submit button when the country code is empty', () => {
        const wrapper = render(<Back />);
        const submitButton = wrapper.getByText('Submit');
        fireEvent.changeText(wrapper.getByPlaceholderText('Country Code'), '');
        expect(submitButton.disabled).toBeTruthy;
      });
 
      it('should enable the Submit button when the country code is valid', () => {
        const wrapper = render(<Back />);
        const submitButton = wrapper.getByText('Submit');
        fireEvent.changeText(wrapper.getByPlaceholderText('Country Code'), '+91');
        expect(submitButton.disabled).toBeFalsy;
      });
 
      it('should enable the Submit button when the last name is valid', () => {
        const wrapper = render(<Back />);
        const submitButton = wrapper.getByText('Submit');
        fireEvent.changeText(wrapper.getByPlaceholderText('Last Name'), 'ramesh');
        expect(submitButton.disabled).toBeFalsy;
      });
 
      it('should enable the Submit button when the last name is empty', () => {
        const wrapper = render(<Back />);
        const submitButton = wrapper.getByText('Submit');
        fireEvent.changeText(wrapper.getByPlaceholderText('Last Name'), '');
        expect(submitButton.disabled).toBeFalsy;
      });
 
      it('should enable the Submit button when the first name is valid', () => {
        const wrapper = render(<Back />);
        const submitButton = wrapper.getByText('Submit');
        fireEvent.changeText(wrapper.getByPlaceholderText('First Name'), 'ramesh');
        expect(submitButton.disabled).toBeFalsy;
      });
 
      it('should enable the Submit button when the first name is empty', () => {
        const wrapper = render(<Back />);
        const submitButton = wrapper.getByText('Submit');
        fireEvent.changeText(wrapper.getByPlaceholderText('First Name'), '');
        expect(submitButton.disabled).toBeFalsy;
      });
 
 
      function isEmailValid(logeinId) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(logeinId);
      }
      function isPhoneNumberValid(loginId)  {
        const phoneNumberRegex = /^\d{12}$/;
        return phoneNumberRegex.test(loginId);
      };
      function isPasswordValid (password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };
});