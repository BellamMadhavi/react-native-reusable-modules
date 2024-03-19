import React from "react";
import axios from "axios";

const APIMethods = {
    get: async (url, params) => {},
    post: async (url, data = {}, params = {}, token) => {
      let headers = token
        ? {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
        : {};

      let response = await axios.post(`${url}`, data, {headers});
      console.log("response",response)
      return response;
    },
  };
   
  export default APIMethods;