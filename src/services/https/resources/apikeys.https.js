import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";
import { apiKeyStore } from "../../../stores/core/apikey.store";

class ApiKeysHttps {
  constructor() {}

  /**
   * Fetch all api keys
   * @param {AxiosRequestConfig} options
   * @returns {Promise<any>}
   */
  fetchApiKeys(options = {}) {
    return AppWebRequest({
      method: "get",
      url: "/api-keys",
      ...options,
    });
  }

  /**
   * create new api key
   * @param {object} payload
   * @returns
   */
  createNewApiKey(payload) {
    return AppWebRequest({
      method: "post",
      url: "/api-keys",
      data: payload,
    }).then((res) => {
      apiKeyStore.addApiKey(res?.data);
      return res;
    });
  }

  /**
   * create new api key
   * @param {string} key
   * @param {object} payload
   * @returns
   */
   updateApiKey(key,payload) {
    return AppWebRequest({
      method: "put",
      url: `/api-keys/${key}`,
      data: payload,
    }).then((res) => {
      apiKeyStore.updateApiKey(key,res?.data);
      return res;
    });
  }

  /**
   * get api by key
   * @param {string} key
   * @returns
   */
   findByKey(key) {
    return AppWebRequest({
      method: "get",
      url: `/api-keys/${key}`,
    }).then((res) => {
      return res;
    });
  }

  /**
   * delete license key
   * @param {string} key
   * @returns
   */
  deleteApiKey(key) {
    return AppWebRequest({
      method: "delete",
      url: `/api-keys/${key}`,
    }).then((res) => {
      apiKeyStore.removeApiKey(key);
      return res;
    });
  }
}

export default new ApiKeysHttps();
