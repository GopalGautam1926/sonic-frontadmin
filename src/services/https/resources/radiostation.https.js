import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";
import { radioStationStore } from "../../../stores/core/radiostation.store";

class RadioStationsHttps {
  constructor() { }

  /**
   * Fetch all license keys
   * @param {AxiosRequestConfig} options
   * @returns {Promise<any>}
   */
  fetchRadioStations(options = {}) {
    return AppWebRequest({
      method: "get",
      url: "/radiostations",
      ...options,
    });
  }

  /**
   * create new radio station
   * @param {object} payload
   * @returns
   */
  createNewRadioStation(payload) {
    return AppWebRequest({
      method: "post",
      url: "/radiostations",
      data: payload,
    }).then((res) => {
      radioStationStore.addRadioStation(res?.data);
      return res;
    });
  }

  /**
   * update new radio station
   * @param {string} key
   * @param {object} payload
   * @returns
   */
  updateRadioStation(key, payload) {
    return AppWebRequest({
      method: "put",
      url: `/radiostations/${key}`,
      data: payload,
    }).then((res) => {
      radioStationStore.updateRadioStation(key, res?.data);
      return res;
    });
  }

  /**
   * delete radio station
   * @param {string} key
   * @returns
   */
  deleteRadioStation(key) {
    return AppWebRequest({
      method: "delete",
      url: `/radiostations/${key}`,
    }).then((res) => {
      radioStationStore.removeRadioStation(key);
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
      url: `/radiostations/${key}`,
    }).then((res) => {
      return res;
    });
  }
}

export default new RadioStationsHttps();
