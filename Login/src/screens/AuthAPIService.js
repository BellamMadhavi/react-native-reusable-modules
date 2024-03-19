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
  eventCreation: async eventDetails => {
    try {
      let response = await APIMethods.post(
        APIs.event,
        eventDetails,
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

};
 