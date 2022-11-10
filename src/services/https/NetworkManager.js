import axios from "axios";
import { sessionStore } from "../../stores/session/session.store";
import httpUrl from "./httpUrl";
import { log } from "../../utils/app.debug";
import { toast } from 'react-toastify';

const appAxiosInstance = axios.create({
  baseURL: httpUrl.API_URL,
})
//request interceptor that will add auth token to every request
appAxiosInstance.interceptors.request.use(function (config) {
  const token = sessionStore.getAccessToken
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

/**
 * Any request to server with proper error handeling and request interceptor to add token to every request
 * @param {AxiosRequestConfig} config
 * @returns {Promise<any>}
 */
export function AppWebRequest(config) {
  var responseError = {};
  return appAxiosInstance(config).catch((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // case for refresh token
        toast.error("Your session is invalid. Please log in again")
        sessionStore.logout()
      }
      log("error response", error.response);
      responseError = {
        ...error.response?.data,
        ...getProperErrorMessageFromError(error.response?.data),
        status: error.response.status,
        headers: error.response.headers,
      };
    } else if (error.request) {
      responseError = {
        ...error,
        message: "Can not made connection to the server"
      };
    } else {
      responseError = {
        ...error,
        message: "Unexpected error occured!"
      };
    }
    log("exactual error", error);
    log("responseError", responseError)
    return Promise.reject(responseError)
  });
}

function getProperErrorMessageFromError(error) {
  const errorObj = {
    message: "",
    errorData: []
  }

  if (typeof (error?.message) == "string") {
    errorObj.message = error?.message
  } else if (Array.isArray(error?.message) && typeof (error?.message[0]) == "string") {
    errorObj.errorData = error?.message
    errorObj.message = error?.message[0]
  } else {
    errorObj.message = error?.error || "Unexpected error occured"
  }

  return errorObj
}
