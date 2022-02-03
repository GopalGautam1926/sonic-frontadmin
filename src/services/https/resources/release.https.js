import { AxiosRequestConfig } from "axios";
import { AppWebRequest } from "../NetworkManager";

class ReleaseHttps {
    constructor() { }

    /**
     * Fetch all sonickeys
     * @param {AxiosRequestConfig} options
     * @returns {Promise<any>}
     */
    fetchVersions(platform) {
        return AppWebRequest({
            method: "get",
            url: `app-version/all/${platform}`,
        });
    }

    createVersion() {
        return AppWebRequest({
            method: "post",
           // data: ,
            url: "/upload",
        });
    }
}

export default new ReleaseHttps();
