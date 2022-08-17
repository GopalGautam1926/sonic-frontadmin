import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";
import { radioStationStore } from "../../../stores/core/radiostation.store";

class RadioStationsHttps {
  constructor() { }

  /**
   * Fetch all license ids
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
   * create new radio station with appgen
   * @param {object} payload
   * @returns
   */
  createNewAppgenRadioStation(payload) {
    return AppWebRequest({
      method: "post",
      url: "/radiostations/import-from-appgen-excel",
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      },
      data: payload,
    })
    // .then((res) => {
    //   radioStationStore.addRadioStation(res?.data);
    //   return res;
    // });
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
   * @param {string} id
   * @param {object} payload
   * @returns
   */
  updateRadioStation(id, payload) {
    return AppWebRequest({
      method: "put",
      url: `/radiostations/${id}`,
      data: payload,
    }).then((res) => {
      radioStationStore.updateRadioStation(id, res?.data);
      return res;
    });
  }

  /**
   * delete radio station
   * @param {string} id
   * @returns
   */
  deleteRadioStation(id) {
    return AppWebRequest({
      method: "delete",
      url: `/radiostations/${id}`,
    }).then((res) => {
      radioStationStore.removeRadioStation(id);
      return res;
    });
  }

  /**
   * Start radio station
   * @param {string} id
   * @returns
   */
  startListeningRadioStation(id) {
    return AppWebRequest({
      method: "put",
      url: `/radiostations/${id}/start-listening-stream`,
    }).then((res) => {
      radioStationStore.updateRadioStation(id, res?.data);
      return res;
    });
  }

  /**
  * Stop radio station
  * @param {string} id
  * @returns
  */
  stopListeningRadioStation(id) {
    return AppWebRequest({
      method: "put",
      url: `/radiostations/${id}/stop-listening-stream`,
    }).then((res) => {
      radioStationStore.updateRadioStation(id, res?.data);
      return res;
    });
  }

  /**
 * get license by id
 * @param {string} id
 * @returns
 */
  findByid(id) {
    return AppWebRequest({
      method: "get",
      url: `/radiostations/${id}`,
    }).then((res) => {
      return res;
    });
  }
}

export default new RadioStationsHttps();
