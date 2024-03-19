import React from "react";

import APIMethods from "./APIMethods";
import APIs from "./api/API";
export default AuthAPIService = {
  
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

};
 