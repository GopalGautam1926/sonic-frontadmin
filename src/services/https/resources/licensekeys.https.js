import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";
import { sessionStore } from "../../../stores/session/session.store";
import { licenseKeyStore } from "../../../stores/core/licensekey.store";

class LicenseKeysHttps {
  constructor() {}

  /**
   * Fetch all license keys
   * @param {AxiosRequestConfig} options
   * @returns {Promise<any>}
   */
  fetchLicenseKeys(options = {}) {
    return AppWebRequest({
      method: "get",
      url: "/license-keys",
      ...options,
    });
  }

  /**
   * create new license key
   * @param {object} payload
   * @returns
   */
  createNewLicense(payload) {
    return AppWebRequest({
      method: "post",
      url: "/license-keys",
      data: payload,
    }).then((res) => {
      licenseKeyStore.addLicenseKey(res?.data);
      return res;
    });
  }

  /**
   * create new license key
   * @param {string} key
   * @param {object} payload
   * @returns
   */
   updateLicenseKey(key,payload) {
    return AppWebRequest({
      method: "put",
      url: `/license-keys/${key}`,
      data: payload,
    }).then((res) => {
      licenseKeyStore.updateLicenseKey(key,res?.data);
      return res;
    });
  }

  /**
   * get license by key
   * @param {string} key
   * @returns
   */
   findByKey(key) {
    return AppWebRequest({
      method: "get",
      url: `/license-keys/${key}`,
    }).then((res) => {
      return res;
    });
  }

  /**
   * delete license key
   * @param {string} key
   * @returns
   */
  deleteLicense(key) {
    return AppWebRequest({
      method: "delete",
      url: `/license-keys/${key}`,
    }).then((res) => {
      licenseKeyStore.removeLicenseKey(key);
      return res;
    });
  }
}

export default new LicenseKeysHttps();
