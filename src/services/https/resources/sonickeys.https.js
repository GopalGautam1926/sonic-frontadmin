import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";

class SonicKeysHttps {
    constructor() { }

    /**
     * Fetch all sonickeys detected plays
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchPlays(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/detections/list-plays",
            ...options,
        });
    }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchSonicKeys(options = {}) {
        return AppWebRequest({
            method: "get",
            url: "/sonic-keys",
            ...options,
        });
    }
}

export default new SonicKeysHttps();
