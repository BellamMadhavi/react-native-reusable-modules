import React from "react";
import 'react-native';
import APIs from "../src/screens/api/api";
import axios from 'axios';
import ForgetPasswordScreen from "../src/screens/forgetpassword";
class ForgetPasswordAPICall{
    static apiTest(loginId){
        return 
            axios.post(`${APIs.forgotpassword}${loginId}`)
            .then((respnse) => {
              console.log('OTP sent successfully.',);
              //Alert.alert('OTP sent successfully.');
              //return respnse.status
              ///navigation.navigate('OTPVerificationScreen', { data: loginId });
            })
            .catch((error) => {
              console.error('OTP Failed to Sent', error);
             /// Alert.alert('OTP Failed to Sent');
            })
        
    }}
    export default ForgetPasswordAPICall;