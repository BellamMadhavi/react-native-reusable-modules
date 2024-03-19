import React from "react";

import APIMethods from "./APIMethods";
import APIs from "./api/api";
export default AuthAPIService = {
 
 userLogin: async userLoginDetails => {
    try {
      const LoginResponse = await APIMethods.post(
        APIs.login,
        userLoginDetails,
      );
      return LoginResponse.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  
  userSignUp: async userSignUpDetails => {
    try {
      let response = await APIMethods.post(
        APIs.signup,
        userSignUpDetails,
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
 
  forgetPassword: async email => {
  try {
    let response = await APIMethods.post(
      `${APIs.forgotpassword}${email}`,
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
},
 
  Reset_Password: async resetPasswordDetails => {
    try {
      let reset_password_response = await APIMethods.post(
        APIs.resetpassword,
        resetPasswordDetails,
      );
      return reset_password_response;
    } catch (error) {
      console.log(error, 'reset password error');
      throw error.response;
    }
  },

  sendOtp: async otp => {
    try {
      let response = await APIMethods.post(
        `${APIs.otp}?toPhoneNumber=${otp}`,
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
    },

    otpVerication: async otpVerification => {
      try {
        const fullUrl = `${APIs.otpVerification}?toPhoneNumber=${otpVerification.phone}&otp=${otpVerification.otp}`;
        let otp_verification_response = await APIMethods.post(fullUrl);
        return otp_verification_response
      } catch (error) {
        throw error.response;
      }
    },

    // getAllEmployees: async () => {
    //   try {
    //     let response = await APIMethods.get(APIs.getemployees);
    //     return response.data || null ;
    //   } catch (error) {
    //     throw error.response?.data || error.message;
    //   }
    // },
};
 