import React from "react";

import APIMethods from "./APIMethods";
import APIs from "../screens/api/API"
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
};
 