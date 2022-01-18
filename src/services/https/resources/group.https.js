import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";

class GroupHttps {
    constructor() { }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchGroups(options = {}) {
        return AppWebRequest({
            method: "get",
            // url: "/sonic-keys",
            ...options,
        });
    }
}

export default new GroupHttps();
